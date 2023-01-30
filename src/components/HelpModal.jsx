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
        <li className="font-medium">spisovné 5-písmenové slovo</li>
        <li className="font-medium">podstatné meno, číslovka alebo citoslovce</li>
        <li className="font-medium">nominatív singuláru</li>
      </ul>
      <span>Políčka sa zafarbia podľa toho, ako blízko si k hádanému slovu.</span>
      <br />
      <span>Príklady:</span>
      <div className='flex mb-2 mt-4 gap-1 w-full'>
        <span className="small-green-tile">M</span>
        <span className="small-unluck-tile">A</span>
        <span className="small-unluck-tile">S</span>
        <span className="small-unluck-tile">L</span>
        <span className="small-unluck-tile">O</span>
      </div>
      <span className="italic font-medium">Písmeno M je v hľadanom slove, a je na správnom mieste</span>
      <div className='flex mb-2 mt-4 gap-1 w-full'>
        <span className="small-unluck-tile">L</span>
        <span className="small-unluck-tile">A</span>
        <span className="small-unluck-tile">M</span>
        <span className="small-yellow-tile">P</span>
        <span className="small-unluck-tile">A</span>
      </div>
      <span className="italic font-medium">Písmeno P je v hľadanom slove, ale na inom mieste</span>
      <div className='flex mb-2 mt-4 gap-1 w-full'>
        <span className="small-unluck-tile">M</span>
        <span className="small-unluck-tile">O</span>
        <span className="small-unluck-tile">D</span>
        <span className="small-unluck-tile">E</span>
        <span className="small-unluck-tile">L</span>
      </div>
      <span className="italic font-medium">Ani jedno z týchto písmen sa v hľadanom slove nenachádza</span>
    </Modal >
  )
}
export default HelpModal