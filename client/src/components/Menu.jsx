import x from '/src/assets/x.png'
import jazyk from '/src/assets/jazyk.png'
import Switcher from './Switcher'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function Menu({ setShowMenu }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (show)
      return

    const timer = setTimeout(() => {
      setShowMenu(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [show])


  return (
    <AnimatePresence>
      {show &&
        <motion.div onClick={() => setShow(false)} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.1 } }} exit={{ opacity: 0 }} className="modal-bg justify-start">
          <motion.nav onClick={(e) => e.stopPropagation()} initial={{ x: -320 }} animate={{ x: 0, transition: { type: 'ease-in', duration: 0.2 } }} exit={{ x: -320 }} className="sidebar">
            <button
              className='h-6 absolute right-6 top-4'
              onClick={() => setShow(false)}
            >
              <img src={x} alt="" className='w-4 invert' />
            </button>

            <span className='kategoria mt-8'>Nastavenia</span>
            <span className='menu-item'>
              <img src={jazyk} className='invert w-6 mr-2' alt="" />
              <span className='w-full text-left'>Jazyk</span>
              <Switcher />
            </span>
            <span className='w-full mt-2 flex justify-center items-center'>
              <span className=' flex text-3xl leading-none rounded-md h-6 w-6 justify-center text-center items-center font-black text-neutral-600'>!</span>
              <span className=' ml-1 italic text-sm text-neutral-600'>Zmena jazyka reštartuje hru</span>
            </span>
          </motion.nav>
        </motion.div>
      }
    </AnimatePresence>
  )
}
export default Menu