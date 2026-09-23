import { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { archiveItems } from '../data/archive'
import './Archive.css'

export default function Archive() {
  const [preview, setPreview] = useState<{ src: string; x: number; y: number } | null>(null)
  const [openItem, setOpenItem] = useState<typeof archiveItems[number] | null>(null)

  const updatePreview = useCallback((src: string, clientX: number, clientY: number) => {
    const width = 180
    const height = 220
    const gap = 20
    const margin = 18
    const y = clientY + gap + height > window.innerHeight - margin
      ? Math.max(margin, clientY - gap - height)
      : Math.min(window.innerHeight - margin - height, clientY + gap)
    const x = Math.min(window.innerWidth - margin - width, Math.max(margin, clientX + 22))
    setPreview({ src, x, y })
  }, [])

  useEffect(() => {
    if (!openItem) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenItem(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openItem])

  return (
    <main className="archive">
      <Navbar />
      <header className="archive__header">
        <p className="archive__eyebrow">04 / GALLERY</p>
        <div className="archive__heading-row">
          <h1>the leftovers.</h1>
          <span>{archiveItems.length} pieces</span>
        </div>
        <p className="archive__intro">Old studies, unfinished ideas, side quests, failed attempts, and things that never became a proper project.</p>
      </header>

      <section className="archive__grid" aria-label="Archive gallery">
        {archiveItems.map((item, i) => (
          <button
            type="button"
            className="archive__item"
            key={item.slug}
            onMouseEnter={e => updatePreview(item.image, e.clientX, e.clientY)}
            onMouseMove={e => updatePreview(item.image, e.clientX, e.clientY)}
            onMouseLeave={() => setPreview(null)}
            onClick={() => setOpenItem(item)}
          >
            <span className="archive__image"><img src={item.image} alt={item.title} loading="lazy" /></span>
            <span className="archive__meta"><b>{String(i + 1).padStart(2, '0')} / {item.title}</b><small>{item.type} · {item.year}</small></span>
          </button>
        ))}
      </section>

      {preview && !openItem && <img className="archive__preview" src={preview.src} alt="" style={{ left: preview.x, top: preview.y }} />}

      {openItem && (
        <div className="archive__lightbox" role="dialog" aria-modal="true" aria-label={openItem.title} onClick={() => setOpenItem(null)}>
          <button type="button" className="archive__lightbox-close" onClick={() => setOpenItem(null)} aria-label="Close">DONE</button>
          <figure onClick={e => e.stopPropagation()}>
            <img src={openItem.image} alt={openItem.title} />
            <figcaption><span>{openItem.title}</span><small>{openItem.type} — {openItem.year}</small></figcaption>
          </figure>
        </div>
      )}
    </main>
  )
}
