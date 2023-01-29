import { useEffect, useLayoutEffect, useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'
import uuid from "react-uuid"

function Tile({ char, tileClass, index }) {

  const [result, setResult] = useState(true)
  const [result2, setResult2] = useState(false)
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


  return (
    <AnimatePresence>
      {result ? (
        <motion.span
          key={key}
          variants={currentToFade}
          className="current-tile"
          exit='exit'
          onAnimationComplete={() => setResult2(true)}>
          {char}
        </motion.span>
      ) : (result2 && (
        <motion.span
          key={uuid()}
          initial='hidden'
          animate='show'
          variants={fadeToValidated}
          className={tileClass}>
          {char}
        </motion.span>
      ))}
    </AnimatePresence>
  )
}
export default Tile