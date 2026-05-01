import '../styles/hero.css'

function Hero() {
  return (
    <header className="hero">

      <div className="hero__bg" />

      <div className="hero__content">
        <h1 className="hero__title">Mensrea</h1>
        <p className="hero__subtitle">えりふ — Watashi no namae wa Mensrea desu</p>
        <a href="https://www.instagram.com/mensrea_/" target="_blank" rel="noreferrer" className="hero__btn">
          See More
        </a>
      </div>

    </header>
  )
}

export default Hero