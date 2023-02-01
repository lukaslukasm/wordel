import { useEffect, useState } from "react"
import uuid from "react-uuid"
import Game from "./components/Game"
import Header from "./components/Header"
import LangContext from "./components/LangContext"

function App() {
  const [language, setLanguage] = useState(localStorage.getItem('language') ? localStorage.getItem('language') : 'sk')

  useEffect(() => {
    if (language !== localStorage.getItem('language'))
      localStorage.setItem('language', language)

  }, [language])


  return (
    <div className="max-h-screen flex flex-col">
      <LangContext.Provider value={[language, setLanguage]}>
        <Header />
        {language && <Game key={uuid()} />}
      </LangContext.Provider>
    </div>
  )
}
export default App