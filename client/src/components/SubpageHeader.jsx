import { Link } from "react-router-dom";
import arrow from '../assets/arrow.svg'

function SubpageHeader() {
  return (
    <>
      <div className="w-full mt-5 pl-2 flex">
        <Link
          to='/'
          className="bg-white back-link transition-colors bg-opacity-0 hover:bg-opacity-5 justify-start rounded-md pl-2 pr-4 h-9 flex items-center text-neutral-400"
        >
          <img src={arrow} className='rotate-180 invert opacity-60 w-5 mr-2' alt='' />
          Späť</Link>
      </div>
      <h1 className="my-7 text-5xl">Wordeľ</h1>
    </>
  )
}
export default SubpageHeader