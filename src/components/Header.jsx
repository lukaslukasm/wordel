import { useState } from 'react'
import help from '../assets/help.svg'
import HelpModal from './HelpModal'

function Header() {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <header>
      <span className="w-14" />
      <h1 className="">Wordeľ 🇸🇰</h1>
      {/* <h1 className="flex-grow">|</h1> */}
      <button onClick={() => setShowHelp(true)}><img src={help} alt="" className="w-6" /></button>
      {showHelp ? <HelpModal setShowModal={setShowHelp} /> : <></>}
    </header>
  )
}
export default Header