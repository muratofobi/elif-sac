import { useState } from 'react'
import '../styles/admin.css'

// Temporary password — will be replaced by Firebase Auth later
const ADMIN_PASSWORD = 'mensrea2024'

function Admin() {
  const [loggedIn,  setLoggedIn]  = useState(false)
  const [password,  setPassword]  = useState('')
  const [error,     setError]     = useState('')
  const [featured,  setFeatured]  = useState(true)
  const [projects,  setProjects]  = useState([
    { id: 1, title: '30.01.2021' },
    { id: 2, title: 'Middle Earth' },
    { id: 3, title: '24.10.2022' },
  ])

  // ── Login ─────────────────────────────────────────────
  function handleLogin(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true)
      setError('')
    } else {
      setError('Incorrect password.')
    }
  }

  // ── Add project (placeholder — Firebase comes later) ──
  function handlePublish(e) {
    e.preventDefault()
    const form  = e.target
    const title = form.title.value.trim()
    if (!title) return
    setProjects(prev => [...prev, { id: Date.now(), title }])
    form.reset()
    setFeatured(true)
    alert('Project added! Firebase integration coming in the next step.')
  }

  // ── Delete project ────────────────────────────────────
  function handleDelete(id) {
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  // ── Login screen ──────────────────────────────────────
  if (!loggedIn) {
    return (
      <div className="admin">
        <div className="admin__bar">
          <span className="admin__logo">Mensrea</span>
          <span className="admin__badge">Admin</span>
        </div>
        <form className="admin__login" onSubmit={handleLogin}>
          <h1 className="admin__login-title">Enter Password</h1>
          <input
            className="admin__login-input"
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <p className="admin__login-error">{error}</p>}
          <button className="admin__login-btn" type="submit">Enter →</button>
        </form>
      </div>
    )
  }

  // ── Admin dashboard ───────────────────────────────────
  return (
    <div className="admin">
      <div className="admin__bar">
        <span className="admin__logo">Mensrea</span>
        <span className="admin__badge">Admin</span>
        <button className="admin__logout" onClick={() => setLoggedIn(false)}>log out</button>
      </div>

      <div className="admin__body">

        {/* Add new project */}
        <div className="admin__card">
          <p className="admin__card-title">Add New Project</p>
          <form onSubmit={handlePublish}>
            <div className="admin__field">
              <label className="admin__label">Title</label>
              <input className="admin__input" name="title" placeholder="e.g. Middle Earth" />
            </div>
            <div className="admin__field">
              <label className="admin__label">Date</label>
              <input className="admin__input" name="date" placeholder="DD.MM.YYYY" />
            </div>
            <div className="admin__field">
              <label className="admin__label">Description</label>
              <textarea className="admin__textarea" name="description" placeholder="quote or description..." />
            </div>
            <div className="admin__field">
              <label className="admin__label">Instagram Link</label>
              <input className="admin__input" name="instagramUrl" placeholder="https://instagram.com/p/..." />
            </div>
            <div className="admin__toggle-row">
              <label className="admin__label">Feature on Homepage?</label>
              <button
                type="button"
                className={`admin__toggle ${featured ? 'on' : ''}`}
                onClick={() => setFeatured(f => !f)}
              >
                <div className="admin__toggle-thumb" />
              </button>
            </div>
            <button className="admin__publish" type="submit">Publish →</button>
          </form>
        </div>

        {/* Existing projects list */}
        <div className="admin__card">
          <p className="admin__card-title">Existing Projects</p>
          {projects.length === 0
            ? <p className="admin__empty">No projects yet.</p>
            : (
              <div className="admin__list">
                {projects.map(p => (
                  <div key={p.id} className="admin__list-item">
                    <span className="admin__list-item-title">{p.title}</span>
                    <div className="admin__list-actions">
                      <button className="admin__list-btn edit">edit</button>
                      <button className="admin__list-btn delete" onClick={() => handleDelete(p.id)}>delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default Admin