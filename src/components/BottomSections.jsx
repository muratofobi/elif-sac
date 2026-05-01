import '../styles/bottomSections.css'

function handleSubmit(e) {
  e.preventDefault()
  alert('Message sent! (EmailJS integration coming soon)')
}

function BottomSections() {
  return (
    <footer className="bottom">

      <section className="bottom__section">
        <h2 className="bottom__title">Our Vision</h2>
        <p className="bottom__text">
          Art as a lens through which the unseen becomes visible.
          Every line drawn is a question asked — a boundary pushed
          between the familiar and the strange.
        </p>
      </section>

      <section className="bottom__section">
        <h2 className="bottom__title">About</h2>
        <p className="bottom__text">
          Mensrea is a self-taught illustrator and visual artist.
          Working primarily with ink and pencil, the work explores
          mythology, architecture, and the quietly surreal.
          Based everywhere, rooted nowhere.
        </p>
      </section>

      <section id="contact" className="bottom__section">
        <h2 className="bottom__title">Contact</h2>
        <form className="bottom__form" onSubmit={handleSubmit}>
          <input className="bottom__input" type="email" placeholder="your email" required />
          <input className="bottom__input" type="text" placeholder="subject" required />
          <textarea className="bottom__textarea" placeholder="your message..." required />
          <button className="bottom__btn" type="submit">Send →</button>
        </form>
      </section>

      <div className="bottom__bar">
        {/* Entire music bar is clickable → Spotify */}
        <a href="https://open.spotify.com/user/1b6tmmos1ivqe37qo2l78rmhn" target="_blank" rel="noreferrer" className="bottom__music">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="bottom__bar-line" />
          ))}
          <span className="bottom__spotify">♫</span>
        </a>
        <img src="/image_site/cat_pixelart.gif" alt="cat" className="bottom__cat" />
        <span className="bottom__copy">© Mensrea</span>
      </div>

    </footer>
  )
}

export default BottomSections