import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { projects } from '../data/projects'
import './Project.css'

export default function Project() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)
  const [open, setOpen] = useState(true)

  if (!project) return <main className="project project--empty"><p>Project tidak ditemukan.</p><Link to="/works">← KEMBALI KE WORKS</Link></main>

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]
  const prev = projects[(index - 1 + projects.length) % projects.length]

  return (
    <main className="project">
      <Navbar />
      <Link to="/works" className="project__back">← BACK TO WORKS</Link>
      <header className="project__hero">
        <div className="project__intro">
          <p className="project__eyebrow">PROJECT / {String(index + 1).padStart(2, '0')}</p>
          <h1>{project.title}</h1>
          <div className="project__year">{project.year}</div>
          <div className="project__tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <p className="project__description">{project.description}</p>
        </div>
        <figure className="project__cover"><img src={project.cover} alt={`${project.title} cover`} /><figcaption>cover / selected frame</figcaption></figure>
      </header>

      <section className="project__details">
        <button type="button" onClick={() => setOpen(v => !v)} aria-expanded={open}><span>ABOUT THIS PROJECT</span><b>{open ? '−' : '+'}</b></button>
        {open && <div className="project__detail-grid"><div><small>ROLE</small><p>{project.role ?? 'Graphic Design'}</p></div><div><small>TOOLS</small><p>{project.tools?.join(' / ') ?? '—'}</p></div><div><small>CREDITS</small><p>{project.credits ?? 'Zhafran A Syafiq'}</p></div></div>}
      </section>

      <section className="project__story">
        {project.images.map((image, i) => <figure key={image} className={`project__image project__image--${i % 3}`}><img src={image} alt={`${project.title} detail ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} /><figcaption>{String(i + 1).padStart(2, '0')} / visual study</figcaption></figure>)}
      </section>

      <footer className="project__footer">
        <Link to={`/project/${prev.slug}`}>← {prev.title}</Link>
        <span>END OF CASE STUDY / {project.title}</span>
        <Link className="project__next" to={`/project/${next.slug}`}>NEXT PROJECT <b>↗</b></Link>
      </footer>
    </main>
  )
}
