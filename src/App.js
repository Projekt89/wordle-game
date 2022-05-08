import {useState, useEffect} from 'react'
import Wordle from './components/Wordle'

function App() {
  const [language, setLanguage] = useState('English')
  const [solution, setSolution] = useState(null)
  const [reset, setReset] = useState(true)

  useEffect(() => {
    if (reset) {
      fetch(`http://localhost:3001/solutions-${language}`)
      .then(res => res.json())
      .then(data => {
        const randomSolution = data[Math.floor(Math.random() * data.length)]
        setSolution(randomSolution)
      })
    }
    setReset(false)
  },[setSolution, language, reset])

  return (
    <div className="App">
      <h1>WORDLE</h1>
      {solution && 
      <Wordle 
        solution={solution.word}
        language={language}
        setLanguage={setLanguage}
        setReset={setReset}
        reset={reset}
      />}
    </div>
  );
}

export default App;
