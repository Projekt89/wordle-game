import React, {useState, useEffect} from 'react'

export default function Keypad({  language, reset, usedKeys }) {
  const [letters, setLetters] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3001/letters-${language}`)
      .then(res => res.json())
      .then(data => setLetters(data))
  }, [language, reset, usedKeys])

  // props: guesses, handleKeyup,
  //
  // useEffect(() => {
  //   if (!letters) return
  //   let newLetters = [...letters]
  //   guesses.forEach(guess => {
  //     if (guess) guess.forEach(item => {
  //       const index = letters.findIndex(letter => letter.key === item.key)
  //       newLetters[index] = { key: item.key, color: item.color }
  //     })
  //   })
  //   setLetters(newLetters)
  // }, [guesses])
  // className={letter.color}
  // onClick={() => handleKeyup({key: letter.key})}

  return (
    <div className='keypad'>
      {letters && letters.map((letter, i) => {
        const color = usedKeys[letter.key]

        return (
          <div 
            key={letter.key} 
            className={color}
          >{letter.key}</div>
        )
      })}
    </div>
  )
}
