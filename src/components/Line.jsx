import { useEffect, useState } from "react"
import uuid from "react-uuid"
import { motion } from 'framer-motion'
import Tile from "./Tile"

function Line({ word, solution, type, error, backspace, setBackspace, setStatText }) {
  const [tiles, setTiles] = useState([])
  let ids = []
  let arr = []

  const wrapVariants = {
    hidden: {
      x: 0,
      transition: {
        duration: 0.1,
        type: "spring",
        stiffness: 0
      }
    },
    show: {
      x: [0, 20, -20, 10, -10, 5, -5, 0],
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 0,
        staggerChildren: 0.1
      }
    }
  }

  const lastGuessVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 5
      }
    }
  }

  useEffect(() => {
    let WIPsolution = solution

    for (let i = 0; i < 5; i++) {
      switch (type) {
        case 'guess':
          // uz napisane riadky
          let tileClass = ''
          let statTxt = ''
          if (i === WIPsolution.indexOf(word[i])) {
            tileClass = 'green-tile'
            WIPsolution = WIPsolution.replace(word[i], ' ')
            statTxt += '🟩'
          }
          else if (WIPsolution.indexOf(word[i]) !== -1) {
            tileClass = 'yellow-tile'
            WIPsolution = WIPsolution.replace(word[i], ' ')
            statTxt += '🟨'
          }
          else {
            tileClass = 'noluck-tile'
            statTxt += '⬛️'
          }
          setStatText(prev => [...prev, statTxt])
          arr.push({ char: word[i], tileClass })
          break;
        case 'current':
          // pocas pisania
          if (word[i])
            if (i === word.length - 1 && !backspace)
              arr.push(<motion.span initial={{ scale: 1.1 }} animate={{ scale: 1 }} key={uuid()} className="current-tile">{word[i]}</motion.span>)
            else
              arr.push(<motion.span key={uuid()} className="current-tile">{word[i]}</motion.span>)
          else
            arr.push(<span key={uuid()} className="empty-tile" />)
          break;
        case 'empty':
          arr.push(<span key={uuid()} className="empty-tile" />)
          break;
      }
    }
    if (backspace) setBackspace(false)
    setTiles(arr)
  }, [word])

  return (

    <motion.div
      variants={error ? wrapVariants : lastGuessVariants}
      initial='hidden'
      animate='show'
      exit='exit'
      className={`flex flex-row gap-1.5 ${type === 'guess' ? 'justify-self-start' : 'justify-self-end'}`}
    >
      {type !== 'guess' ?
        tiles
        :
        tiles.map((tile, i) => <Tile key={uuid()} char={tile.char} index={i} tileClass={tile.tileClass} />)
      }
    </motion.div>

  )
}
export default Line