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
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <Link to="/projects" className="btn-modern">
          <span>See All Projects</span>
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
        </Link>
      </div>
      <BottomSections />
    </main>
  )
}

export default Home