import { useEffect, useRef } from 'react'

/**
 * Shared plumbing for the sandbox canvases: DPR-correct sizing, a single rAF
 * loop, and teardown when the modal unmounts.
 *
 * `draw` runs every frame with (ctx, { width, height, time, reduced }). When the
 * visitor prefers reduced motion, `time` is frozen at 0 so scenes stay legible
 * and static while control changes still repaint.
 */
export function useAnimatedCanvas(draw) {
  const canvasRef = useRef(null)
  const drawRef = useRef(draw)
  drawRef.current = draw

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let frame = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const start = performance.now()
    const loop = (now) => {
      ctx.clearRect(0, 0, width, height)
      drawRef.current(ctx, {
        width,
        height,
        time: reduced ? 0 : (now - start) / 1000,
        reduced,
      })
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  return canvasRef
}

/** Rounded-rect path helper — used by most of the sandbox scenes. */
export function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}
