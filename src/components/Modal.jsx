import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import x from '/src/assets/x.png'

function Modal({ setShowModal, children }) {

  const [hideModal, setHideModal] = useState(false)

  const handleXClick = () => {
    setHideModal(true);
    const timer = setTimeout(() => { setShowModal(false) }, 100)
    return () => clearTimeout(timer)
  }

  return (

    <div
      className="modal-bg"
    >
      <AnimatePresence>
        {!hideModal &&
          <motion.div
            className="modal"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 100, transition: { duration: 0.1 } }}
            exit={{ y: 20, opacity: 0, transition: { duration: 0.1 } }}
          >
            <button
              className='h-6 absolute right-4 top-4'
              onClick={() => handleXClick()}
            >
              <img src={x} alt="" className='invert w-4' />
            </button>
            {children}
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}
export default Modal