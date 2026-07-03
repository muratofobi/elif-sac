import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; 

import '../styles/projects.css';
import ScrollReveal from '../components/ScrollReveal';

function Projects() {
  const location = useLocation();
  
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  // ── Sıralama Hafızası: 'desc' (Yeniden Eskiye) veya 'asc' (Eskiden Yeniye) ──
  const [sortOrder, setSortOrder] = useState('desc'); 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const projectsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setProjects(projectsArray);
      } catch (error) {
        console.error("Projeler çekilirken hata oluştu: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ── Sıralama Fonksiyonu ──
  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
  };

  // ── Gösterilecek Projeleri Sıraya Göre Ayarla ──
  // Firebase'den zaten 'desc' olarak çekiyoruz. 
  // Eğer kullanıcı 'asc' isterse, diziyi ters çevirip (reverse) gösteriyoruz.
  const displayedProjects = sortOrder === 'desc' ? projects : [...projects].reverse();

  return (
    <div className="projects">
      
      {/* ── Üst Bar: Geri Dön Butonu ve Sıralama Butonu Yan Yana ── */}
      <div className="projects__header-bar" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem' 
      }}>
        
        <Link to="/" className="projects__back btn-modern btn-back" style={{ margin: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Home</span>
        </Link>

        {/* ── Sıralama Butonu ── */}
        <button onClick={toggleSortOrder} className="btn-modern btn-sort" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Sort: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ transform: sortOrder === 'asc' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </button>
        
      </div>

      <h1 className="projects__heading">All Drawings</h1>
      
      <p className="projects__subheading">
        {loading ? "Yükleniyor..." : `${projects.length} works – click to view details`}
      </p>

      {/* ── Projeler Grid ── */}
      <div className="projects__grid">
        {loading ? (
          <p style={{ color: 'var(--text-end)', textAlign: 'center', width: '100%', fontSize: '1.5rem' }}>Eserler yükleniyor...</p>
        ) : (
          displayedProjects.map(project => (
            
            <ScrollReveal key={project.id}>
              <Link 
                to={`/projects/${project.id}`} 
                state={{ background: location }} 
                className="projects__cell"
              >
                <img 
                  src={project.imageUrls?.[0] || project.imageUrl || ''} 
                  alt={project.title} 
                  className="projects__cell-img" 
                  loading="lazy" 
                />
                
                <div className="projects__cell-overlay">
                  <span className="projects__cell-title">{project.title}</span>
                  <span className="projects__cell-desc">{project.description}</span>
                  <span className="projects__cell-link">View Details →</span>
                </div>
              </Link>
            </ScrollReveal>

          ))
        )}
      </div>
    </div>
  )
}

export default Projects;