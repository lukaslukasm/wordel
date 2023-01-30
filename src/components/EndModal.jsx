import { useEffect, useState } from "react"
import x from '/src/assets/x.svg'
import copy from '/src/assets/copy.svg'
import restart from '/src/assets/restart.svg'
import Modal from "./Modal"

function EndModal({ win, game, statTxt, setAlertMessage, solution }) {
  const [showModal, setShowModal] = useState(false)
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
          <button className='h-6 absolute right-3 top-3' onClick={() => setShowModal(false)}>
            <img src={x} alt="" />
          </button>
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
            No co, dame ešte jedno?
          </span>

          <button className="btn" onClick={() => window.location.reload(true)}>
            Skusim ešte raz no
            <img src={restart} className='h-6 ml-3' />
          </button>
        </Modal>
      }
    </>
  )
}
export default EndModal