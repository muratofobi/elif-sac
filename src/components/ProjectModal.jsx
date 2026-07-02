import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

import '../styles/ProjectModal.css';

function ProjectModal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // ── GALERİ SLIDER HAFIZASI ──
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProject(null);
        }
      } catch (error) {
        console.error("Proje detayı çekilirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate(-1);
      // Klavye oklarıyla da resimler arası geçiş yapabilme özelliği
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      navigate(-1);
    }
  };

  if (loading) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-content" style={{ padding: '5rem', textAlign: 'center', color: 'white' }}>
          <h2>Eser Yükleniyor...</h2>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-content" style={{ padding: '5rem', textAlign: 'center', color: 'white' }}>
          <h2>Proje Bulunamadı!</h2>
          <button onClick={() => navigate(-1)} className="btn-modern" style={{ marginTop: '2rem' }}>Geri Dön</button>
        </div>
      </div>
    );
  }

  const imagesToDisplay = project.imageUrls && project.imageUrls.length > 0 
    ? project.imageUrls 
    : (project.imageUrl ? [project.imageUrl] : []);

  // ── SLIDER KONTROL FONKSİYONLARI ──
  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev === imagesToDisplay.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? imagesToDisplay.length - 1 : prev - 1));
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        
        <button onClick={() => navigate(-1)} className="modal-close-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-layout">
          
          {/* ── GÖRSEL ALANI (Instagram Tarzı Slider) ── */}
          <div className="modal-media-slider">
            
            {imagesToDisplay.length > 0 && (
              <img 
                src={imagesToDisplay[currentImgIndex]} 
                alt={`${project.title} - Görsel ${currentImgIndex + 1}`} 
                className="modal-slider-img"
              />
            )}

            {/* Birden fazla görsel varsa Okları ve Noktaları göster */}
            {imagesToDisplay.length > 1 && (
              <>
                <button className="slider-arrow left" onClick={prevImage}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button className="slider-arrow right" onClick={nextImage}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>

                <div className="slider-dots">
                  {imagesToDisplay.map((_, index) => (
                    <span 
                      key={index} 
                      className={`slider-dot ${index === currentImgIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImgIndex(index)}
                    ></span>
                  ))}
                </div>
              </>
            )}

          </div>
          
          {/* Bilgi Alanı */}
          <div className="modal-info">
            <h1 className="modal-title">{project.title}</h1>
            <p className="modal-description" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
              {project.description}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProjectModal;