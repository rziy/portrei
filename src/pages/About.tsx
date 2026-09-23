import Navbar from '../components/Navbar'
import './About.css'

const sections = [
  ['EDUCATION', <>DKV — UDINUS<br />2026 — PRESENT</>],
  ['SKILLS', <>Graphic Design<br />Illustration<br /></>],
  ['INTERESTS', <>Illustration<br />Music<br />Design<br />Manga / Manhwa<br />Game</>],
]

export default function About() {
  return (
    <main className="about">
      <Navbar />
      <section className="simple-page">
        <p className="simple-page__eyebrow">03 / ABOUT</p>
        <h1>hi, i'm zhafran.</h1>
        <p className="simple-page__lead">Hello, My Name is Zhafran Ahmas Syafiq. I'm a visual designer interested in illustration, graphic design, typography, and small visual experiments.</p>
        <div className="about__list">
          {sections.map(([title, body]) => <div className="about__row" key={title as string}><span>{title}</span><p>{body}</p></div>)}
        </div>
        <p className="about__currently"><small>CURRENTLY</small> learning how to turn messy ideas into things people can look at for a little too long.</p>
      </section>
    </main>
  )
}
