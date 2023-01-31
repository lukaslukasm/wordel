import Modal from "./Modal"
import enter from '../assets/enter.png'

function HelpModal({ setShowModal }) {

  return (
    <Modal setShowModal={setShowModal}>
      <h1 className="mb-2 mt-3">Ako hrať Wordeľ</h1>
      <p className="font-bold w-full">
        Uhádni slovo, máš 6 pokusov. Validný pokus je:
      </p>
      <ul className="italic font-normal list-disc ml-4 mb-1.5">
        <li className="font-normal">podstatné meno, číslovka, citoslovce alebo príslovka</li>
        <li className="font-normal">spisovné, 5-písmenové, bez diakritiky</li>
        <li className="font-normal">nominatív singuláru</li>
      </ul>
      <span className="mb-2">Políčka sa zafarbia podľa toho, ako blízko si k hádanému slovu.</span>
      <span>Príklady:</span>
      <div className='flex mb-1 mt-4 gap-1 w-full'>
        <span className="small-green-tile">M</span>
        <span className="small-unluck-tile">A</span>
        <span className="small-unluck-tile">S</span>
        <span className="small-unluck-tile">L</span>
        <span className="small-unluck-tile">O</span>
      </div>
      <span className="italic text-sm font-normal">Písmeno M je v hľadanom slove, a je na správnom mieste</span>
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
      <span className="italic text-sm mb-1 font-normal">Ani jedno z týchto písmen sa v hľadanom slove nenachádza</span>
      <span
        className="text-sm translate-y-4 text-neutral-600 mb-3"
      >
        Pre dokončenie ťahu stlač
        <img src={enter} alt="" className="inline-block bg-white rounded-sm ml-2 mb-0.5 w-6 opacity-20" />
      </span>

    </Modal >
  )
}
export default HelpModal