import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {provider} from  'react-redux'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <provider store={store}>
        <App />
  </provider>
 
  
)
