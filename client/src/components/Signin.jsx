import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import generateIcon from "../tools/generateIcon";
import CustomInput from "./CustomInput";
import StateContext from "./StateContext";
import SubpageHeader from "./SubpageHeader";
import { MutatingDots } from 'react-loader-spinner'

const EMPTY_ERR = { message: '', type: '' }
const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

function Signin() {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [errMsg, setErrMsg] = useState(EMPTY_ERR)
  const [password, setPassword] = useState('')
  const [saveLogIn, setSaveLogIn] = useState(false)
  const nicknameRef = useRef('')
  const [, setUser] = useContext(StateContext)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setErrMsg(EMPTY_ERR)
    try {
      if (!email.match(VALID_EMAIL_REGEX))
        throw { message: "tento email nie je validný", type: 'email' }
      if (nickname.length > 16)
        throw { message: "nickname môže mať max 16 znakov", type: 'name' }
      const req = await fetch('wordelgame-api.fly.dev/signin', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": nickname,
          "email": email,
          "password": password,
          "icon": generateIcon()
        })
      })
      const res = await req.json()
      if (!req.ok)
        throw { message: res.message, type: res.type }
      if (saveLogIn) {
        localStorage.setItem('jwt', res.token)
      } else {
        sessionStorage.setItem('jwt', res.token)
      }
      setUser(prev => ({ ...prev, user: res.user }))
      navigate('/')
    } catch (error) {
      setErrMsg(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    nicknameRef.current = document.getElementsByName('nickname')[0]
    nicknameRef.current.focus()
  }, [])

  return (
    <div className="login-wrap">
      <SubpageHeader />
      <h3 className="mb-2 text-xl">Registrácia</h3>
      <form className="flex flex-col items-center gap-3">
        <label htmlFor="email">Nickname</label>
        <CustomInput name="nickname" placeholder="nickname" errMsg={errMsg} type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <label htmlFor="email">Email</label>
        <CustomInput name="email" placeholder="email" errMsg={errMsg} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="email">Heslo</label>
        <CustomInput name="password" placeholder="password" errMsg={errMsg} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="saveUserLogIn">
          <input className="cekboks" name="saveUserLogIn" type="checkbox" value={saveLogIn} onChange={(e) => setSaveLogIn(e.target.checked)} /> Neodhlasuj ma
        </label>
        <p className="h-2 mt-2 font-normal text-red-700">{errMsg.message}</p>
        {loading ?
          <MutatingDots
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor='#4fa94d'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          :
          <button className="btn mt-4" disabled={!email || !password || !nickname} onClick={handleSubmit}>Registrovať sa</button>
        }
      </form>
      <Link to='/login' className="underline text-neutral-400">Prihlásenie</Link>
    </div>
  )
}
export default Signin