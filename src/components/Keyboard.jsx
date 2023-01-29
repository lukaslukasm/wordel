import { useEffect, useLayoutEffect, useState } from "react"

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
        if (solution.indexOf(ch) === i)
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
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="#fafafa" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg>
        </button>
      </div>
    </div>
  )
}
export default Keyboard