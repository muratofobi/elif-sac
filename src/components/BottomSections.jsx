import '../styles/bottomSections.css'

function handleSubmit(e) {
  e.preventDefault()
  alert('Message sent! (EmailJS integration coming soon)')
}

function BottomSections() {
  return (
    <footer className="bottom">

      {/* VİZYONUMUZ BÖLÜMÜ - id eklendi */}
      <section id="vizyonumuz" className="bottom__section">
        <h2 className="bottom__title">Our Vision</h2>
        <p className="bottom__text">
          Art as a lens through which the unseen becomes visible.
          Every line drawn is a question asked — a boundary pushed
          between the familiar and the strange.
        </p>
      </section>

      {/* HAKKIMIZDA BÖLÜMÜ - id eklendi */}
      <section id="hakkimizda" className="bottom__section">
        <h2 className="bottom__title">About</h2>
        <p className="bottom__text">
          Mensrea is a self-taught illustrator and visual artist.
          Working primarily with ink and pencil, the work explores
          mythology, architecture, and the quietly surreal.
          Based everywhere, rooted nowhere.
        </p>
      </section>

      {/* İLETİŞİM BÖLÜMÜ - id "iletisim" olarak güncellendi */}
      <section id="iletisim" className="bottom__section">
        <h2 className="bottom__title">Contact</h2>
        <form className="bottom__form" onSubmit={handleSubmit}>
          <input className="bottom__input" type="email" placeholder="your email" required />
          <input className="bottom__input" type="text" placeholder="subject" required />
          <textarea className="bottom__textarea" placeholder="your message..." required />
          <button className="bottom__btn btn-modern" type="submit">
            <span>Send</span>
            <svg viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>
      </section>

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