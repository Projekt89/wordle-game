import React, {useState, useEffect} from 'react'

export default function Keypad({ guesses, handleKeyup, language, reset }) {
  const [letters, setLetters] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3001/letters-${language}`)
      .then(res => res.json())
      .then(data => setLetters(data))
  }, [language, reset])

  useEffect(() => {
    if (!letters) return
    let newLetters = [...letters]
    guesses.forEach(guess => {
      if (guess) guess.forEach(item => {
        const index = letters.findIndex(letter => letter.key === item.key)
        newLetters[index] = { key: item.key, color: item.color }
      })
    })
    setLetters(newLetters)
  }, [guesses])

  return (
    <div className='keypad'>
      {letters && letters.map((letter, i) => {
        
        return (
          <div 
            key={letter.key} 
            className={letter.color}
            onClick={() => handleKeyup({key: letter.key})}
          >{letter.key}</div>
        )
      })}
    </div>
  )
}
