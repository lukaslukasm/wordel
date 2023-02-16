import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import StateContext from "./StateContext";
import SubpageHeader from "./SubpageHeader";
import { MutatingDots } from 'react-loader-spinner'


const EMPTY_ERR = { message: '', type: '' }

function Login() {
  const [email, setEmail] = useState('')
  const [errMsg, setErrMsg] = useState(EMPTY_ERR)
  const [password, setPassword] = useState('')
  const [saveLogIn, setSaveLogIn] = useState(false)
  const emailRef = useRef()
  const navigate = useNavigate();
  const [, setUser] = useContext(StateContext)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setErrMsg(EMPTY_ERR)
    try {
      const req = await fetch('wordelgame-api.fly.dev/login', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": email,
          "password": password
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
      setUser(prev => ({ ...prev, language: res.user.language, user: res.user }))
      navigate('/')
    } catch (error) {
      setLoading(false)
      setErrMsg(error)
    }
  }

  useEffect(() => {
    emailRef.current = document.getElementsByName('email')[0]
    emailRef.current.focus()
  }, [])

  return (
    <div className="login-wrap">
      <SubpageHeader />
      <h3 className="mb-2 text-xl">Prihlásenie</h3>
      <form className="flex flex-col items-center gap-3">
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
          <button className="btn mt-4" disabled={!email || !password} onClick={handleSubmit}>Prihlásiť sa</button>
        }

      </form>
      <Link to='/signin' className="underline text-neutral-400">Registrácia</Link>
    </div>
  )
}
export default Login