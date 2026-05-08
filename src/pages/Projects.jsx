import { Link, useLocation } from 'react-router-dom'
import projects from '../data/projectsData.js' // Dosya adının doğru olduğundan emin ol
import '../styles/projects.css'

function Projects() {
  const location = useLocation();

  return (
    <div className="projects">
      <Link to="/" className="projects__back btn-modern btn-back">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Home</span>
        </Link>

      <h1 className="projects__heading">All Drawings</h1>
      <p className="projects__subheading">{projects.length} works – click to view details</p>

      <div className="projects__grid">
        {projects.map(project => (
          /* 'a' etiketi yerine 'Link' kullanıyoruz ve state gönderiyoruz */
          <Link 
            key={project.id} 
            to={`/projects/${project.id}`} 
            state={{ background: location }} 
            className="projects__cell"
          >
            <img src={project.image} alt={project.title} className="projects__cell-img" />
            <div className="projects__cell-overlay">
              <span className="projects__cell-title">{project.title}</span>
              <span className="projects__cell-desc">{project.description}</span>
              <span className="projects__cell-link">View Details →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Projects