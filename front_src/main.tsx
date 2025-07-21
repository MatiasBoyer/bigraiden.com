import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import HomeRoute from './routes/HomeRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomeRoute />
  </StrictMode>,
)
