import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const LINKS = [
  { label: 'HOME', to: '/' },
  { label: 'WORKS', to: '/works' },
  { label: 'ABOUT', to: '/about' },
  { label: 'ARCHIVE', to: '/archive' },
  { label: 'CONTACT', to: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // The hamburger toggle only does anything on mobile (desktop hides the
  // button via CSS and always shows the full list) — but the open state
  // still needs to reset when it's not relevant anymore.
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Lock page scroll behind the sidebar while it's open, so dragging the
  // drawer doesn't also scroll the page underneath it.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <nav className={`navbar ${open ? 'navbar--open' : ''}`} aria-label="Primary navigation" ref={navRef}>
      <button
        type="button"
        className="navbar__toggle"
        aria-expanded={open}
        aria-controls="navbar-list"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(v => !v)}
      >
        <span /><span /><span />
      </button>

      {/* Backdrop dims the page and doubles as a tap-to-close target. */}
      <div className="navbar__backdrop" aria-hidden="true" onClick={() => setOpen(false)} />

      <div className="navbar__list" id="navbar-list">
        {LINKS.map((link, i) => {
          const active = link.to === '/'
            ? location.pathname === '/'
            : location.pathname === link.to || location.pathname.startsWith(`${link.to}/`)
          return (
            <Link
              key={link.label}
              to={link.to}
              className={`navbar__item ${active ? 'navbar__item--active' : ''}`}
              data-i={i}
              onClick={() => setOpen(false)}
            >
              <span>{link.label}</span><i aria-hidden="true">↗</i>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
