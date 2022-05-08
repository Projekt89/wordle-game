import React from 'react'

export default function Row({ guess, currentGuess }) {

  // if (typeof(guess) === 'string') {
  //   let prep = []
  //   for ( let i=0; i<5; i++ ) {
  //     if (guess.charAt(i)) {
  //       prep[i] = {key: guess.charAt(i)}
  //     } else {
  //       prep[i] = {key: ''}
  //     }
  //   }
  //   guess = prep
  // }

  if (guess) {
    return (
      <div className='row past'>
        {guess.map((l, i) => (
          <div key={i} className={l.color}>{l.key}</div>
        ))}
      </div>
    )
  }

  if (currentGuess) {
    let letters = currentGuess.split('')

    return (
      <div className='row current'>
        {letters.map((letter, i) => (
          <div key={i} className='filled'>{letter}</div>
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    )
  }


  return (
    <div className="row">
      <><div></div><div></div><div></div><div></div><div></div></>
    </div>
  )
}
