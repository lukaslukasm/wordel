import { useEffect, useState } from "react"
import copy from '/src/assets/copy.svg'
import restart from '/src/assets/restart.svg'
import Modal from "./Modal"
import { useContext } from "react"
import LangContext from "./LangContext"

function EndModal({ win, game, statTxt, setAlertMessage, solution }) {
  const [showModal, setShowModal] = useState(false)
  const [lang, setLang] = useContext(LangContext)
  const stats = `
  Wordeľ         
  ${win ? statTxt.length : 'X'}/6${'\n'}
  ${statTxt.map((item, i) =>
    i % 5 === 4 ? `${item}\n` : item).join('')
    }`

  useEffect(() => {
    if (game)
      return

    const timer = window.setTimeout(() => setShowModal(true), 1800)
    return () => {
      clearTimeout(timer)
    }
  }, [game])

  const shareHandler = async () => {
    let content = `
        Wordeľ         
        ${win ? statTxt.length : 'X'}/6${'\n\n'}
        ${statTxt.map((item, i) =>
      i % 5 === 4 ? `${item}\n` : item).join('')
      }`

    navigator.clipboard.writeText(content)
    setAlertMessage('Skopírované')

  }

  return (
    <>
      {showModal &&
        <Modal setShowModal={setShowModal}>
          <h2 className="mt-3 mb-2">
            {win ? 'Výborne!' : 'Nevydalo'}
          </h2>
          {
            !win &&
            <>
              <span>Správna odpoveď – <span className="uppercase">{solution}</span></span>
            </>
          }
          {/* <p className='bg-neutral-800 rounded-sm '>
              {stats}
            </p> */}

          {/* <button className="btn-share" onClick={shareHandler}>
              Kopírovať výsedok
              <img src={copy} className='mt-0.5 w-6 ml-3' />
            </button> */}
          {/* <span className='text-center -mt-2.5 text-neutral-600 text-xs'>
              {win ?
                "Pochval še dakemu"
                :
                "Pošli dakemu naj poplače stebu"
              } */}
          {/* </span> */}
          <hr className="my-3 border-px border-[#f0f0f0] w-full" />
          <span className='text-neutral-600 mt-2'>
            Dáme ešte jedno?
          </span>

          <button className="btn" onClick={() => setLang(prev => { prev })}>
            Nová hra
          </button>
        </Modal>
      }
    </>
  )
}
export default EndModal