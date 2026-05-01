import { useEffect, useRef, useState } from 'react'
import projects from '../data/projects.js'
import '../styles/featuredSlider.css'

function FeaturedSlider() {
  const trackRef = useRef(null)
  const sectionRef = useRef(null)
  const [offset, setOffset] = useState(0)

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

  const featured = projects.filter(p => p.featured)

  return (
    <section className="slider" ref={sectionRef}>
      <h2 className="slider__heading">Featured Projects</h2>
      <div className="slider__window">
        <div className="slider__track" ref={trackRef} style={{ transform: `translateX(${offset}px)` }}>
          {featured.map(project => (
            <a key={project.id} href={project.instagramUrl} target="_blank" rel="noreferrer" className="slider__card">
              <div className="slider__card-img-wrap">
                <img src={project.image} alt={project.title} className="slider__card-img" />
              </div>
              <div className="slider__card-body">
                <h3 className="slider__card-title">{project.title}</h3>
                <p className="slider__card-desc">{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSlider