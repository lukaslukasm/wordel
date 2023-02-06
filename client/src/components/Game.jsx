import { useContext, useEffect, useLayoutEffect, useState } from "react"
import uuid from "react-uuid"
import Line from "./Line"
import Alert from "./Alert"
import EndModal from "./EndModal"
import Keyboard from "./Keyboard"
import LangContext from "./LangContext"

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
  const [language,] = useContext(LangContext)
  const idsForEmptyTiles = Array(6).fill(uuid())
  const [emptyTiles, setEmptyTiles] = useState(
    [...idsForEmptyTiles.map((id, i) => <Line key={id + i + ''} type='empty' />)])

  useEffect(() => {
    window.addEventListener('resize', () => setBadOrientation(window.innerHeight < window.innerWidth && window.innerHeight < 450))
    if (!localStorage.getItem('laguage'))
      localStorage.setItem('language', 'sk')
    return () => window.removeEventListener('resize', () => setBadOrientation(window.innerHeight < window.innerWidth && window.innerHeight < 4500))
  }, [])

  useLayoutEffect(() => {
    const fetchTheWord = async () => {
      let promise
      if (language === 'sk')
        promise = await fetch('/data/slovenske.txt')
      else
        promise = await fetch('/data/answers.txt')
      const result = await promise.text()
      let answers = [...result.split('\n')]
      setTheWord(answers[Math.floor(Math.random() * answers.length)].toLowerCase())
    }

    const fetchDictionary = async () => {
      let dict
      if (language === 'sk')
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

      if (language === 'skk') {
        let result
        const options = {
          type: 'POST',
          text: currentGuess,
          key: 'UW6HJPOQBRD59BV8WKMUJP57Q23D828X',
          session_id: uuid(),
          min_length: 5,
          multiple_edits: false,
          lang: 'sk',
          mode: 'no-cors'
        }
        try {
          const resp = await fetch(SLOVAK_SPELLCHECK_URL, options)
          result = await resp.json()
          console.log(result)
        } catch (e) {
          print('Error: ', result)
          print('Error: ', e)
        }
        console.log('ok')
      }


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

                />
              }
              {emptyTiles}
            </div>

            <Alert permanent={!game} message={alertMessage} setMessage={setAlertMessage} />
          </div>
          <Keyboard guesses={guesses} solution={theWord} keyPressedHandler={keyPressedHandler} />
        </>
      )}
      <EndModal win={win} game={game} solution={theWord} setAlertMessage={setAlertMessage} statTxt={statTxt} />
    </main>
  )
}

export default Game
