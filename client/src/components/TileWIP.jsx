import { useEffect, useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'
import uuid from "react-uuid"

function Tile({ char, tileClass, index, }) {

  const [result, setResult] = useState(true)
  const [result2, setResult2] = useState(false)
  const [result3, setResult3] = useState(false)
  const key = uuid()

  const currentToFade = {
    hidden: {
      rotateX: 0,
      transition: {
        duration: 0.2,
        type: 'easeOut'
      }
    },
    show: {
      rotateX: 90,
      transition: {
        duration: 0.2,
        type: 'easeOut'
      }
    },
    exit: {
      rotateX: 90,
      transition: {
        duration: 0.2,
        delay: index * 0.2,
        type: 'easeOut'
      }
    },

  }
  const fadeToValidated = {
    hidden: {
      rotateX: 90,
      transition: {
        duration: 0.2,
        type: 'easeOut'
      }
    },
    show: {
      rotateX: 0,
      transition: {
        duration: 0.2,
        type: 'easeOut'
      }
    },
  }

  useEffect(() => {
    setResult(false)
  }, [])

  useEffect(() => {
    setResult2(false)
  }, [result2])

  return (
    <AnimatePresence>
      {result && (
        <motion.div
          key={key}
          variants={currentToFade}
          className="current-tile"
          exit='exit'
          onAnimationComplete={() => setResult2(true)}>
          {char}
        </motion.div>
      )}
      {result2 && (
        <motion.div
          key={key}
          variants={fadeToValidated}
          className={tileClass}
          initial='hidden'
          animate='show'
          onAnimationComplete={() => setResult3(true)}>
          {char}
        </motion.div>
      )}


    </AnimatePresence >
  )
}
export default Tile