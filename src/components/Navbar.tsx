import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const LINKS = [
  { label: 'HOME', to: '/' },
  { label: 'WORKS', to: '/works' },
  { label: 'ABOUT', to: '/about' },
  { label: 'GALLERY', to: '/gallery' },
  { label: 'CONTACT', to: '/contact' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <Link className="navbar__brand" to="/">PORTREI.</Link>
      <div className="navbar__list">
        {LINKS.map(link => {
          const active = link.to === '/'
            ? location.pathname === '/'
            : location.pathname === link.to || (link.to === '/works' && location.pathname.startsWith('/project/'))
          return (
            <Link
              key={link.label}
              to={link.to}
              className={`navbar__item ${active ? 'navbar__item--active' : ''}`}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
