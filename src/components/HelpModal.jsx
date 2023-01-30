import { useState } from "react"
import Modal from "./Modal"

function HelpModal({ setShowModal }) {



  return (
    <Modal setShowModal={setShowModal}>
      <h1 className="mb-2 mt-3">Ako hrať Wordeľ</h1>
      <p className="font-medium">
        Uhádni slovo, máš na to 6 pokusov. Každý pokus musí byť:
      </p>
      <ul className="italic font-medium list-disc ml-4 mb-1.5">
        <li className="font-medium">spisovné, 5-písmenové, bez diakritiky</li>
        <li className="font-medium">podstatné meno, číslovka, citoslovce alebo príslovka</li>
        <li className="font-medium">nominatív singuláru</li>
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
      <span className="italic text-sm font-medium">Písmeno M je v hľadanom slove, a je na správnom mieste</span>
      <div className='flex mb-1 mt-4 gap-1 w-full'>
        <span className="small-unluck-tile">L</span>
        <span className="small-unluck-tile">A</span>
        <span className="small-unluck-tile">M</span>
        <span className="small-yellow-tile">P</span>
        <span className="small-unluck-tile">A</span>
      </div>
      <span className="italic text-sm font-medium">Písmeno P je v hľadanom slove, ale na inom mieste</span>
      <div className='flex mb-1 mt-4 gap-1 w-full'>
        <span className="small-unluck-tile">M</span>
        <span className="small-unluck-tile">O</span>
        <span className="small-unluck-tile">D</span>
        <span className="small-unluck-tile">E</span>
        <span className="small-unluck-tile">L</span>
      </div>
      <span className="italic text-sm mb-1 font-medium">Ani jedno z týchto písmen sa v hľadanom slove nenachádza</span>
      <span className="italic text-sm translate-y-4 text-neutral-600 mb-3 font-medium">Predokončenie ťahu stlač ENTER.</span>

    </Modal >
  )
}
export default HelpModal