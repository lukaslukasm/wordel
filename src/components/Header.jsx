import { useState } from 'react'
import help from '../assets/help.svg'
import flagSk from '../assets/flagSK.png'
import HelpModal from './HelpModal'
import Emoji from 'a11y-react-emoji'

function Header() {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <header>
      <span className="w-12" />
      <h1 className="flex items-center gap-2">Wordeľ <img src={flagSk} alt="" className="w-8 inline-block" /></h1>
      {/* <h1 className="flex-grow">|</h1> */}
      <button onClick={() => setShowHelp(true)}><img src={help} alt="" className="w-6" /></button>
      {showHelp ? <HelpModal setShowModal={setShowHelp} /> : <></>}
    </header>
  )
}
export default Header