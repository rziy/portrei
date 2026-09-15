import Navbar from '../components/Navbar'
import './Contact.css'

// Only list socials that actually have a working URL — a link that looks
// clickable but goes nowhere ("#") is worse than not showing it at all.
// Add Behance/LinkedIn here once those accounts are ready.
const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/zfvrn/' },
]

export default function Contact() {
  return (
    <main className="contact">
      <Navbar />
      <section className="contact__hero">
        <p className="contact__eyebrow">05 / CONTACT</p>
        <h1>let's make<br /><em>something.</em></h1>
        <p className="contact__copy">Have a poster, identity, illustration, or weird little visual problem? Send it over.</p>

        <a className="contact__email" href="mailto:zsyfiq001@gmail.com">
          <span>zsyfiq001@gmail.com</span><b>↗</b>
        </a>
      </section>
    </main>
  )
}
