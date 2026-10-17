import React from 'react'
import { createRoot } from 'react-dom/client'
import { MoodActivity } from './activities/mood/MoodActivity'
import './styles.css'

function App() {
  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="./" aria-label="Минутка настроения — на главную"><span className="brand-icon" aria-hidden="true">☺</span><span>минутка<span className="brand-secondary"> настроения</span></span></a><span className="lesson-note"><span aria-hidden="true">✦</span> Хорошее начало занятия</span></header>
    <main><MoodActivity /></main>
    <footer><span>Любое настроение — это нормально <span aria-hidden="true">♡</span></span><span className="footer-note">Просто будь собой.</span></footer>
  </div>
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
