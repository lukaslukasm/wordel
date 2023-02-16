import { useContext } from "react"
import StateContext from "./StateContext"
import { motion } from 'framer-motion'


function Chart() {
  const [state,] = useContext(StateContext)
  const values = [
    state.user.winsOnTry1,
    state.user.winsOnTry2,
    state.user.winsOnTry3,
    state.user.winsOnTry4,
    state.user.winsOnTry5,
    state.user.winsOnTry6,
  ]
  const maxNumber = Math.max(...values)

  return (
    <div className="flex flex-col gap-1 w-full">
      {values.map((val, i) => {
        let w = `calc(${80 / maxNumber * val}% + 25px)`
        return (
          <span key={i} className="flex gap-1 items-center">
            <p
              className="kategoria m-0 text-neutral-200"

            >
              {i + 1}.
            </p>
            <motion.span
              className="bg-neutral-600 py-0.5 px-2 text-right"
              style={{ width: w }}
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: 1, transition: { ease: 'easeOut', duration: 0.4 } }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
              >
                {val}
              </motion.span>
            </motion.span>
          </span>
        )
      })}
    </div>
  )
}
export default Chart