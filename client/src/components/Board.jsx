import uuid from "react-uuid"
import Line from "./Line"

function Board({ guesses, currentGuess }) {
  return (
    <>
      {guesses.map((guess) => <Line key={uuid()} guess={guess} />)}
    </>
  )
}
export default Board