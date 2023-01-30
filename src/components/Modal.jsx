import x from '/src/assets/x.svg'

function Modal({ setShowModal, children }) {

  return (
    <div
      className="modal-bg"
    >
      <div className="modal">
        <button
          className='h-6 absolute right-3 top-3'
          onClick={() => setShowModal(false)}
        >
          <img src={x} alt="" />
        </button>
        {children}
      </div>
    </div>
  )
}
export default Modal