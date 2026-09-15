import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FloatingObject from '../components/FloatingObject'
import { projects } from '../data/projects'
import './Home.css'

const notes = [
  { text: 'things i keep making', className: 'home-note home-note--lime' },
  { text: 'look closer ↘', className: 'home-note home-note--pink' },
  { text: 'sketch / type / image', className: 'home-note home-note--blue' },
]

export default function Home() {
  return (
    <main className="stage">
      <Navbar />

      <div className="stage__index">zhafran / 00—01</div>
      <div className="stage__rule" aria-hidden="true" />

      <div className="wordmark" aria-label="Zhafran, visual designer">
        <h1>zhafran</h1>
        <p>VISUAL DESIGNER / DKV STUDENT</p>
      </div>

      <p className="stage__aside">graphic design<br />illustration<br />visual experiments</p>

      <FloatingObject style={{ top: '13%', left: '7%' }} rotation={-7} delay={0} label="handwritten note">
        <div className="paper-note paper-note--yellow">
          bismillah,<br />
          aku kuat, aku hebat.
        </div>
      </FloatingObject>

      <FloatingObject style={{ top: '10%', left: '35%' }} rotation={2} delay={.7} label="project photograph">
        <div className="taped-photo">
          <span className="tape tape--top" />
          <img src={projects[0].cover} alt="" />
          <small>lucia / 2026</small>
        </div>
      </FloatingObject>

      <FloatingObject style={{ top: '12%', right: '9%' }} rotation={6} delay={1.1} label="project card">
        <Link to={`/project/${projects[1].slug}`} className="mini-poster">
          <img src={projects[1].cover} alt="" />
          <span>film<br />poster</span>
        </Link>
      </FloatingObject>

      <FloatingObject style={{ top: '48%', left: '6%' }} rotation={-4} delay={1.5} label="sketch">
        <div className="sketch-paper">
          <span>01</span>
          <b>kurang<br />kurangin<br />kerjaan</b>
          <i>:v</i>
        </div>
      </FloatingObject>

      <FloatingObject style={{ bottom: '18%', left: '20%' }} rotation={5} delay={.3} label="sticky note">
        <div className="sticky sticky--blue">
          save this<br />for later
          <span>09:14</span>
        </div>
      </FloatingObject>

      <FloatingObject style={{ bottom: '11%', left: '38%' }} rotation={-5} delay={1.7} label="archive label">
        <div className="archive-slip">ARCHIVE_04<br /><small>visual / personal / 26</small></div>
      </FloatingObject>

      <FloatingObject style={{ bottom: '25%', right: '21%' }} rotation={-3} delay={2.1} label="project card">
        <Link to={`/project/${projects[2].slug}`} className="mini-poster mini-poster--small">
          <img src={projects[2].cover} alt="" />
          <span>product<br />poster</span>
        </Link>
      </FloatingObject>

      <FloatingObject style={{ bottom: '10%', right: '7%' }} rotation={4} delay={.9} label="project note">
       <div className="paper-note paper-note--white">
  besok<br />senen
  <span>zzz</span>
</div>
      </FloatingObject>

      <div className="home-notes" aria-hidden="true">
        {notes.map(note => <span key={note.text} className={note.className}>{note.text}</span>)}
      </div>

      {/* Mobile only (see Home.css) — the free-floating collage above is a
          desktop interaction (drag needs room + a mouse). On small screens
          it's replaced by this plain, in-flow, scrollable project list,
          per the "static composition on mobile" rule in the brief. */}
      <section className="stage__mobile-works" aria-label="Recent work">
        {projects.map(p => (
          <Link to={`/project/${p.slug}`} key={p.slug} className="stage__mobile-card">
            <img src={p.cover} alt={`${p.title} project cover`} loading="lazy" />
            <span>{p.title}</span>
            <small>{p.year}</small>
          </Link>
        ))}
      </section>

      <div className="counter">01 — {String(projects.length).padStart(2, '0')}</div>
    </main>
  )
}
