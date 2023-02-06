import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const Alert = ({ message, permanent, setMessage }) => {
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (!message)
      return
    if (permanent) {
      const timer = setTimeout(() => { setShowAlert(true) }, 1200)
      const timer2 = setTimeout(() => { setShowAlert(false) }, 2500)
      return () => { clearTimeout(timer); clearTimeout(timer2) }
    } else {
      setShowAlert(true)
      const timer = setTimeout(() => { setShowAlert(false); setMessage('') }, 1000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <>
      <AnimatePresence>
        {showAlert &&
          <motion.div
            initial={{ opacity: 0, y: -10, x: "-50%" }}
            animate={{ opacity: 100, y: 0, transition: { duration: 0.1 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.1 } }}
            className="alert"
          >{message}
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}
export default Alert