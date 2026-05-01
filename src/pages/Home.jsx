import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Hero           from '../components/Hero.jsx'
import FeaturedSlider from '../components/FeaturedSlider.jsx'
import BottomSections from '../components/BottomSections.jsx'
import { useScrollColor } from '../hooks/useScrollColor.js'

function Home() {
  useScrollColor()
  const location = useLocation()

  // 1. SADECE Navbar'daki başlıklara tıklandığında (URL'in sonuna # eklendiğinde) çalışır
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location.hash]) // <- KRİTİK NOKTA: Artık sadece hash değişirse kayacak!

  // 2. SADECE başka bir sayfadan anasayfaya dönüldüğünde en tepeye çıkartır
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname]) // <- KRİTİK NOKTA: Menü açılıp kapandığında değil, sayfa ("/") değiştiğinde çalışacak!

  return (
    <main>
      <Hero/>
      <FeaturedSlider />
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <Link 
          to="/projects" 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '1.5rem', 
            color: 'var(--color-red-dark)', 
            letterSpacing: '0.2em', 
            transition: 'color 0.3s' 
          }}
        >
          ── See All Projects ──
        </Link>
      </div>
      <BottomSections />
    </main>
  )
}

export default Home