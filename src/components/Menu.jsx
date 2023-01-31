

function Menu({ setShowMenu }) {
  return (
    <div className="modal-bg">
      <button
        className='h-6 absolute right-3 top-5'
        onClick={() => setShowMenu(false)}
      >
        <img src={x} alt="" />
      </button>
      <nav>
      </nav>
    </div>
  )
}
export default Menu