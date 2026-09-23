import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { projects } from '../data/projects'
import './Works.css'

export default function Works() {
  return (
    <main className="works">
      <Navbar />
      <header className="works__header">
        <p className="eyebrow">02 / WORKS</p>
        <div className="works__heading-row">
          <h1>selected works.</h1>
          <span>04 projects / 2026</span>
        </div>
      </header>

      <section className="works__grid" aria-label="Selected works">
        {projects.map((project, index) => (
          <Link className="work-item" to={`/project/${project.slug}`} key={project.slug}>
            <div className="work-item__image">
              <img src={project.cover} alt={project.title} loading={index > 1 ? 'lazy' : undefined} />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="work-item__meta">
              <div>
                <h2>{project.title}</h2>
                <p>{project.tags.join(' / ')}</p>
              </div>
              <small>{project.year} ↗</small>
            </div>
          </Link>
        ))}
      </section>

      <div className="works__note">selected work — 04</div>
    </main>
  )
}
