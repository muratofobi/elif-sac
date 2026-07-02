import { useState, useEffect, useRef } from 'react';
import { db, storage } from '../firebase'; 
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';

import '../styles/admin.css'; 

function Admin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [gallery, setGallery] = useState([]); 
  const [deletedUrls, setDeletedUrls] = useState([]); 
  
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // ── ÖZEL SİLME PENCERESİ İÇİN STATE ──
  const [projectToDelete, setProjectToDelete] = useState(null);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
    } catch (error) {
      console.error("Projeler çekilirken hata:", error);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9), 
      url: URL.createObjectURL(file), 
      file: file,
      isExisting: false
    }));

    setGallery(prev => [...prev, ...newImages]);
    e.target.value = ''; 
  };

  const removeImage = (idToRemove, urlToRemove, isExisting) => {
    setGallery(gallery.filter(item => item.id !== idToRemove));
    if (isExisting) {
      setDeletedUrls(prev => [...prev, urlToRemove]);
    }
  };

  const handleSort = () => {
    let _gallery = [...gallery];
    const draggedItemContent = _gallery.splice(dragItem.current, 1)[0];
    _gallery.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setGallery(_gallery);
  };

  // ── GERÇEK SİLME İŞLEMİ (Özel pencereden EVET denirse çalışır) ──
  const confirmDelete = async () => {
    if (!projectToDelete) return;
    
    try {
      await deleteDoc(doc(db, 'projects', projectToDelete.id));
      
      const urlsToDelete = projectToDelete.imageUrls || (projectToDelete.imageUrl ? [projectToDelete.imageUrl] : []);
      for (const url of urlsToDelete) {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef).catch(err => console.log("Görsel silinirken uyarı:", err));
      }

      fetchProjects();
    } catch (error) {
      console.error("Silme hatası:", error);
    } finally {
      setProjectToDelete(null); // Pencereyi kapat
    }
  };

  const handleEditClick = (project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    
    const existingUrls = project.imageUrls || (project.imageUrl ? [project.imageUrl] : []);
    const initialGallery = existingUrls.map(url => ({
      id: Math.random().toString(36).substr(2, 9),
      url: url,
      file: null,
      isExisting: true
    }));
    
    setGallery(initialGallery);
    setDeletedUrls([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setGallery([]);
    setDeletedUrls([]);
    if (document.getElementById('image-upload')) {
      document.getElementById('image-upload').value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (gallery.length === 0) {
      alert("Lütfen en az bir görsel ekleyin!");
      return;
    }
    
    setIsUploading(true); 

    try {
      const finalUrls = [];
      for (let item of gallery) {
        if (item.isExisting) {
          finalUrls.push(item.url); 
        } else {
          const uniqueFileName = `${Date.now()}_${item.file.name}`;
          const storageRef = ref(storage, `drawings/${uniqueFileName}`);
          await uploadBytes(storageRef, item.file);
          const downloadURL = await getDownloadURL(storageRef);
          finalUrls.push(downloadURL);
        }
      }

      for (let url of deletedUrls) {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef).catch(e => console.log(e));
      }

      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), {
          title: title,
          description: description,
          imageUrls: finalUrls 
        });
      } else {
        await addDoc(collection(db, 'projects'), {
          title: title,
          description: description,
          imageUrls: finalUrls, 
          createdAt: serverTimestamp() 
        });
      }

      resetForm(); 
      fetchProjects(); 
    } catch (error) {
      console.error("İşlem sırasında hata:", error);
    } finally {
      setIsUploading(false); 
    }
  };

  return (
    <div className="admin">
      
      {/* ── ÖZEL ONAY PENCERESİ (MODAL) ── */}
      {projectToDelete && (
        <div className="admin__modal-overlay">
          <div className="admin__modal">
            <h3>EMİN MİSİNİZ?</h3>
            <p>"{projectToDelete.title}" adlı eseri arşivden tamamen silmek üzeresiniz. Bu işlem geri alınamaz.</p>
            <div className="admin__modal-actions">
              <button onClick={() => setProjectToDelete(null)} className="admin__modal-btn cancel">İPTAL ET</button>
              <button onClick={confirmDelete} className="admin__modal-btn confirm">SİL</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin__header">
        <h1>MENSREA'NIN MUTFAĞI</h1>
      </div>

      <div className="admin__body">
        <div className="admin__card">
          <h2 className="admin__card-title" style={{ color: editingId ? 'var(--color-red)' : 'inherit' }}>
            {editingId ? 'ESERİ GÜNCELLE' : 'YENİ ESER YÜKLE'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="admin__field">
              <label className="admin__label">Çizim Başlığı</label>
              <input type="text" className="admin__input" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="admin__field">
              <label className="admin__label">Açıklama / Teknik</label>
              <textarea className="admin__textarea" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div className="admin__field">
              <label className="admin__label">Galeri Görselleri (Sürükleyip Sıralayabilirsiniz)</label>
              
              <div className="admin__gallery-grid">
                {gallery.map((item, index) => (
                  <div key={item.id} className="admin__gallery-item" draggable onDragStart={() => (dragItem.current = index)} onDragEnter={() => (dragOverItem.current = index)} onDragEnd={handleSort} onDragOver={(e) => e.preventDefault()}>
                    <img src={item.url} alt={`Gallery ${index}`} />
                    <button type="button" className="admin__gallery-remove" onClick={() => removeImage(item.id, item.url, item.isExisting)}>✕</button>
                    <div className="admin__gallery-number">{index + 1}</div>
                  </div>
                ))}
              </div>

              <input id="image-upload" type="file" multiple className="admin__input" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} style={{ marginTop: gallery.length > 0 ? '1rem' : '0' }} />
            </div>

            <button type="submit" className="btn-modern" disabled={isUploading} style={{ width: '100%', marginTop: '1rem' }}>
              <span>{isUploading ? 'YÜKLENİYOR...' : (editingId ? 'DEĞİŞİKLİKLERİ KAYDET' : 'ESERİ YAYINLA')}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            {editingId && (
              <button type="button" onClick={resetForm} className="admin__cancel-btn" disabled={isUploading}>İPTAL ET</button>
            )}
          </form>
        </div>

        <div className="admin__card">
          <h2 className="admin__card-title">ARŞİVDEKİ ESERLER</h2>
          <div className="admin__list">
            {loadingProjects ? (
              <p className="admin__empty">Eserler yükleniyor...</p>
            ) : projects.length === 0 ? (
              <p className="admin__empty">Henüz hiç eser yüklenmemiş.</p>
            ) : (
              projects.map(project => (
                <div key={project.id} className="admin__list-item">
                  <span className="admin__list-item-title">{project.title}</span>
                  
                  <div className="admin__list-actions">
                    <button className="admin__action-btn edit" onClick={() => handleEditClick(project)}>DÜZENLE</button>
                    {/* Artık window.confirm yerine kendi popup'ımızı tetikliyoruz */}
                    <button className="admin__action-btn delete" onClick={() => setProjectToDelete(project)}>SİL</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Admin;