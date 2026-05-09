import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import confetti from 'canvas-confetti'
import '../styles/bottomSections.css'

function BottomSections() {
  const form = useRef()
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSending(true)

    // EmailJS panelinden aldığın kendi anahtarlarını buraya yapıştır
    const SERVICE_ID = "service_2izxybe"; 
    const TEMPLATE_ID = "template_iu5v9fz"; 
    const PUBLIC_KEY = "e5tZszjOCjHGVuMYx"; 

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        // Başarı durumunda konfetiyi patlatıyoruz
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          zIndex: 9999 // Sitenin tüm elementlerinin üstünde görünmesi için
        });

        alert('Message sent successfully! I will get back to you soon.')
        e.target.reset()
      })
      .catch((error) => {
        console.error('EmailJS Error:', error)
        alert('An error occurred. Please try again.')
      })
      .finally(() => {
        setIsSending(false)
      })
  }

  return (
    <footer className="bottom">

      {/* VİZYONUMUZ BÖLÜMÜ - Orijinal hali korundu */}
      <section id="vizyonumuz" className="bottom__section">
        <h2 className="bottom__title">Our Vision</h2>
        <p className="bottom__text">
          Art as a lens through which the unseen becomes visible.
          Every line drawn is a question asked — a boundary pushed
          between the familiar and the strange.
        </p>
      </section>

      {/* HAKKIMIZDA BÖLÜMÜ - Orijinal hali korundu */}
      <section id="hakkimizda" className="bottom__section">
        <h2 className="bottom__title">About</h2>
        <p className="bottom__text">
          Mensrea is a self-taught illustrator and visual artist.
          Working primarily with ink and pencil, the work explores
          mythology, architecture, and the quietly surreal.
          Based everywhere, rooted nowhere.
        </p>
      </section>

      {/* İLETİŞİM BÖLÜMÜ - Form ve EmailJS entegrasyonu */}
      <section id="iletisim" className="bottom__section">
        <h2 className="bottom__title">Contact</h2>
        
        {/* ref eklendi ve onSubmit fonksiyonu içerideki handleSubmit'e bağlandı */}
        <form ref={form} className="bottom__form" onSubmit={handleSubmit}>
          
          {/* Şablondaki {{name}} ile eşleşmesi için orijinal classınla eklendi */}
          <input className="bottom__input" name="name" type="text" placeholder="your name" required />
          
          <input className="bottom__input" name="email" type="email" placeholder="your email" required />
          <input className="bottom__input" name="title" type="text" placeholder="subject" required />
          <textarea className="bottom__textarea" name="message" placeholder="your message..." required />
          
          <button className="bottom__btn btn-modern" type="submit" disabled={isSending}>
            <span>{isSending ? 'Sending...' : 'Send'}</span>
            
            {/* Gönderim sırasında ikonu gizler */}
            {!isSending && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            )}
          </button>
        </form>
      </section>

      {/* ALT BAR VE KEDİ GİFİ - Orijinal hali korundu */}
      <div className="bottom__bar">
        {/* Entire music bar is clickable → Spotify */}
        <a href="https://open.spotify.com/user/1b6tmmos1ivqe37qo2l78rmhn" target="_blank" rel="noreferrer" className="bottom__music">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="bottom__bar-line" />
          ))}
        </a>
        <img
          src="/image_site/cat_pixelart.gif"
          alt="cat"
          className="bottom__cat"
          loading="lazy"
        />
        <span className="bottom__copy">© MCO</span>
      </div>

    </footer>
  )
}

export default BottomSections