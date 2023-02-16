import { calcLength, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function CustomInput({ name, placeholder, ref, type, value, onChange, errMsg }) {

  const [isErr, setIsErr] = useState(false)

  useEffect(() => {
    if (errMsg.message === '')
      setIsErr(false)
    if (errMsg.type === name)
      setIsErr(true)
  }, [errMsg])

  const variants = {
    i: {
      x: 0
    },
    a: {
      x: [0, 50, -50, 30, -30, 10, -10, 0],
      transition: {
        duration: .3,
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <motion.input
      name={name}
      placeholder={placeholder}
      type={type}

      value={value}
      onChange={onChange}
      className={`form-input ${isErr && "border-red-800"}`}
      variants={isErr && variants}
      initial='i'
      animate="a"
    />
  )
}
export default CustomInput