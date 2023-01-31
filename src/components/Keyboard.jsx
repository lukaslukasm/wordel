import { useEffect, useLayoutEffect, useState } from "react"
import backspace from '../assets/backspace.svg'

const FIRST_ROW_KEYS = 'qwertyuiop'
const SECOND_ROW_KEYS = 'asdfghjkl'
const THIRD_ROW_KEYS = 'zxcvbnm'

function Keyboard({ guesses, solution, keyPressedHandler }) {

  const [colors, setColors] = useState([])
  let noLuckKeys = [].concat(...guesses.map(guess => guess.split('')))
  noLuckKeys = noLuckKeys.filter((ch, i) => noLuckKeys.indexOf(ch) === i)
  let yellowKeys = noLuckKeys.filter(key => ~solution.indexOf(key))
  const [greenKeys, setGreenKeys] = useState([])

  useLayoutEffect(() => {
    let array = []
    guesses.map(guess =>
      guess.split('').map((ch, i) => {
        if (solution[i] === ch)
          array.push(ch)
      }))
    array = array.filter((key, i) => array.indexOf(key) === i)
    setGreenKeys(array)

  }, [guesses])

  const getClassFor = (key) => {

    if (~greenKeys.indexOf(key))
      return "key bg-green-700"


    if (~yellowKeys.indexOf(key))
      return "key bg-[#b59f3b]"


    if (~noLuckKeys.indexOf(key))
      return "key bg-neutral-700"

    return 'key'
  }

  return (
    <div className='keyboard'>
      <div className="keyboard-row">
        {
          FIRST_ROW_KEYS.split('').map((key) =>
            <button
              className={getClassFor(key)}
              key={key}
              onClick={() => keyPressedHandler({ key: key })}
            >
              {key}
            </button>)
        }
      </div>

      <div className="keyboard-row">
        <span className="flex flex-[0.5] -mr-1.5" />
        {
          SECOND_ROW_KEYS.split('').map((key) =>
            <button
              className={getClassFor(key)}
              key={key}
              onClick={() => keyPressedHandler({ key: key })}
            >
              {key}
            </button>)
        }
        <span className="flex flex-[0.5] -ml-1.5" />
      </div>

      <div className="keyboard-row">
        <button onClick={() => keyPressedHandler({ key: 'Enter' })} className="key !flex-[1.5]">enter</button>
        {THIRD_ROW_KEYS.split('').map((key) =>
          <button
            className={getClassFor(key)}
            key={key}
            onClick={() => keyPressedHandler({ key: key })}
          >
            {key}
          </button>)
        }
        <button onClick={() => keyPressedHandler({ key: 'Backspace' })} className="key !flex-[1.5]">
          <img src={backspace} alt="" />
        </button>
      </div>
    </div>
  )
}
export default Keyboard