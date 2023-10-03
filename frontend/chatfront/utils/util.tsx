import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'

export const getCookies = (key: string) => {

  try {
    const cookies = new Cookies()
    const val = cookies.get(key)
    if (val === undefined) {
      return ''
    }
    return  val 
  } catch (err) {
    console.log(err)
  }
}
export const asyncDecodeUser = async () => {
  try {
    let cookie = document.cookie
    let token = ''
    if (cookie.includes(';')) {
      token = cookie.split(';')[1].split('=')[1]
      console.log(token, 'Inside')
    } else {
      token = cookie.split('=')[1]
    }

    const cookies = new Cookies()
    //Decode JWT TOKEN
    const decoded: any = jwt(token)
    //Set cookie
    cookies.set('userId', decoded.sub)

    return decoded.sub
  } catch (err) {
    console.log(err)
  }
}

export const asyncFetchLogin = async (email: string, password: string) => {
  const request = new Request('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email: email, password: password }),
  })

  try {
    const res = await fetch(request)
    const data = await res.json()
    const userId = await asyncDecodeUser()
    return { message: 'User succesfully Logged', userId: userId }
  } catch (err) {
    console.log(err)
  }
}
