import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { MoodActivity } from './activities/mood/MoodActivity'
import { characterImage } from './activities/mood/characters'
import './styles.css'

type Page = 'choose' | 'kids' | 'teens'
const currentPage = (): Page => location.hash === '#teens' ? 'teens' : location.hash === '#kids' ? 'kids' : 'choose'
function App() {
  const [page, setPage] = useState<Page>(currentPage)
  useEffect(() => {
    const navigate = () => { setPage(currentPage()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])
  useEffect(() => {
    document.documentElement.dataset.theme = page === 'teens' ? 'teens' : 'cozy'
    document.title = page === 'teens' ? 'Какой у тебя сегодня режим?' : page === 'kids' ? 'Кто ты сегодня?' : 'Минутка настроения · Выбор версии'
    document.querySelector<HTMLHeadingElement>('main h1')?.focus({ preventScroll: true })
  }, [page])
  return <div className={`app-shell ${page === 'teens' ? 'teen-theme' : ''}`}>
    <header className="topbar"><a className="brand" href="#" aria-label="Минутка настроения — выбор версии"><span className="brand-icon" aria-hidden="true">{page === 'teens' ? '↗' : '☺'}</span><span>минутка<span className="brand-secondary"> настроения</span></span></a>{page === 'choose' ? <span className="lesson-note">Для начала занятия</span> : <a className="version-link" href="#">Сменить версию <span aria-hidden="true">↗</span></a>}</header>
    <main>{page === 'choose' ? <section className="version-picker">
      <span className="eyebrow">ОДНА МИНУТА. ДВА НАСТРОЕНИЯ.</span>
      <h1 tabIndex={-1}>С чего начнём?</h1>
      <p className="picker-subtitle">Выберите оформление для вашего занятия.</p>
      <div className="version-grid">
        <a href="#kids" className="version-option cozy-option"><div className="version-preview"><img src={characterImage('sloth', true)} alt="Ленивец в уютном пледе" width="480" height="480"/><img src={characterImage('duck', true)} alt="Утка на позитиве" width="480" height="480"/></div><div className="version-info"><span className="version-age">8–11 лет · уютная версия</span><h2>Кто ты сегодня?</h2><p>Мягкие цвета, милые персонажи и немного улыбок.</p><span className="version-cta">Открыть опрос <span aria-hidden="true">↗</span></span></div></a>
        <a href="#teens" className="version-option urban-option"><div className="version-preview"><img src={characterImage('sloth', true, true)} alt="Ленивец в худи и наушниках" width="480" height="480"/><img src={characterImage('raccoon', true, true)} alt="Енот в стиле граффити" width="480" height="480"/></div><div className="version-info"><span className="version-age">12–16 лет · версия для подростков</span><h2>Какой у тебя режим?</h2><p>Граффити, ирония и семь узнаваемых состояний.</p><span className="version-cta">Открыть опрос <span aria-hidden="true">↗</span></span></div></a>
      </div>
      <p className="picker-tip">У каждой версии своя ссылка. Откройте нужную и скопируйте адрес для учеников.</p>
    </section> : <MoodActivity key={page} teen={page === 'teens'} />}</main>
    <footer><span>{page === 'teens' ? 'Любой режим — окей.' : 'Любое настроение — это нормально ♡'}</span><span className="footer-note">{page === 'teens' ? 'Без оценок. Без правильных ответов.' : 'Просто будь собой.'}</span></footer>
  </div>
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
