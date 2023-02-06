import { motion } from "framer-motion"
import { useContext, useEffect } from "react"
import LangContext from "./LangContext"


function Switcher() {
  const [lang, setLang] = useContext(LangContext)

  const sliderVariants = {
    i: { x: 2 },
    a: { x: lang === 'sk' ? 0 : 64, transition: { type: 'power', duration: 0.2 } }
  }

  useEffect(() => {

  }, [lang])

  return (
    <button
      onClick={() => setLang(prev => prev === 'sk' ? 'en' : 'sk')}
      className="w-34 relative rounded-md p-1 h-10 bg-neutral-800 inline-flex"
    >

      <motion.span className={`${lang === 'sk' ? 'onlang' : 'offlang'}`}>SK</motion.span>
      <motion.span className={`${lang === 'sk' ? 'offlang' : 'onlang'}`}>EN</motion.span>
      <motion.span variants={sliderVariants} initial='i' animate='a' className="slider-switcher"></motion.span>
    </button>
  )
}
export default Switcher