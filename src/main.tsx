import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="never" fuerza las animaciones aunque el sistema
        operativo tenga el "movimiento reducido" activado. */}
    <MotionConfig reducedMotion="never">
      <App />
    </MotionConfig>
  </StrictMode>,
)
