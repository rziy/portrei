import Navbar from '../components/Navbar'
import './Contact.css'

const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/zfvrn/' },
]

export default function Contact() {
  return (
    <main className="contact">
      <Navbar />

      <section className="contact__hero">
        <p className="contact__eyebrow">05 / CONTACT</p>

        <h1>
          let's make<br />
          <em>something.</em>
        </h1>

        <p className="contact__copy">
          Have a poster, identity, illustration, or weird little visual problem? Send it over.
        </p>

        <a className="contact__email" href="mailto:zsyfiq001@gmail.com">
          <span>zsyfiq001@gmail.com</span>
          <b>↗</b>
        </a>

        <div className="contact__socials">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
            >
              {social.name}
              <span>↗</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}