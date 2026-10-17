export interface Character {
  id: string
  name: string
  shortName: string
  phrase: string
  phraseInImage: boolean
  mood: string
  color: string
}
export const characters: Character[] = [
  { id: 'sloth', name: 'Ленивец', shortName: 'Ленивец', phrase: 'ещё не проснулся, но уже пришёл', phraseInImage: true, mood: 'На своей скорости', color: '#e7eee4' },
  { id: 'raccoon', name: 'Енот-хулиган', shortName: 'Енот-хулиган', phrase: 'Я ничего не натворил. Пока что', phraseInImage: true, mood: 'Есть один план…', color: '#fff0d4' },
  { id: 'cat', name: 'Кот в шоке', shortName: 'Кот в шоке', phrase: 'Что вообще сегодня происходит?!', phraseInImage: true, mood: 'Слишком много вопросов', color: '#f0e8fa' },
  { id: 'duck', name: 'Утка на позитиве', shortName: 'Утка на позитиве', phrase: 'видит во всём что-то хорошее', phraseInImage: true, mood: 'Ловлю хорошее', color: '#fff2c6' },
  { id: 'panda', name: 'Панда-обжорка', shortName: 'Панда-обжорка', phrase: 'думает о еде даже когда уже поел', phraseInImage: true, mood: 'Мысли о вкусном', color: '#f7e4e9' },
  { id: 'squirrel', name: 'Белка на турбо-скорости', shortName: 'Турбо-белка', phrase: 'У неё уже десять идей, и все срочно', phraseInImage: true, mood: 'Энергия через край', color: '#ffe8d6' },
  { id: 'fox', name: 'Лис в режиме гения', shortName: 'Лис-гений', phrase: 'Сегодня мой мозг работает на 200%!', phraseInImage: true, mood: 'Всё под контролем', color: '#eae4fc' },
]
export const characterImage = (id: string, small = false) => `${import.meta.env.BASE_URL}characters/${id}${small ? '-small' : ''}.webp`
