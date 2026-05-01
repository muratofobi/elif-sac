import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import projects from '../data/projectsData';
import '../styles/ProjectModal.css';

function ProjectModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!project) return null;
  const images = project.images || [project.image];

  return (
    <div className="modal-overlay" onClick={() => navigate(-1)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-image-side">
          {images.length > 1 && (
            <>
              <button className="nav-btn prev" onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1) }}>‹</button>
              <button className="nav-btn next" onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1) }}>›</button>
            </>
          )}
          <img src={images[currentIndex]} alt="project" className="dev-img" />
          <div className="gallery-counter">{currentIndex + 1} / {images.length}</div>
        </div>
        
        <div className="modal-info-side">
          <button className="close-btn" onClick={() => navigate(-1)}>×</button>
          <h2>{project.title}</h2>
          <span className="project-date">{project.date}</span>
          <div className="info-description">
            <p>{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;