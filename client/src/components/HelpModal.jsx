import Modal from "./Modal"
import enter from '../assets/enter.png'

function HelpModal({ setShowModal }) {

  return (
    <Modal setShowModal={setShowModal}>
      <h1 className="mb-2 mt-3">Ako hrať Wordeľ</h1>
      <div className="h-full px-1 overflow-x-visible w-full overflow-y-scroll pb-4 flex flex-col">
        <p className="font-bold w-full">
          Uhádni slovo, máš na to 6 pokusov. Validný pokus je pre hru v slovenskom jazyku:
        </p>
        <ul className="italic font-normal list-disc ml-4 mb-1.5">
          <li className="font-normal">slovo spisovné bez diakritiky</li>
          <li className="font-normal">o dĺžke práve 5 písmen</li>
          <li className="font-normal">nominatív singuláru</li>
          <li className="font-normal">slovný druh: všetko okrem slovies</li>
        </ul>
        <p className="font-bold w-full">
          Pre hru v anglickom jazyku:
        </p>
        <ul className="italic font-normal list-disc ml-4 mb-1.5">
          <li className="font-normal">spisovné slovo o dĺžke 5 písmen</li>
        </ul>
        <span className="mb-2">Políčka sa zafarbia podľa toho, ako blízko si k hľadanému slovu.</span>
        <span>Príklady:</span>
        <div className='flex mb-1 mt-2 gap-1 w-full'>
          <span className="small-green-tile">M</span>
          <span className="small-unluck-tile">A</span>
          <span className="small-unluck-tile">S</span>
          <span className="small-unluck-tile">L</span>
          <span className="small-unluck-tile">O</span>
        </div>
        <span className="italic text-sm font-normal">Písmeno M je na správnom mieste</span>
        <div className='flex mb-1 mt-4 gap-1 w-full'>
          <span className="small-unluck-tile">L</span>
          <span className="small-unluck-tile">A</span>
          <span className="small-unluck-tile">M</span>
          <span className="small-yellow-tile">P</span>
          <span className="small-unluck-tile">A</span>
        </div>
        <span className="italic text-sm font-normal">Písmeno P je v hľadanom slove, ale na inom mieste</span>
        <div className='flex mb-1 mt-4 gap-1 w-full'>
          <span className="small-unluck-tile">M</span>
          <span className="small-unluck-tile">O</span>
          <span className="small-unluck-tile">D</span>
          <span className="small-unluck-tile">E</span>
          <span className="small-unluck-tile">L</span>
        </div>
        <span className="italic text-sm font-normal">Ani jedno z týchto písmen nie je v hľadanom slove</span>
        <span
          className="text-sm text-center translate-y-3 text-neutral-600 mb-3"
        >
          Pre dokončenie ťahu stlač
          <img src={enter} alt="" className="inline-block bg-white rounded-sm ml-2 mb-0.5 w-5 opacity-20" />
        </span>
      </div>
    </Modal >
  )
}
export default HelpModal