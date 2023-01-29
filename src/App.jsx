import { useEffect, useLayoutEffect, useState } from "react"
import uuid from "react-uuid"
import Line from "./components/Line"
// import dictionary from "../data/database"
import Alert from "./components/Alert"
import Modal from "./components/Modal"
import Keyboard from "./components/Keyboard"

function App() {
  const [guesses, setGuesses] = useState([])
  const [theWord, setTheWord] = useState()
  const [badOrientation, setBadOrientation] = useState((window.innerHeight < window.innerWidth && window.innerHeight < 600) ? 't' : 'f')
  const [currentGuess, setCurrentGuess] = useState('')
  const [game, setGame] = useState(true)
  const [win, setWin] = useState(false)
  const [emptyTiles, setEmptyTiles] = useState([
    <Line key={uuid()} type='empty' />,
    <Line key={uuid()} type='empty' />,
    <Line key={uuid()} type='empty' />,
    <Line key={uuid()} type='empty' />,
    <Line key={uuid()} type='empty' />,
    <Line key={uuid()} type='empty' />
  ])
  const [guessTiles, setGuessTiles] = useState([])
  const [backspace, setBackspace] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [shake, setShake] = useState(false)
  const [dictionary, setDictionary] = useState([])
  const [statTxt, setStatText] = useState([])

  useEffect(() => {
    window.addEventListener('resize', () => setBadOrientation(window.innerHeight < window.innerWidth && window.innerHeight < 600))
    return () => window.removeEventListener('resize', () => setBadOrientation(window.innerHeight < window.innerWidth && window.innerHeight < 600))
  }, [])

  useLayoutEffect(() => {
    const fetchTheWord = async () => {
      const promise = await fetch('/public/data/answers.txt')
      const result = await promise.text()
      let answers = [...result.split('\n')]
      setTheWord(answers[Math.floor(Math.random() * answers.length)].toLowerCase())
    }
    fetchTheWord()

    const fetchDictionary = async () => {
      const dict = await fetch('/public/data/guesses.txt')
      const result = await dict.text()
      setDictionary([...result.split('\n')])
    }

    fetchDictionary()
  }, [])

  // plnenie guesstiles a empty tiles
  useEffect(() => {
    setEmptyTiles(prev => prev.slice(0, -1))
    if (guesses.length >= 1)
      setGuessTiles(prev => [...prev, <Line key={uuid()} word={guesses[guesses.length - 1]} type='guess' setStatText={setStatText} solution={theWord} />])
  }, [guesses])

  useEffect(() => {
    if (!shake)
      return

    const timer = setTimeout(() => setShake(false), 500)
    return () => clearTimeout(timer)
  }, [shake])

  // klavesnica listener + enter handler
  const keyPressedHandler = (e) => {
    if (!isAlpha(e.key) && e.key !== 'Enter' && e.key !== 'Backspace')
      return

    if (!game)
      return

    if (e.key === 'Enter' && currentGuess.length !== 5)
      return


    const enterHandler = async () => {
      if (dictionary.indexOf(currentGuess) === -1) {
        setAlertMessage('Take neznam')
        setShake(true)
        return
      }
      setGuesses(prev => {
        if (prev.length === 5) {
          setGame(false)
          setAlertMessage(theWord)
        }
        return [...prev, currentGuess]
      })
      if (currentGuess === theWord) {
        setAlertMessage('vyboorne veduci!')
        setWin(true)
        setGame(false)
      }
      setCurrentGuess('')

    }

    switch (e.key) {
      case 'Enter':
        enterHandler()
        break;
      case 'Backspace':
        setCurrentGuess(prev => prev.slice(0, -1))
        setBackspace(true)
        break;
      default:
        setCurrentGuess(prev => prev.length === 5 ? prev : prev.concat(e.key.toLowerCase()))
        break;
    }
  }
  useEffect(() => {

    document.addEventListener('keydown', keyPressedHandler)
    return () => {
      document.removeEventListener('keydown', keyPressedHandler)
    }
  }, [currentGuess])

  const isAlpha = (c) => {
    return /^[A-Z]$/i.test(c);
  }

  return (
    <div className="max-h-screen flex flex-col">
      <header>
        <h1>Wordeľ 🇸🇰</h1>
      </header>
      <main className="w-full items-center flex justify-center">
        {badOrientation === true || badOrientation === 't' ? (
          <h2 className="absolute text-center bottom-1/2 translate-y-1/2 left-0 right-0">
            Wordeľ še bavi na vyšku gluptaku.
          </h2>
        ) : (
          <>
            {/* board */}
            <div className="board">
              {guesses &&
                <div className="flex flex-col justify-start gap-1.5">
                  {guessTiles}
                </div>
              }
              {/* current guess */}
              <div className="flex flex-col gap-1.5">
                {guesses.length < 6 &&
                  <Line
                    word={currentGuess}
                    error={shake}
                    type='current'
                    backspace={backspace}
                    setBackspace={setBackspace}

                  />
                }
                {emptyTiles}
              </div>

              <Alert permanent={!game} message={alertMessage} setMessage={setAlertMessage} />
            </div>
            <Keyboard guesses={guesses} solution={theWord} keyPressedHandler={keyPressedHandler} />
          </>
        )}
        <Modal win={win} game={game} setAlertMessage={setAlertMessage} statTxt={statTxt} />
      </main>
    </div>

  )
}

export default App
