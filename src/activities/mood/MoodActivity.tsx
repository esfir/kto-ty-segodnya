import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { characters, characterImage } from './characters'
import type { Character } from './characters'

export function MoodActivity() {
  const [selected, setSelected] = useState<Character | null>(null)
  const [picking, setPicking] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resultHeading = useRef<HTMLHeadingElement>(null)
  const lastChoice = useRef<HTMLButtonElement | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  useEffect(() => { if (selected) resultHeading.current?.focus() }, [selected])
  function choose(character: Character, button: HTMLButtonElement) {
    if (picking) return
    lastChoice.current = button
    setPicking(character.id)
    timer.current = setTimeout(() => { setSelected(character); setPicking(null) }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 240)
  }
  function reset() {
    const id = selected?.id
    setSelected(null)
    requestAnimationFrame(() => document.getElementById(`character-${id}`)?.focus({ preventScroll: true }))
  }
  return selected ? <section className="result-view" aria-label="Твоё настроение">
    <button className="back-link" onClick={reset}><span aria-hidden="true">←</span> К персонажам</button>
    <div className="result-layout">
      <div className="result-art" style={{ '--card-color': selected.color } as CSSProperties}>
        <span className="result-sticker" aria-hidden="true">Это я!</span>
        <img src={characterImage(selected.id)} alt={`${selected.name}. ${selected.phraseInImage ? selected.phrase : ''}`} width="1254" height="1254" />
        <span className="spark spark-one" aria-hidden="true">✦</span><span className="spark spark-two" aria-hidden="true">✧</span>
      </div>
      <div className="result-copy">
        <span className="eyebrow"><span className="status-dot" /> Настроение выбрано</span>
        <h1 ref={resultHeading} tabIndex={-1} className="result-title"><span>Сегодня твой режим —</span>{selected.name}!</h1>
        {!selected.phraseInImage && <p className="result-quote">«{selected.phrase}»</p>}
        <div className="conversation"><span aria-hidden="true">✳</span><p>Расскажешь, почему?<small>Если хочется — поделись с преподавателем.</small></p></div>
        <button className="primary-button" onClick={reset}>Выбрать другого <span aria-hidden="true">↻</span></button>
        <p className="result-footnote">Настроение может меняться. И это окей.</p>
      </div>
    </div>
  </section> : <section className="selection-view" aria-labelledby="page-title">
    <div className="intro"><span className="eyebrow intro-badge"><span aria-hidden="true">✦</span> Маленькая пауза перед большим делом</span><h1 id="page-title">Кто ты <span>сегодня<span className="title-star" aria-hidden="true">✧</span></span>?</h1><p>Выбери персонажа под своё настроение!</p><span className="intro-doodle" aria-hidden="true">☺</span></div>
    <div className="collection-heading"><span><b>7 персонажей.</b> Какой из них — ты?</span><span className="time-note"><span aria-hidden="true">◷</span> 15–30 секунд</span></div>
    <div className={`character-grid ${picking ? 'is-picking' : ''}`}>
      {characters.map((character, index) => <button key={character.id} id={`character-${character.id}`} className={`character-card ${picking === character.id ? 'picked' : ''}`} style={{ '--card-color': character.color, '--delay': `${index * 45}ms` } as CSSProperties} onClick={event => choose(character, event.currentTarget)} aria-label={`Выбрать: ${character.name}. ${character.phrase}`} aria-disabled={!!picking}>
        <div className="card-top"><span className="card-number">0{index + 1}</span><span className="card-mood">{character.mood}</span><span className="card-star" aria-hidden="true">✧</span></div>
        <img src={characterImage(character.id, true)} srcSet={`${characterImage(character.id, true)} 480w, ${characterImage(character.id)} 1254w`} sizes="(max-width: 540px) 45vw, (max-width: 900px) 30vw, 270px" width="1254" height="1254" alt="" decoding="async" />
        <div className="card-bottom"><h2>{character.shortName}</h2><span className="choose-arrow" aria-hidden="true">↗</span></div>
      </button>)}
      <div className="collection-note"><span className="note-spark" aria-hidden="true">✳</span><p>Здесь нет<br/><em>неправильных</em><br/>ответов.</p><span>Выбирай сердцем <span aria-hidden="true">♡</span></span></div>
    </div>
    <p className="selection-hint"><span aria-hidden="true">↖</span> Нажми на карточку, в которой узнаёшь себя</p>
  </section>
}
