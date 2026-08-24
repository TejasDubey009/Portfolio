import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Readout, Slider, Toggle } from './Controls'

const TRACE = {
  Planner: 'Decomposed the brief into 6 subtasks, 2 flagged as parallelisable.',
  Researcher: 'Pulled 14 passages from the pgvector store; 3 cited, 11 discarded.',
  Synthesizer: 'Drafted the spec and folded in the researcher’s citations.',
  Validator: 'Checked every claim against sources and the acceptance criteria.',
}

const STEP_MS = 900

/**
 * Runs the LangGraph pipeline as a small state machine. The validator can reject
 * the draft, which sends the run back to the synthesiser — the retry edge is the
 * whole point of the architecture, so the demo shows it happening.
 */
export default function LoomDemo({ demoData }) {
  const nodes = demoData.nodes
  const [strictness, setStrictness] = useState(demoData.strictness)
  const [parallel, setParallel] = useState(demoData.parallel)
  const [active, setActive] = useState(-1)
  const [done, setDone] = useState([])
  const [running, setRunning] = useState(false)
  const [retries, setRetries] = useState(0)
  const [tokens, setTokens] = useState(0)
  const [verdict, setVerdict] = useState(null)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  useEffect(() => clearTimers, [])

  const run = () => {
    clearTimers()
    setRunning(true)
    setActive(-1)
    setDone([])
    setRetries(0)
    setTokens(0)
    setVerdict(null)

    // Parallel drafting overlaps planner and researcher, so the run is shorter.
    const step = parallel ? STEP_MS * 0.68 : STEP_MS
    let elapsed = 0
    let budget = 0
    const queue = []

    const visit = (index, retryPass) => {
      queue.push([
        elapsed,
        () => {
          setActive(index)
          budget += retryPass ? 420 : 900 + index * 220
          setTokens(budget)
        },
      ])
      elapsed += step
      queue.push([
        elapsed,
        () => {
          setActive(-1)
          setDone((prev) => [...new Set([...prev, index])])
        },
      ])
    }

    nodes.forEach((_, i) => visit(i, false))

    // A stricter validator rejects more often — deterministic, so the control
    // visibly changes the outcome rather than rolling dice behind the scenes.
    const rejects = strictness > 70

    queue.push([
      elapsed,
      () => {
        if (rejects) {
          setRetries(1)
          setVerdict('retry')
          setDone((prev) => prev.filter((i) => i < 2))
        }
      },
    ])

    if (rejects) {
      elapsed += step * 0.4
      visit(2, true)
      visit(3, true)
    }

    queue.push([
      elapsed,
      () => {
        setVerdict('passed')
        setRunning(false)
      },
    ])

    queue.forEach(([at, fn]) => {
      timers.current.push(setTimeout(fn, at))
    })
  }

  const singleAgentTokens = Math.round((tokens || 3600) * 3.1)
  const savings = tokens ? Math.round((1 - tokens / singleAgentTokens) * 100) : 68

  return (
    <div className="demo">
      <div className="demo__stage demo__stage--graph">
        <div className="agent-graph">
          {nodes.map((node, i) => {
            const isActive = active === i
            const isDone = done.includes(i)
            return (
              <div className="agent-graph__slot" key={node}>
                <motion.div
                  className={`agent-node${isActive ? ' is-active' : ''}${isDone ? ' is-done' : ''}`}
                  animate={isActive ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                  transition={{ duration: 0.9, repeat: isActive ? Infinity : 0 }}
                >
                  <span className="agent-node__index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="agent-node__name">{node}</span>
                  <span className="agent-node__state">
                    {isActive ? 'running' : isDone ? 'complete' : 'idle'}
                  </span>
                  <span className="agent-node__trace">{TRACE[node]}</span>
                </motion.div>
                {i < nodes.length - 1 && (
                  <span className={`agent-graph__edge${done.includes(i) ? ' is-lit' : ''}`} aria-hidden="true" />
                )}
              </div>
            )
          })}
        </div>

        {retries > 0 && (
          <div className="agent-graph__retry">
            ↺ Validator rejected draft — routed back to Synthesizer ({retries} retry)
          </div>
        )}
      </div>

      <div className="demo__readouts">
        <Readout label="Tokens used" value={tokens ? tokens.toLocaleString() : '—'} />
        <Readout label="vs. single agent" value={`−${savings}%`} tone="good" />
        <Readout label="Run cost" value={tokens ? `$${(tokens * 0.000018).toFixed(3)}` : '—'} />
        <Readout
          label="Verdict"
          value={verdict === 'passed' ? 'passed' : verdict === 'retry' ? 'retrying' : running ? 'running' : 'idle'}
          tone={verdict === 'passed' ? 'good' : verdict === 'retry' ? 'warn' : undefined}
        />
      </div>

      <div className="demo__controls">
        <button type="button" className="demo__run" onClick={run} disabled={running}>
          {running ? 'Swarm running…' : 'Run the swarm'}
        </button>
        <Slider
          label="Validator strictness"
          value={strictness}
          min={10}
          max={95}
          onChange={setStrictness}
          display={strictness > 70 ? 'high — expect a retry' : 'balanced'}
        />
        <div className="demo__toggles">
          <Toggle label="Speculative parallel drafting" on={parallel} onChange={setParallel} />
        </div>
      </div>
    </div>
  )
}
