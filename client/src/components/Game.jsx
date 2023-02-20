import { useContext, useEffect, useLayoutEffect, useState } from "react"
import uuid from "react-uuid"
import Line from "./Line"
import Alert from "./Alert"
import Keyboard from "./Keyboard"
import StateContext from "./StateContext"

const SLOVAK_SPELLCHECK_URL = 'https://api.sapling.ai/api/v1/spellcheck'

function Game() {
  const [guesses, setGuesses] = useState([])
  const [theWord, setTheWord] = useState('')
  const [badOrientation, setBadOrientation] = useState((window.innerHeight < window.innerWidth && window.innerHeight < 450) ? 't' : 'f')
  const [currentGuess, setCurrentGuess] = useState('')
  const [game, setGame] = useState(true)
  const [win, setWin] = useState(false)
  const [guessTiles, setGuessTiles] = useState([])
  const [backspace, setBackspace] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [shake, setShake] = useState(false)
  const [dictionary, setDictionary] = useState([])
  const [statTxt, setStatText] = useState([])
  const [state, setState] = useContext(StateContext)
  const idsForEmptyTiles = Array(6).fill(uuid())
  const [emptyTiles, setEmptyTiles] = useState(
    [...idsForEmptyTiles.map((id, i) => <Line key={id + i + ''} type='empty' />)])

  useEffect(() => {
    window.addEventListener('resize', () => setBadOrientation(window.innerHeight < window.innerWidth && window.innerHeight < 450))
    return () => window.removeEventListener('resize', () => setBadOrientation(window.innerHeight < window.innerWidth && window.innerHeight < 4500))
  }, [])

  useLayoutEffect(() => {
    const fetchTheWord = async () => {
      let promise
      if (state.language === 'sk')
        promise = await fetch('/data/slovenske.txt')
      else
        promise = await fetch('/data/answers.txt')
      const result = await promise.text()
      let answers = [...result.split('\n')]
      let pickedWord = answers[Math.floor(Math.random() * answers.length)].toLowerCase()
      setTheWord(pickedWord)
      console.log('Vysledok neni ' + pickedWord.toUpperCase())
    }
    const fetchDictionary = async () => {
      let dict
      if (state.language === 'sk')
        dict = await fetch('/data/slovnik.txt')
      else
        dict = await fetch('/data/guesses.txt')
      const result = await dict.text()
      setDictionary([...result.split('\n')])
    }
    fetchTheWord()
    fetchDictionary()
  }, [])

  // plnenie guesstiles a empty tiles
  useEffect(() => {
    setEmptyTiles(prev => prev.slice(0, -1))
    if (guesses.length >= 1)
      setGuessTiles(prev => [...prev, <Line win={win} key={uuid()} word={guesses[guesses.length - 1]} type='guess' setStatText={setStatText} solution={theWord} />])
  }, [guesses])

  // shake ked je nesposivne slovo
  useEffect(() => {
    if (!shake)
      return
    const timer = setTimeout(() => setShake(false), 500)
    return () => clearTimeout(timer)
  }, [shake])

  const increaseScore = () => {
    switch (guesses.length) {
      case 1:
        setState(prev => ({ ...prev, user: { ...prev.user, winsOnTry1: prev.user.winsOnTry1 + 1 } }))
        break;
      case 2:
        setState(prev => ({ ...prev, user: { ...prev.user, winsOnTry2: prev.user.winsOnTry2 + 1 } }))
        break;
      case 3:
        setState(prev => ({ ...prev, user: { ...prev.user, winsOnTry3: prev.user.winsOnTry3 + 1 } }))
        break;
      case 4:
        setState(prev => ({ ...prev, user: { ...prev.user, winsOnTry4: prev.user.winsOnTry4 + 1 } }))
        break;
      case 5:
        setState(prev => ({ ...prev, user: { ...prev.user, winsOnTry5: prev.user.winsOnTry5 + 1 } }))
        break;
      case 6:
        setState(prev => ({ ...prev, user: { ...prev.user, winsOnTry6: prev.user.winsOnTry6 + 1 } }))
        break;
    }
  }

  // Enter handler
  const enterHandler = async () => {
    if (dictionary.indexOf(currentGuess) === -1) {
      setAlertMessage('Nespisovné')
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
      setAlertMessage('👏🏻 👏🏻 👏🏻')
      setWin(true)
      if (state.user)
        setState(prev => ({ ...prev, user: { ...prev.user, nOfWins: prev.user.nOfWins + 1 } }))
      setGame(false)
      increaseScore()
    }
    setCurrentGuess('')
    if (game)
      return
    if (state.user)
      setState(prev => ({ ...prev, user: { ...prev.user, nOfGames: prev.user.nOfGames + 1 } }))
    const timer = setTimeout(() => setState(prev => ({ ...prev, isStatsOpen: true })), 2000)
    return () => clearTimeout(timer)
  }

  // key press handler
  const keyPressedHandler = (e) => {
    if (!isAlpha(e.key) && e.key !== 'Enter' && e.key !== 'Backspace')
      return
    if (!game)
      return
    if (e.key === 'Enter' && currentGuess.length !== 5)
      return
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
    <main className="w-full items-center flex justify-center">
      {badOrientation === true || badOrientation === 't' ? (
        <h2 className="absolute text-center bottom-1/2 translate-y-1/2 left-0 right-0">
          Wordeľ še bavi na vyšku.
        </h2>
      ) : (
        <>
          {/* board */}
          <div className="board">
            {guesses &&
              <div className="flex flex-col justify-start">
                {guessTiles}
              </div>
            }
            {/* current guess */}
            <div className="flex flex-col">
              {guesses.length < 6 &&
                <Line
                  word={currentGuess}
                  error={shake}
                  type='current'
                  backspace={backspace}
                  setBackspace={setBackspace}
                  win={win}
                />
              }
              {emptyTiles}
            </div>
            <Alert permanent={!game} message={alertMessage} setMessage={setAlertMessage} />
          </div>
          <Keyboard guesses={guesses} solution={theWord} keyPressedHandler={keyPressedHandler} />
        </>
      )}
    </main>
  )
}

export default Game
