import Navbar from '../components/Navbar'
import './Contact.css'

export default function Contact() {
  return (
    <main className="contact">
      <Navbar />

      <section className="contact__hero">
        <p className="contact__eyebrow">05 / CONTACT</p>

        <h1>
          let's make<br />
          something.
        </h1>

        <p className="contact__copy">
          I’m interested in illustration, graphic design, and the strange
          little visual experiments between them. If you have something sitting in
          your head, you can send it over.
        </p>

        <a className="contact__email" href="mailto:zsyfiq001@gmail.com">
          <span>zsyfiq001@gmail.com</span>
          <b>↗</b>
        </a>

        <div className="contact__bottom">
          <div>
            <span>NOT AVAILABLE FOR NOW</span>
            <p>
  <span className="strikethrough">posters / graphic design</span><br />
</p>
          </div>

          <div>
            <span>ELSEWHERE</span>
            <p>
              <a href="https://www.instagram.com/zfvrn/" target="_blank" rel="noreferrer">
                Instagram ↗
              </a>
            </p>
          </div>

          <div className="contact__stamp" aria-label="Open to ideas">
            SEND IT
            <small>OPEN TO IDEAS / 2026</small>
          </div>
        </div>
      </section>
    </main>
  )
}
