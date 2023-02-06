import { useContext, useState } from 'react'
import flagSk from '../assets/flagSK.png'
import flagEn from '../assets/flagEN.png'
import HelpModal from './HelpModal'
import LangContext from './LangContext'
import Menu from './Menu'
import { AnimatePresence, motion } from 'framer-motion'

function Header() {
  const [showHelp, setShowHelp] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [lang,] = useContext(LangContext)

  return (
    <header>

      <button
        className="w-10 flex pl-1.5 justify-center items-start flex-col gap-2"
        onClick={() => setShowMenu(true)}
      >
        <span className="bg-ourwhite h-[3px] w-6 rounded-full" />
        <span className="bg-ourwhite h-[3px] w-6 rounded-full" />
      </button>
      <h1 className="flex items-center gap-2">
        Wordeľ
        {lang === 'sk' ?
          <img src={flagSk} alt="" className="w-8 inline-block" />
          :
          <img src={flagEn} alt="" className="w-8 inline-block" />
        }
      </h1>
      <button
        onClick={() => setShowHelp(true)}
        className='flex font-black justify-center items-center text-2xl rounded-md w-6 h-8'
      >
        ?
      </button>
      {showHelp ? <HelpModal setShowModal={setShowHelp} /> : <></>}
      <AnimatePresence>
        {showMenu && <Menu setShowMenu={setShowMenu} />}
      </AnimatePresence>

    </header>
  )
}
export default Header