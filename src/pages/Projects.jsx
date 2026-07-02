import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// ── Firebase bağlantılarını içeri alıyoruz ──
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; 

import '../styles/projects.css';
import ScrollReveal from '../components/ScrollReveal';

function Projects() {
  const location = useLocation();
  
  // ── Dinamik Veri Hafızası (State) ──
  const [projects, setProjects] = useState([]); // Firebase'den gelen projeler burada duracak
  const [loading, setLoading] = useState(true); // Yükleniyor animasyonu için

  // ── Sayfa açıldığı an Firebase'e bağlanıp verileri çeken fonksiyon ──
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // 'projects' koleksiyonunu, 'createdAt' tarihine göre en yeniden en eskiye sırala
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        // Gelen karmaşık veriyi bizim kullanabileceğimiz bir diziye çevir
        const projectsArray = querySnapshot.docs.map(doc => ({
          id: doc.id, // Firebase'in verdiği eşsiz ID
          ...doc.data()
        }));
        
        setProjects(projectsArray);
      } catch (error) {
        console.error("Projeler çekilirken hata oluştu: ", error);
      } finally {
        setLoading(false); // Yükleme bitti
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects">
      {/* ── Geri Dön Butonu ── */}
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
      
      {/* Kaç eser olduğunu dinamik gösteriyoruz */}
      <p className="projects__subheading">
        {loading ? "Yükleniyor..." : `${projects.length} works – click to view details`}
      </p>

      {/* ── Projeler Grid ── */}
      <div className="projects__grid">
        {loading ? (
          // Veriler gelirken şık bir yükleniyor yazısı gösterelim
          <p style={{ color: 'var(--text-end)', textAlign: 'center', width: '100%', fontSize: '1.5rem' }}>Eserler yükleniyor...</p>
        ) : (
          projects.map(project => (
            
            <ScrollReveal key={project.id}>
              
              <Link 
                to={`/projects/${project.id}`} 
                state={{ background: location }} 
                className="projects__cell"
              >
                {/* Çoklu resim dizisindeki ilk görseli kapak resmi yapıyoruz */}
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