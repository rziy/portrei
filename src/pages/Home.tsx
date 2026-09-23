import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Home.css'

export default function Home() {
  return (
    <main className="home">
      <Navbar />
      <section className="home__content">
        <p className="home__eyebrow">VISUAL DESIGNER / DKV STUDENT</p>
        <h1>portrei<span>.</span></h1>
        <p className="home__intro">graphic design, images, type, and visual experiments.</p>
        <Link className="home__cta" to="/works">VIEW WORKS <span>↗</span></Link>
      </section>
      <footer className="home__footer">
        <span>bismillah, aku kuat, aku hebat.</span>
        <span>2026</span>
      </footer>
    </main>
  )
}
