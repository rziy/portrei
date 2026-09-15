import Navbar from '../components/Navbar'
import './About.css'

export default function About() {
  return (
    <main className="about">
      <Navbar />
      <div className="about__content">
        <p className="about__eyebrow">03 / ABOUT</p>
        <h1>hi, i'm<br /><em>zhafran.</em></h1>
        <p className="about__lead">A visual designer interested in illustration, graphic design, typography, and the strange little visual experiments that happen between them.</p>

        <div className="about__grid">
          <section><h2>EDUCATION</h2><p>DKV — UDINUS<br />2026 — PRESENT</p></section>
          <section><h2>SKILLS</h2><p>Graphic Design<br />Illustration<br />Typography<br />Package Design</p></section>
          <section><h2>INTERESTS</h2><p>Illustration<br />Music<br />Design<br />Manga/Manhwa<br />Game</p></section>
        </div>

        <div className="about__currently">
          <span>CURRENTLY</span>
          <p>learning how to turn messy ideas into things people can look at for a little too long.</p>
        </div>

        <div className="about__contact">
          <span>LET'S MAKE SOMETHING.</span>
          <a href="mailto:zsyfiq001@gmail.com">zsyfiq001@gmail.com ↗</a>
          <a href="https://www.instagram.com/zfvrn/" aria-label="Instagram">Instagram ↗</a>
          {/* <a href="https://www.behance.net/zaza" aria-label="Behance">Behance ↗</a> */}
          {/* <a href="https://www.linkedin.com/in/zaza" aria-label="LinkedIn">LinkedIn ↗</a> */}
        </div>
      </div>
    </main>
  )
}
