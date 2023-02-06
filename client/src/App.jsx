import { useEffect, useState } from "react"
import uuid from "react-uuid"
import Game from "./components/Game"
import Header from "./components/Header"
import LangContext from "./components/LangContext"

function App() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sk')
  const [key, setKey] = useState(uuid())

  useEffect(() => {
    localStorage.setItem('language', language)
    setKey(uuid())
  }, [language])


  return (
    <div className="max-h-screen flex flex-col">
      <LangContext.Provider value={[language, setLanguage]}>
        <Header />
        <Game key={key} />
      </LangContext.Provider>
    </div>
  )
}
export default App