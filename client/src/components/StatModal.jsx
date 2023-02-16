import { useContext, useEffect, useState } from "react"
import copy from '/src/assets/copy.svg'
import restart from '/src/assets/restart.svg'
import Modal from "./Modal"
import Chart from "./Chart"
import StateContext from "./StateContext"
import { Link } from 'react-router-dom'

function StatModal({ statTxt, setAlertMessage, setIsStatsOpen }) {
  const [state,] = useContext(StateContext)

  // const stats = `
  // Wordeľ         
  // ${win ? statTxt.length : 'X'}/6${'\n'}
  // ${statTxt.map((item, i) =>
  //   i % 5 === 4 ? `${item}\n` : item).join('')
  //   }`

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
      <Modal setShowModal={setIsStatsOpen}>
        <h2 className="mt-3 mb-2">
          Štatistiky
        </h2>
        <div className="w-full">
          {state.user ?
            (
              <div className="w-full">
                <div className="flex w-full mb-6 justify-around">
                  <span className="flex flex-col items-center">
                    <p className="kategoria">Odohrané Hry</p>
                    <p className=" text-5xl">
                      {state.user.nOfGames}
                    </p>
                  </span>
                  <span className="flex flex-col items-center">
                    <p className="kategoria">Úspešnosť</p>
                    <p className="text-5xl">
                      {Math.floor((state.user.nOfWins / state.user.nOfGames) * 100)}%
                    </p>
                  </span>
                </div>
                <p className="kategoria text-center">Distribúcia výherných ťahov</p>
                <Chart />
              </div>
            ) : (
              <div className='rounded-xl mx-3 px-3 mt-4 mb-6 py-6'>
                <p className='italic mb-2 w-full text-center'>
                  Registruj sa a získaj možnosť zobrazenia osobných štatistík!
                </p>
                <div className="flex justify-center w-full gap-4">
                  <Link to='/login' className="menu-btn" >Prihlásiť</Link>
                  <Link to='/signin' className="menu-btn" >Registrovať</Link>
                </div>
              </div>
            )
          }
        </div>
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

        <button className="btn" onClick={() => alert('TODO poriesit')}>
          Nová hra
        </button>
      </Modal>
    </>
  )
}
export default StatModal