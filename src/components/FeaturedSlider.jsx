import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import projects from '../data/projectsData.js'
import '../styles/featuredSlider.css'

function FeaturedSlider() {
  const trackRef = useRef(null)
  const location = useLocation()

  const [isDragging, setIsDragging] = useState(false)
  
  // Animasyon ve sürükleme referansları (State yerine Ref kullanıyoruz ki gecikme olmasın)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const requestRef = useRef(null)
  const isPaused = useRef(false)
  const resumeTimeoutRef = useRef(null)

  // Yağ gibi akan otomatik kaydırma fonksiyonu
  const animate = () => {
    if (!isPaused.current && trackRef.current) {
      trackRef.current.scrollLeft += 1; // Kayma hızı (1 yaparsan yavaş, 2 yaparsan hızlı akar)
      
      // En sona geldiğinde çaktırmadan başa sarması için:
      if (trackRef.current.scrollLeft >= trackRef.current.scrollWidth - trackRef.current.clientWidth - 1) {
        trackRef.current.scrollLeft = 0;
      }
    }
    requestRef.current = requestAnimationFrame(animate)
  }

  // Sayfa yüklendiğinde animasyonu başlat
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current) // Sayfadan çıkınca hafızayı temizle
  }, [])

  // ── SÜRÜKLEME KONTROLLERİ ──
  const handlePointerDown = (e) => {
    isPaused.current = true; // Tuttuğu an kaymayı durdur
    setIsDragging(true);
    clearTimeout(resumeTimeoutRef.current); // Varsa eski 1 saniyelik sayacı iptal et

    startX.current = e.pageX || (e.touches ? e.touches[0].pageX : 0);
    scrollLeft.current = trackRef.current.scrollLeft;
  }

  const handlePointerUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Bıraktıktan tam 1 saniye sonra (1000ms) otomatik kaymayı tekrar başlat
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPaused.current = false;
    }, 1000);
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX || (e.touches ? e.touches[0].pageX : 0);
    if (!x) return;

    const walk = (x - startX.current) * 1.5; // Sürükleme hassasiyeti
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }

  // Öne çıkanları al
  const featured = projects.filter(p => p.featured === true || p.featured === "true")
  const displayList = featured.length > 0 ? featured : projects

  // Kesintisiz (sonsuz) döngü hissiyatı için listeyi ikiye katlıyoruz
  const infiniteList = [...displayList, ...displayList, ...displayList]

  return (
    <section id="projeler" className="slider">
      <h2 className="slider__heading">Featured Projects</h2>
      <div className="slider__window">
        <div 
          className={`slider__track ${isDragging ? 'dragging' : ''}`} 
          ref={trackRef} 
          
          // Fare ve Dokunmatik olayları
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUpOrLeave}
          onMouseLeave={handlePointerUpOrLeave}
          onMouseMove={handlePointerMove}
          
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUpOrLeave}
          onTouchCancel={handlePointerUpOrLeave}
          onTouchMove={handlePointerMove}
        >
          {infiniteList.map((project, index) => {
            const displayImage = project.images?.[0] || project.image || '';

            return (
              <Link 
                key={`${project.id}-${index}`} 
                to={`/projects/${project.id}`} 
                state={{ background: location }}
                className="slider__card"
                onClick={(e) => isDragging && e.preventDefault()} // Sürüklerken yanlışlıkla tıklanmayı engelle
              >
                <div className="slider__card-img-wrap">
                  {displayImage ? (
                    <img 
                      src={displayImage} 
                      alt={project.title} 
                      className="slider__card-img" 
                      draggable="false" 
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