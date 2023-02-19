import { useState, useEffect, useLayoutEffect } from "react"
import getUserInfo from "../tools/getUserInfo"
import StateContext from "./StateContext"
import usePrevious from "../hooks/usePrevious"

function StateContextProvider({ children }) {

  const [state, setState] = useState({
    language: 'sk',
    user: null,
    isStatsOpen: false,
    isHelpOpen: false,
  })

  const prevUser = usePrevious(state.user)

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem('jwt') !== null || sessionStorage.getItem('jwt') !== null) {
        let user
        if (localStorage.getItem('jwt') !== null)
          user = await getUserInfo(localStorage.getItem('jwt'))
        else
          user = await getUserInfo(sessionStorage.getItem('jwt'))
        setState(prev => ({ ...prev, language: user.language, user }))
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (state.user === null)
      return
    if (prevUser === null)
      return
    const updateUser = async () => {
      try {
        let jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt')
        const req = await fetch(import.meta.env.VITE_API_URL + `/api/user/${state.user.id}`, {
          method: 'PUT',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...state.user, language: state.language })
        })
        if (!req.ok)
          throw new Error('Error updating the user.')
      } catch (error) {
        console.log(error.message)
      }
    }
    updateUser()
  }, [state.user, state.language])

  return (
    <StateContext.Provider value={[state, setState]}>
      {children}
    </StateContext.Provider>
  )
}

export default StateContextProvider