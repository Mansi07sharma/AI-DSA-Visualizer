import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FlowchartProvider } from './Sections/Visual.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FlowchartProvider>
      <App />
    </FlowchartProvider>
  </StrictMode>,
)
