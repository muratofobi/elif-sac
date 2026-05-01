import { useState } from 'react'
import '../styles/admin.css'

const ADMIN_PASSWORD = 'mensrea7875'

function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [featured, setFeatured] = useState(true)
  const [selectedImages, setSelectedImages] = useState([])
  
  const [editingId, setEditingId] = useState(null)

  const [projects, setProjects] = useState([
    { id: "proje-1", title: '30.01.2021', date: '30.01.2021', description: 'Sample desc', images: [] },
    { id: "proje-2", title: 'Middle Earth', date: '15.05.2022', description: 'Legendary', images: [] }
  ])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  }

  function handleLogin(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true)
      setError('')
    } else {
      setError('Incorrect password.')
    }
  }

  function handlePublish(e) {
    e.preventDefault()
    const form = e.target
    const title = form.title.value.trim()
    const date = form.date.value.trim()
    const description = form.description.value.trim()

    if (!title || selectedImages.length === 0) return

    if (editingId) {
      setProjects(prev => prev.map(p => 
        p.id === editingId 
        ? { ...p, title, date, description, images: selectedImages, featured } 
        : p
      ))
      setEditingId(null)
    } else {
      const newProj = { 
        id: `proje-${Date.now()}`, 
        title, date, description, 
        images: selectedImages, 
        featured 
      }
      setProjects(prev => [...prev, newProj])
    }
    
    form.reset()
    setSelectedImages([])
    setFeatured(true)
  }

  function handleEdit(project) {
    setEditingId(project.id)
    setSelectedImages(project.images || [])
    setFeatured(project.featured)
    
    const form = document.querySelector('.admin__project-form')
    form.title.value = project.title
    form.date.value = project.date || ''
    form.description.value = project.description || ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleDelete(id) {
    if(window.confirm("Bu projeyi silmek istediğine emin misin?")) {
        setProjects(prev => prev.filter(p => p.id !== id))
    }
  }

  if (!loggedIn) {
    return (
      <div className="admin">
        <form className="admin__login" onSubmit={handleLogin}>
          <h1 className="admin__login-title">Enter Password</h1>
          <input className="admin__login-input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="admin__login-btn" type="submit">Enter →</button>
        </form>
      </div>
    )
  }

  return (
    <div className="admin">
      <div className="admin__bar">
        <span className="admin__logo">Mensrea Admin</span>
        <button className="admin__logout" onClick={() => setLoggedIn(false)}>log out</button>
      </div>

      <div className="admin__body">
        
        <div className="admin__card">
          <p className="admin__card-title">
            {editingId ? "Edit Project" : "Add New Project"}
          </p>
          <form className="admin__project-form" onSubmit={handlePublish}>
            <div className="admin__field">
              <label className="admin__label">Title</label>
              <input className="admin__input" name="title" required />
            </div>

            <div className="admin__field">
              <label className="admin__label">Date</label>
              <input className="admin__input" name="date" placeholder="DD.MM.YYYY" />
            </div>

            <div className="admin__field">
              <label className="admin__label">Media</label>
              <div className="admin__upload-zone">
                <input type="file" multiple accept="image/*" onChange={handleImageChange} id="file-upload" className="admin__file-hidden" />
                <label htmlFor="file-upload" className="admin__upload-label">Upload Images</label>
              </div>
              <div className="admin__preview-grid">
                {selectedImages.map((img, idx) => (
                  <div key={idx} className="admin__preview-item">
                    <img src={img} alt="preview" />
                    <button type="button" onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== idx))}>×</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin__field">
              <label className="admin__label">Description</label>
              <textarea className="admin__textarea" name="description" />
            </div>

            <button className="admin__publish" type="submit">
              {editingId ? "Update Project ✓" : "Publish Project →"}
            </button>
            
            {editingId && (
              <button 
                type="button" 
                className="admin__publish admin__publish--cancel" 
                onClick={() => {
                  setEditingId(null); 
                  setSelectedImages([]); 
                  document.querySelector('.admin__project-form').reset();
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="admin__card">
          <p className="admin__card-title">Existing Projects</p>
          <div className="admin__list">
            {projects.map(p => (
              <div key={p.id} className="admin__list-item">
                <span className="admin__list-item-title">{p.title}</span>
                <div className="admin__list-actions">
                  <button className="admin__list-btn edit" onClick={() => handleEdit(p)}>edit</button>
                  <button className="admin__list-btn delete" onClick={() => handleDelete(p.id)}>delete</button>
                </div>
              </div>
            ))}
            {projects.length === 0 && <p className="admin__empty">No projects yet.</p>}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Admin