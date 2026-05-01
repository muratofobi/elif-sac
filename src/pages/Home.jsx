import { Link } from 'react-router-dom'
import Hero           from '../components/Hero.jsx'
import FeaturedSlider from '../components/FeaturedSlider.jsx'
import BottomSections from '../components/BottomSections.jsx'
import { useScrollColor } from '../hooks/useScrollColor.js'

function Home() {
  useScrollColor()

  return (
    <main>
      <Hero />
      <FeaturedSlider />
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <Link to="/projects" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-red-dark)', letterSpacing: '0.2em', transition: 'color 0.3s' }}>
          ── See All Projects ──
        </Link>
      </div>
      <BottomSections />
    </main>
  )
}

export default Home