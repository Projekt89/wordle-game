import {useState} from 'react'

export default function useWordle(solution) {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)])
  const [history, setHistory] = useState([])
  const [isCorrect, setIsCorrect] = useState(false)
  
  // format a guess into an array of letter objects
  // each object needs {key: 'a', color: 'yellow'}
  const formatGuess = () => {
    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess].map(letter => ({
      key: letter,
      color: 'gray',
    }))

    // find any green letter
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = 'green'
        solutionArray[i] = null
      }
    })

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow'
        solutionArray[solutionArray.indexOf(l.key)] = null
      }
    })

    return formattedGuess
  }

  // add a new guess to state of history of guesses
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true)
    }

    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })
    setHistory((prevHistory) => ([...prevHistory, currentGuess]))
    setTurn((prevTurn) => (prevTurn + 1))
    setCurrentGuess('')
  }

  // handle keyup event & track current guess
  // if user presses enter, add new guess
  const handleKeyup = ({ key }) => {
    if (isCorrect) return
    if (key === 'Enter') {
      // do not allow duplicate words, turn is less than 5 and check word is at least 5 characters long
      if (turn > 5) {
        console.log('you used all your guesses')
        return
      }

      if (history.includes(currentGuess)) {
        console.log('you allready tried that word')
        return
      }

      if (currentGuess.length !== 5 ) {
        console.log('word must be 5 chars long')
        return
      }
      const formatted = formatGuess()
      addNewGuess(formatted)
    }

    if (key === 'Backspace' || key === '<--') {
      setCurrentGuess(previousGuess => (previousGuess.slice(0,-1)))
      return
    }

    if (/^[a-zA-Z ĄąŻżŹźĆćŃńŚśŁłĘęÓó]$/.test(key)) {
      if(currentGuess.length < 5) {
        setCurrentGuess(previousGuess => (previousGuess + key))
      }
    }
  }

  const handleReset = () => {
    setTurn(0)
    setCurrentGuess('')
    setGuesses([...Array(6)])
    setHistory([])
    setIsCorrect(false)
  }

  return { turn, currentGuess, guesses, isCorrect, history, handleKeyup, handleReset }
}
