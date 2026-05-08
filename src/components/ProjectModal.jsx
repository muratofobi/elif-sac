import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projects from '../data/projectsData.js';
import '../styles/ProjectModal.css';

function ProjectModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  // parseInt yerine String() kullanarak "1" === 1 gibi veri tipi çatışmalarını engelliyoruz
  const project = projects.find((p) => String(p.id) === String(id));

  // Eğer proje bulunamazsa bomboş sayfa (null) yerine en azından bir hata versin ki anlayalım
  if (!project) return (
    <div className="modal-backdrop" onClick={() => navigate(-1)}>
      <div className="modal-content" style={{ padding: '5rem', textAlign: 'center', color: 'white' }}>
        <h2>Proje Bulunamadı!</h2>
        <button onClick={() => navigate(-1)} className="btn-modern">Geri Dön</button>
      </div>
    </div>
  );

  // ESC tuşuna basınca modalı kapatma özelliği
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (!project) return null;

  // Arka plandaki bulanık alana tıklayınca kapatma
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      navigate(-1);
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        
        {/* Kapatma Butonu (X) */}
        <button onClick={() => navigate(-1)} className="modal-close-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-layout">
          {/* Görsel Alanı */}
          <div className="modal-media">
            <img src={project.image} alt={project.title} className="modal-img" loading="lazy" />
          </div>
          
          {/* Bilgi Alanı */}
          <div className="modal-info">
            <h1 className="modal-title">{project.title}</h1>
            <span className="modal-date">{project.date || '2024'}</span>
            <p className="modal-description">{project.description}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProjectModal;