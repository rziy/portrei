import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { projects } from '../data/projects'
import './Works.css'

type ViewMode = 'Flat' | 'Tilt' | 'Ring' | 'Gallery'
const MODES: ViewMode[] = ['Flat', 'Tilt', 'Ring', 'Gallery']
const tiltAngles = [-4, 2, -1, 5, -2, 3]

function ProjectMedia({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} loading="lazy" />
}

export default function Works() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initial = searchParams.get('mode')
  const normalizedInitial = initial
    ? (initial.charAt(0).toUpperCase() + initial.slice(1)) as ViewMode
    : 'Flat'
  const [mode, setMode] = useState<ViewMode>(MODES.includes(normalizedInitial) ? normalizedInitial : 'Flat')
  const [galleryIndex, setGalleryIndex] = useState(0)
  const ringRef = useRef<HTMLDivElement>(null)
  const ringStageRef = useRef<HTMLDivElement>(null)
  const ringState = useRef({ angle: 0, velocity: 0, dragging: false, pointerX: 0 })

  useEffect(() => {
    if (mode !== 'Ring') return
    const container = ringRef.current
    const stage = ringStageRef.current
    if (!container || !stage) return

    const state = ringState.current
    const cards = Array.from(stage.querySelectorAll<HTMLElement>('.ring-card'))
    let raf = 0
    let last = performance.now()

    const render = (time: number) => {
      const dt = Math.min(32, time - last)
      last = time
      if (!state.dragging) {
        state.angle += 0.00034 * dt + state.velocity * dt
        state.velocity *= Math.pow(0.91, dt / 16)
      }

      const rect = container.getBoundingClientRect()
      const radiusX = Math.min(rect.width * 0.31, 330)
      const radiusY = Math.min(rect.height * 0.27, 225)

      cards.forEach((card: HTMLElement, index: number) => {
        const base = (Math.PI * 2 * index) / cards.length - Math.PI / 2
        const angle = base + state.angle
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        const depth = (sin + 1) / 2
        const scale = 0.70 + depth * 0.31
        const opacity = 0.42 + depth * 0.58
        const z = Math.round(depth * 100)
        const x = cos * radiusX
        const y = sin * radiusY
        const rotate = cos * -5.5
        const blur = depth < 0.14 ? (0.14 - depth) * 7 : 0

        card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) rotate(${rotate}deg) scale(${scale})`
        card.style.opacity = `${opacity}`
        card.style.zIndex = `${z}`
        card.style.filter = blur ? `blur(${blur}px)` : 'none'
        card.style.setProperty('--ring-depth', `${depth}`)
      })

      raf = requestAnimationFrame(render)
    }

    // Only hijack the wheel for horizontal (trackpad swipe) gestures — a
    // plain vertical mouse-wheel scroll should still scroll the page. Without
    // this check, hovering the ring made it impossible to scroll past it.
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
      event.preventDefault()
      state.velocity += event.deltaX * 0.000018
      state.velocity = Math.max(-0.009, Math.min(0.009, state.velocity))
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return
      state.dragging = true
      state.pointerX = event.clientX
      state.velocity = 0
      container.setPointerCapture(event.pointerId)
      container.classList.add('ring--dragging')
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!state.dragging) return
      const dx = event.clientX - state.pointerX
      state.pointerX = event.clientX
      state.angle += dx * 0.0042
      state.velocity = dx * 0.00004
    }

    const stopDrag = (event: PointerEvent) => {
      state.dragging = false
      container.classList.remove('ring--dragging')
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId)
    }

    raf = requestAnimationFrame(render)
    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('pointerdown', onPointerDown)
    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerup', stopDrag)
    container.addEventListener('pointercancel', stopDrag)

    return () => {
      cancelAnimationFrame(raf)
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerup', stopDrag)
      container.removeEventListener('pointercancel', stopDrag)
    }
  }, [mode])

  useEffect(() => {
    if (mode !== 'Gallery') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setGalleryIndex(i => (i + 1) % projects.length)
      if (e.key === 'ArrowLeft') setGalleryIndex(i => (i - 1 + projects.length) % projects.length)
      if (e.key === 'Escape') setView('Flat')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode])

  const setView = (next: ViewMode) => {
    setMode(next)
    setGalleryIndex(0)
    if (next === 'Ring') {
      ringState.current.angle = 0
      ringState.current.velocity = 0
      ringState.current.dragging = false
    }
    setSearchParams(next === 'Flat' ? {} : { mode: next.toLowerCase() })
  }

  // One card per project — no duplicates. (Previously this padded the ring
  // out to 8 slots by repeating each project twice, which looked odd once
  // you noticed the same poster twice, and made the counter say "08" when
  // there are only 4 actual projects.)
  const ringItems = useMemo(() => projects.map(project => ({ project })), [])
  const galleryProject = projects[galleryIndex] ?? projects[0]

  return (
    <main className="works">
      <Navbar />
      <header className="works__toolbar">
        <div><p className="eyebrow">02 / WORKS</p><h1>selected works</h1></div>
        <div className="works__modes" aria-label="Project view modes">
          {MODES.map(m => <button key={m} type="button" className={`mode-btn ${mode === m ? 'mode-btn--active' : ''}`} onClick={() => setView(m)} aria-pressed={mode === m}>{m.toUpperCase()}</button>)}
        </div>
      </header>

      {mode === 'Flat' && <section className="works__grid" aria-label="Selected projects">
        {projects.map((p, i) => <Link to={`/project/${p.slug}`} key={p.slug} className={`work-card work-card--${i % 4}`}>
          <div className="work-card__img"><ProjectMedia src={p.cover} alt={`${p.title} project cover`} /></div>
          <div className="work-card__meta"><span>{p.title}</span><small>{p.year}</small></div>
          <small className="work-card__tag">{p.tags[0]}</small>
        </Link>)}
      </section>}

      {mode === 'Tilt' && <section className="works__tilt" aria-label="Tilted project collection">
        {projects.map((p, i) => <Link to={`/project/${p.slug}`} key={p.slug} className="tilt-card" style={{ '--tilt': `${tiltAngles[i % tiltAngles.length]}deg` } as React.CSSProperties}>
          <div className="tilt-card__image"><ProjectMedia src={p.cover} alt={`${p.title} project cover`} /></div><span>{p.title}</span><small>{String(i + 1).padStart(2, '0')} / {p.year}</small>
        </Link>)}
      </section>}

      {mode === 'Ring' && <section className="ring" ref={ringRef} aria-label="Radial project collection">
        <div className="ring__orbit" aria-hidden="true" />
        <div className="ring__stage" ref={ringStageRef}>
          {ringItems.map(({ project }, index) => <Link key={project.slug} to={`/project/${project.slug}`} className="ring-card">
            <div className="ring-card__paper">
              <span className="ring-card__number">{String(index + 1).padStart(2, '0')}</span>
              <img src={project.cover} alt={`${project.title} project cover`} draggable="false" />
              <div className="ring-card__meta"><span>{project.title}</span><small>{project.year}</small></div>
            </div>
          </Link>)}
        </div>
      </section>}

      {mode === 'Gallery' && <section className="gallery" aria-label="Fullscreen project gallery">
        <button className="gallery__nav gallery__nav--prev" type="button" onClick={() => setGalleryIndex(i => (i - 1 + projects.length) % projects.length)} aria-label="Previous project">←</button>
        <div className="gallery__image"><img key={galleryProject.slug} src={galleryProject.cover} alt={`${galleryProject.title} project cover`} /></div>
        <div className="gallery__info"><span>{String(galleryIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><Link to={`/project/${galleryProject.slug}`}><h2>{galleryProject.title}</h2></Link><small>{galleryProject.year} — {galleryProject.tags.join(' / ')}</small></div>
        <button className="gallery__nav gallery__nav--next" type="button" onClick={() => setGalleryIndex(i => (i + 1) % projects.length)} aria-label="Next project">→</button>
      </section>}

      {/* Always reflects the real number of projects — Ring mode repeats
          each project twice to fill the circle, but that's a visual choice,
          not more actual work, so the counter shouldn't say 08. */}
      <div className="works__counter">02 — {String(projects.length).padStart(2, '0')}</div>
    </main>
  )
}
