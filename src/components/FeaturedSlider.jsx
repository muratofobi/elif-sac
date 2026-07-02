import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
// ── Firebase bağlantılarını içeri alıyoruz ──
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

import '../styles/featuredSlider.css'

function FeaturedSlider() {
  const trackRef = useRef(null)
  const location = useLocation()

  const [isDragging, setIsDragging] = useState(false)
  const [featuredProjects, setFeaturedProjects] = useState([]) // Rastgele seçilen projeler
  const [loading, setLoading] = useState(true)

  // Animasyon ve sürükleme referansları
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const requestRef = useRef(null)
  const isPaused = useRef(false)
  const resumeTimeoutRef = useRef(null)

  // ── 1. FİREBASE'DEN VERİ ÇEKME VE RASTGELE 5 ESER SEÇME ──
  useEffect(() => {
    const fetchAndRandomizeProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'))
        const allProjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        // Eğer veritabanı boşsa işlem yapma
        if (allProjects.length === 0) {
          setLoading(false)
          return
        }

        // TÜM DİZİYİ Fisher-Yates algoritması ile rastgele karıştır
        let shuffled = [...allProjects]
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Karıştırılmış tam listeden ilk 8 tanesini al
        const selectedProjects = shuffled.slice(0, 8)
        setFeaturedProjects(selectedProjects)

      } catch (error) {
        console.error("Öne çıkan projeler çekilirken hata:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAndRandomizeProjects()
  }, [])

  // ── 2. KAYDIRMA ANİMASYONU ──
  const animate = () => {
    if (!isPaused.current && trackRef.current) {
      trackRef.current.scrollLeft += 1; 
      
      if (trackRef.current.scrollLeft >= trackRef.current.scrollWidth - trackRef.current.clientWidth - 1) {
        trackRef.current.scrollLeft = 0;
      }
    }
    requestRef.current = requestAnimationFrame(animate)
  }

  // Animasyonu sadece veriler yüklendikten sonra başlat
  useEffect(() => {
    if (!loading && featuredProjects.length > 0) {
      requestRef.current = requestAnimationFrame(animate)
    }
    return () => cancelAnimationFrame(requestRef.current) 
  }, [loading, featuredProjects])

  // ── 3. SÜRÜKLEME KONTROLLERİ ──
  const handlePointerDown = (e) => {
    isPaused.current = true;
    setIsDragging(true);
    clearTimeout(resumeTimeoutRef.current);

    startX.current = e.pageX || (e.touches ? e.touches[0].pageX : 0);
    scrollLeft.current = trackRef.current.scrollLeft;
  }

  const handlePointerUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);

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

    const walk = (x - startX.current) * 1.5; 
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }

  // Kesintisiz döngü hissiyatı için listeyi üç defa arka arkaya ekliyoruz
  const infiniteList = [...featuredProjects, ...featuredProjects, ...featuredProjects]

  // Eğer veri yükleniyorsa veya hiç proje yoksa boş bir alan döndür (sayfa düzeni bozulmasın)
  if (loading || featuredProjects.length === 0) return <section className="slider" style={{minHeight: '400px'}}></section>;

  return (
    <section id="projeler" className="slider">
      <h2 className="slider__heading">Featured Projects</h2>
      <div className="slider__window">
        <div 
          className={`slider__track ${isDragging ? 'dragging' : ''}`} 
          ref={trackRef} 
          
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
            // Galeri dizisinin ilk elemanını slider kapak görseli olarak çekiyoruz
            const displayImage = project.imageUrls?.[0] || project.imageUrl || '';

            return (
              <Link 
                key={`${project.id}-${index}`} 
                to={`/projects/${project.id}`} 
                state={{ background: location }}
                className="slider__card"
                onClick={(e) => isDragging && e.preventDefault()} 
              >
                <div className="slider__card-img-wrap">
                  {displayImage ? (
                    <img 
                      src={displayImage} 
                      alt={project.title} 
                      className="slider__card-img" 
                      draggable="false" 
                      loading="lazy"
                    />
                  ) : (
                    <div style={{width: '100%', height: '100%', background: '#1a1a1a'}} />
                  )}
                </div>
                <div className="slider__card-body">
                  <h3 className="slider__card-title">{project.title}</h3>
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

export default FeaturedSlider;