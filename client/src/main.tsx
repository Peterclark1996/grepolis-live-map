import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { BrowserRouter } from 'react-router-dom'
import { SelectionProvider } from './hooks/useSelection'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter >
      <SelectionProvider>
        <App />
      </SelectionProvider>
    </BrowserRouter >
  </React.StrictMode>
)