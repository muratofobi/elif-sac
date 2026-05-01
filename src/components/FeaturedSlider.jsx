import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom' // <- useLocation eklendi
import projects from '../data/projectsData.js'
import '../styles/featuredSlider.css'

function FeaturedSlider() {
  const trackRef = useRef(null)
  const sectionRef = useRef(null)
  const [offset, setOffset] = useState(0)
  
  // Bulunduğumuz sayfanın bilgisini alıyoruz (Modalın arkaplanı için)
  const location = useLocation() 

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current) return
      
      const section = sectionRef.current.getBoundingClientRect()
      const trackW = trackRef.current.scrollWidth
      const containerW = sectionRef.current.offsetWidth
      
      const maxShift = trackW - containerW
      
      const progress = 1 - (section.bottom / (section.height + window.innerHeight))
      const clamped = Math.min(1, Math.max(0, progress))
      
      setOffset(-(clamped * maxShift))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const featured = projects.filter(p => p.featured === true || p.featured === "true")
  const displayList = featured.length > 0 ? featured : projects

  return (
    <section id="projeler" className="slider" ref={sectionRef}>
      <h2 className="slider__heading">Featured Projects</h2>
      <div className="slider__window">
        <div 
          className="slider__track" 
          ref={trackRef} 
          style={{ 
            transform: `translateX(${offset}px)`,
            display: 'flex',
            gap: '4rem',
            width: 'max-content'
          }}
        >
          {displayList.map(project => {
            const displayImage = project.images?.[0] || project.image || '';

            return (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`} 
                state={{ background: location }} // <- KRİTİK EKLENTİ: Tıklanınca arka planda anasayfa kalacak!
                className="slider__card"
              >
                <div className="slider__card-img-wrap">
                  {displayImage ? (
                    <img 
                      src={displayImage} 
                      alt={project.title} 
                      className="slider__card-img" 
                    />
                  ) : (
                    <div style={{width: '100%', height: '100%', background: '#1a1a1a'}} />
                  )}
                </div>
                <div className="slider__card-body">
                  <h3 className="slider__card-title">{project.title}</h3>
                  {project.date && (
                    <span className="project-date" style={{
                      color: 'var(--color-red)', 
                      fontSize: '1.2rem', 
                      display: 'block', 
                      marginBottom: '15px'
                    }}>
                      {project.date}
                    </span>
                  )}
                  <p className="slider__card-desc">{project.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSlider