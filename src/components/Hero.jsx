import '../styles/hero.css'

function Hero() {
  return (
    <header className="hero">

      <div className="hero__bg" />

      <div className="hero__content">
        <h1 className="hero__title">Mensrea</h1>
        <p className="hero__subtitle">えりふ — Watashi no namae wa Mensrea desu</p>
        <a href="https://www.instagram.com/mensrea_/" target="_blank" rel="noreferrer" className="hero__btn btn-modern">
          <span>See More</span>
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
        </a>
      </div>

    </header>
  )
}

export default Hero