import { useCallback, useEffect, useRef, useState } from 'react'

// Minimum pointer travel (px) before a press counts as a drag rather than a
// click. Without this, every plain click on a floating object (including the
// ones that are links, like the project-card floaters on Home) immediately
// flipped `dragging` on and rewrote the element's position from % to px —
// so a fraction-of-a-pixel of mouse jitter during a click could nudge the
// object, and the drag-shadow/z-index styling flashed on for every tap.
const DRAG_THRESHOLD = 6

export function useDraggable() {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [highlighted, setHighlighted] = useState(false)
  const pos = useRef({ startX: 0, startY: 0, origX: 0, origY: 0 })
  const pending = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse), (max-width: 720px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (isMobile) {
      setHighlighted(h => !h)
      return
    }

    const el = ref.current
    if (!el) return

    const parentRect = el.offsetParent?.getBoundingClientRect()
    const rect = el.getBoundingClientRect()

    pos.current.origX = rect.left - (parentRect?.left ?? 0)
    pos.current.origY = rect.top - (parentRect?.top ?? 0)
    pos.current.startX = e.clientX
    pos.current.startY = e.clientY

    // Don't commit to "dragging" yet — wait for real movement (see
    // DRAG_THRESHOLD above) so a plain click passes through untouched.
    pending.current = true
    el.setPointerCapture(e.pointerId)
  }, [isMobile])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (isMobile || !pending.current) return
    const el = ref.current
    if (!el) return

    const dx = e.clientX - pos.current.startX
    const dy = e.clientY - pos.current.startY

    if (!dragging) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return
      setDragging(true)
    }

    el.style.left = `${pos.current.origX + dx}px`
    el.style.top = `${pos.current.origY + dy}px`
    el.style.right = 'auto'
    el.style.bottom = 'auto'
  }, [dragging, isMobile])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (ref.current?.hasPointerCapture(e.pointerId)) {
      ref.current.releasePointerCapture(e.pointerId)
    }
    pending.current = false
    setDragging(false)
  }, [])

  return {
    ref,
    isMobile,
    dragging,
    highlighted,
    handlers: { onPointerDown, onPointerMove, onPointerUp },
  }
}
