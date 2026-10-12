import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { inr } from '../shared/dates'
import { useDialog } from '../shared/hooks'
import { brand } from './data'
import { friendlyTime, openStatus, pickupTimes } from './util'
import { Close, Minus, Plus } from './icons'
import { Field } from './Reserve'

const PACKING = 15
const GST = 0.05

/** Pickup order tray: review lines, choose a collection time, place the order. */
export default function Tray({ open, lines, onQty, onClear, onClose }) {
  const ref = useDialog(open, onClose)
  const [pickup, setPickup] = useState('asap')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)

  const times = useMemo(() => (open ? pickupTimes() : []), [open])
  const kitchenOpen = openStatus().open

  useEffect(() => {
    if (open) setErrors({})
    // A finished order is only shown once; reopening starts a fresh tray.
    else setOrder(null)
  }, [open])

  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0)
  const packing = lines.length ? PACKING : 0
  const tax = Math.round((subtotal + packing) * GST)
  const total = subtotal + packing + tax

  const place = (event) => {
    event.preventDefault()
    const next = {}
    if (name.trim().length < 2) next.name = 'A name to call out at the counter.'
    if (phone.replace(/\D/g, '').length < 8) next.phone = 'In case we need to ring you.'
    setErrors(next)
    if (Object.keys(next).length) return

    const ready = pickup === 'asap' ? times[0] : pickup
    setOrder({
      number: `A-${Math.floor(100 + Math.random() * 900)}`,
      name: name.trim().split(' ')[0],
      ready,
      total,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
    })
    onClear()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.aside
            ref={ref}
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tray-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0, 0, 0.2, 1] }}
          >
            <header className="drawer__head">
              <h2 id="tray-title">{order ? 'Order placed' : 'Your tray'}</h2>
              <button type="button" className="drawer__close" onClick={onClose} aria-label="Close tray">
                <Close />
              </button>
            </header>

            {order ? (
              <div className="drawer__body">
                <div className="confirm">
                  <p className="confirm__kicker">On the tawa, {order.name}.</p>
                  <p className="confirm__ref">{order.number}</p>
                  <dl className="confirm__list">
                    <div>
                      <dt>Ready at</dt>
                      <dd>{order.ready ? friendlyTime(order.ready) : 'About 20 minutes'}</dd>
                    </div>
                    <div>
                      <dt>Items</dt>
                      <dd>{order.count}</dd>
                    </div>
                    <div>
                      <dt>Pay at counter</dt>
                      <dd>{inr(order.total)}</dd>
                    </div>
                    <div>
                      <dt>Collect from</dt>
                      <dd>{brand.address[0]} — the hatch on the left</dd>
                    </div>
                  </dl>
                  <p className="confirm__note">
                    We’ll call your number out when it’s packed. Dosas travel badly; eat them first.
                  </p>
                </div>
              </div>
            ) : lines.length === 0 ? (
              <div className="drawer__body">
                <div className="tray-empty">
                  <p>Your tray is empty.</p>
                  <span>Add a dosa. Then, statistically, a second dosa.</span>
                  <a className="btn btn--light" href="#menu" onClick={onClose}>
                    Browse the menu
                  </a>
                </div>
              </div>
            ) : (
              <form className="drawer__body" onSubmit={place} noValidate>
                <ul className="lines">
                  {lines.map((line) => (
                    <li key={line.key}>
                      <div>
                        <b>{line.name}</b>
                        {line.detail && <span>{line.detail}</span>}
                      </div>
                      <div className="stepper stepper--light" role="group" aria-label={`${line.name} quantity`}>
                        <button type="button" onClick={() => onQty(line.key, line.qty - 1)} aria-label="Remove one">
                          <Minus width={16} height={16} />
                        </button>
                        <output>{line.qty}</output>
                        <button type="button" onClick={() => onQty(line.key, line.qty + 1)} aria-label="Add one more">
                          <Plus width={16} height={16} />
                        </button>
                      </div>
                      <span className="lines__price">{inr(line.price * line.qty)}</span>
                    </li>
                  ))}
                </ul>

                <dl className="totals">
                  <div>
                    <dt>Subtotal</dt>
                    <dd>{inr(subtotal)}</dd>
                  </div>
                  <div>
                    <dt>Packing</dt>
                    <dd>{inr(packing)}</dd>
                  </div>
                  <div>
                    <dt>GST (5%)</dt>
                    <dd>{inr(tax)}</dd>
                  </div>
                  <div className="totals__grand">
                    <dt>Total</dt>
                    <dd>{inr(total)}</dd>
                  </div>
                </dl>

                {kitchenOpen && times.length > 0 ? (
                  <>
                    <Field label="Pickup time">
                      <select value={pickup} onChange={(e) => setPickup(e.target.value)}>
                        <option value="asap">As soon as it’s ready (~20 min)</option>
                        {times.map((t) => (
                          <option key={t} value={t}>
                            {friendlyTime(t)}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <div className="fieldrow">
                      <Field label="Name" error={errors.name}>
                        <input
                          type="text"
                          autoComplete="given-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          aria-invalid={Boolean(errors.name)}
                        />
                      </Field>
                      <Field label="Phone" error={errors.phone}>
                        <input
                          type="tel"
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          aria-invalid={Boolean(errors.phone)}
                        />
                      </Field>
                    </div>
                  </>
                ) : (
                  <p className="tray-closed">
                    The kitchen is closed right now — {openStatus().label.toLowerCase()}. Your tray will
                    be here when you come back.
                  </p>
                )}
              </form>
            )}

            <footer className="drawer__foot">
              {order ? (
                <button type="button" className="btn btn--light btn--block" onClick={onClose}>
                  Done
                </button>
              ) : lines.length > 0 && kitchenOpen && times.length > 0 ? (
                <button type="button" className="btn btn--light btn--block" onClick={place}>
                  Place pickup order — {inr(total)}
                </button>
              ) : (
                <button type="button" className="btn btn--light btn--block" onClick={onClose}>
                  Close
                </button>
              )}
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
