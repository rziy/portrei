import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Works from './pages/Works'
import About from './pages/About'
import Archive from './pages/Archive'
import Contact from './pages/Contact'
import Project from './pages/Project'

function RouteShell() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname, location.search])

  return (
    <div key={`${location.pathname}${location.search}`} className="page-transition">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/about" element={<About />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/:slug" element={<Project />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return <RouteShell />
}
