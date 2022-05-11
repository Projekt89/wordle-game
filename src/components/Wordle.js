import {useEffect, useState} from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({ solution, language, setLanguage, setReset, reset }) {
  const [modalVisible, setModalVisible] = useState(false)
  const { currentGuess, guesses, isCorrect, turn, history, usedKeys, handleKeyup, handleReset: resetGameData } = useWordle(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)
    
    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup])
  
  useEffect(() => {
    if (isCorrect || turn === 6) {
      setTimeout(() => {
        setModalVisible(true)
      }, 2000)
    }
  }, [guesses, isCorrect, turn])

  const handleReset = (e) => {
    resetGameData()
    setModalVisible(false)
    setReset(true)
    if (e) setLanguage(e)
  }

  return (
    <>
      <select className='language'
        onChange={(e) => handleReset(e.target.value)}
      >
        <option value={'English'}>English</option>
        <option value={'Polski'}>Polski</option>
        
      </select>
      <Grid 
        currentGuess={currentGuess} 
        guesses={guesses} 
        turn={turn}
      />
      <Keypad
        history={history}
        guesses={guesses}
        handleKeyup={handleKeyup}
        language={language}
        reset={reset}
        usedKeys={usedKeys}
      />

      {modalVisible &&
        <Modal
          solution={solution}
          turn={turn}
          isCorrect={isCorrect}
          handleReset={handleReset}
        />
      }
    </>
  )
}
