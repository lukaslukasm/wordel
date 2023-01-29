import { useEffect, useState } from "react"
import x from '/src/assets/x.svg'
import share from '/src/assets/share.svg'
import restart from '/src/assets/restart.svg'

function Modal({ win, game, statTxt, setAlertMessage }) {
  const [showModal, setShowModal] = useState(false)

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
        ${win ? statTxt.length : 'x'}/6${'\n\n'}
        ${statTxt.map((item, i) =>
      i % 5 === 4 ? `${item}\n` : item).join('')
      }`
    if (navigator.canShare())
      await navigator.share(content);
    else {
      navigator.clipboard.writeText(content)
      setAlertMessage('Skopírované')
    }
  }

  return (
    <>
      {showModal &&
        <div
          className="absolute inset-0 z-40 flex justify-center items-center
                   backdrop-blur-sm w-screen "
        >
          <div className="bg-neutral-900 w-[min(100vw,400px)] flex drop-shadow-2xl relative rounded-xl p-4 flex-col justify-center items-center">
            <h2 className="mt-3">
              {win ? 'Si zabil!' : 'Slaby kus'}
            </h2>

            <button className='h-6 absolute right-3 top-3' onClick={() => setShowModal(false)}>
              <img src={x} alt="" />
            </button>
            <span className='text-center text-sm mt-3'>
              {win ?
                "Pochval še dakemu"
                :
                "Pošli dakemu naj poplače stebu"
              }
            </span>
            <button className="btn-share" onClick={shareHandler}>
              Zdieľaj výsedok
              <img src={share} className='mt-0.5 ml-3' />
            </button>
            <hr className="my-3 border-px border-[#f0f0f0] w-full" />
            <span className='text-neutral-600 mt-2'>
              No co, dame ešte jedno?
            </span>

            <button className="btn" onClick={() => window.location.reload(true)}>
              Skusim ešte raz no
              <img src={restart} className='h-6 ml-3' />
            </button>

          </div>
        </div>
      }
    </>
  )
}
export default Modal