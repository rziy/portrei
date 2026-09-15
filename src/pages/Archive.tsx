import { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { archiveItems } from '../data/archive'
import './Archive.css'

export default function Archive() {
  const [preview, setPreview] = useState<{ src: string; x: number; y: number } | null>(null)
  const [openItem, setOpenItem] = useState<typeof archiveItems[number] | null>(null)

  const updatePreview = useCallback((src: string, clientX: number, clientY: number) => {
    const width = 170
    const height = 220
    const gap = 22
    const margin = 18

    // Keep the preview inside the viewport. Near the bottom, flip it above the cursor.
    const above = clientY + gap + height > window.innerHeight - margin
    const y = above
      ? Math.max(margin, clientY - gap - height)
      : Math.min(window.innerHeight - margin - height, clientY + gap)

    const x = Math.min(
      window.innerWidth - margin - width,
      Math.max(margin, clientX + 24),
    )

    setPreview({ src, x, y })
  }, [])

  useEffect(() => {
    if (!openItem) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenItem(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openItem])

  return (
    <main className="archive">
      <Navbar />
      <header className="archive__header">
        <p className="archive__eyebrow">04 / ARCHIVE</p>
        <h1>the<br /><em>leftovers.</em></h1>
        <p className="archive__intro">Old studies, unfinished ideas, side quests, and things that were never meant to become a proper project.</p>
      </header>

      {/* Standalone archive content — not sourced from projects.ts, so this
          list is independent of Works in count, order, and images. No
          case-study page exists for these, so a row opens a lightbox
          instead of routing anywhere. */}
      <section className="archive__list" aria-label="Leftover studies and unused pieces">
        {archiveItems.map((item, i) => (
          <button
            type="button"
            className="archive__row"
            key={item.slug}
            onMouseEnter={e => updatePreview(item.image, e.clientX, e.clientY)}
            onMouseMove={e => updatePreview(item.image, e.clientX, e.clientY)}
            onMouseLeave={() => setPreview(null)}
            onClick={() => setOpenItem(item)}
          >
            <span className="archive__number">{String(i + 1).padStart(2, '0')}</span>
            <span className="archive__title">{item.title}</span>
            <span className="archive__type">{item.type}</span>
            <span className="archive__year">{item.year}</span>
            <span className="archive__arrow">⤢</span>
          </button>
        ))}
      </section>

      {preview && !openItem && (
        <img className="archive__preview" src={preview.src} alt="" style={{ left: preview.x, top: preview.y }} />
      )}

      {openItem && (
        <div className="archive__lightbox" role="dialog" aria-modal="true" aria-label={openItem.title} onClick={() => setOpenItem(null)}>
          <button type="button" className="archive__lightbox-close" onClick={() => setOpenItem(null)} aria-label="Close">✕</button>
          <figure onClick={e => e.stopPropagation()}>
            <img src={openItem.image} alt={openItem.title} />
            <figcaption><span>{openItem.title}</span><small>{openItem.type} — {openItem.year}</small></figcaption>
          </figure>
        </div>
      )}

      <div className="archive__note">04 — {String(archiveItems.length).padStart(2, '0')}</div>
    </main>
  )
}
