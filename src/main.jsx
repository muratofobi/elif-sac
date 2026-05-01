import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Bu satırın olduğundan emin ol
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* App bileşeni mutlaka bunun İÇİNDE olmalı */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)