async function getUserInfo(jwt) {

  const [, details,] = jwt.split('.')
  const id = JSON.parse(atob(details)).id
  let res
  try {
    const req = await fetch(import.meta.env.VITE_API_URL + `/api/user/${id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
    res = await req.json()
    if (!req.ok)
      throw new Error('error getting user from database')
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}
export default getUserInfo