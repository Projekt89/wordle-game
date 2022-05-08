import React, {useEffect, useRef} from 'react'

export default function Modal({ solution, isCorrect, turn, handleReset }) {
  
  const playAgain = useRef(null)

  useEffect(() => {
    playAgain.current.focus()
  }, [])

   if (isCorrect) {
    return (
      <div className="modal">
        <div className="content">
          <h2 className="header">You Win!</h2>
          <p className="solution green">{solution}</p>
          <p>You found the solution in {turn} guesses :)</p>
          <button ref={playAgain} className='play-again-btn'
            onClick={() => handleReset()}
          >Play Again</button>
        </div>
      </div>
    )
  }
  return (
    <div className="modal">
      <div className="content">
        <h2 className="header">Too Bad!</h2>
        <p className="solution red">{solution}</p>
        <p>Better luck next time!</p>
        <button ref={playAgain} className='play-again-btn'
            onClick={() => handleReset()}
          >Play Again</button>
      </div>
    </div>
  )
}
