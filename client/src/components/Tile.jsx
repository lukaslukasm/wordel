import { useEffect, useState } from "react"
import { motion, useAnimationControls } from 'framer-motion'
import uuid from "react-uuid"

function Tile({ char, tileClass, index, win }) {

  const [tileClassState, setTileClassState] = useState('current-tile')
  const key = uuid()
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({ rotateX: [90, 0], transition: { duration: 0.15 } });
  }, [tileClassState])

  useEffect(() => {
    if (win)
      winSequence()
    else
      sequence()
  }, [])

  const sequence = async () => {
    await controls.start((i) => ({ rotateX: [0, 90], transition: { duration: 0.15, delay: 0.2 * i } }));
    setTileClassState(tileClass)
  }

  const winSequence = async () => {
    sequence()
    const timer = setTimeout(() => {
      // win wave
      controls.start(i => ({ y: [0, -40, 0, -20, 0], transition: { duration: 0.5, delay: 0.04 * i } }));
    }, 1100)
    return () => clearTimeout(timer)
  }

  return (
    <motion.div
      key={key}
      custom={index}
      // initial={{ rotateX: 90 }}
      className={tileClassState}
      animate={controls}
    >
      {char}
    </motion.div>
  )
}
export default Tile