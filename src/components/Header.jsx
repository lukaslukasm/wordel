import { useState } from 'react'
import help from '../assets/help.svg'
import flagSk from '../assets/flagSK.png'
import HelpModal from './HelpModal'
import Emoji from 'a11y-react-emoji'

function Header() {
  const [showHelp, setShowHelp] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header>
      <span className="w-10"></span>
      {/* <button
        className="w-10 flex pl-1.5 justify-center items-start flex-col gap-2"
        onClick={() => setShowMenu(true)}
      >
        <span className="bg-ourwhite h-[3px] w-6 rounded-full" />
        <span className="bg-ourwhite h-[3px] w-6 rounded-full" />
      </button> */}
      <h1 className="flex items-center gap-2">Wordeľ <img src={flagSk} alt="" className="w-8 inline-block" /></h1>
      {/* <h1 className="flex-grow">|</h1> */}
      <button
        onClick={() => setShowHelp(true)}
        className='flex font-black justify-center items-center text-2xl rounded-md w-6 h-8'
      >
        ?
      </button>
      {showHelp ? <HelpModal setShowModal={setShowHelp} /> : <></>}
      {showMenu ? <Menu setShowMenu={setShowMenu} /> : <></>}

    </header>
  )
}
export default Header