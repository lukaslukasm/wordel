import { useContext, useEffect, useState } from "react"
import uuid from "react-uuid"
import Game from "./components/Game"
import Header from "./components/Header"
import StateContext from "./components/StateContext"

function App() {
  const [key, setKey] = useState(uuid())
  const [state, setState] = useContext(StateContext)

  useEffect(() => {
    setKey(uuid())
  }, [state.language])

  return (
    <div className="max-h-screen flex flex-col">
      <Header />
      <Game key={key} />
    </div>
  )
}
export default App