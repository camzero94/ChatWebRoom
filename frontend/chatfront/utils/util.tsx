import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'
import { API_URL } from '../constants/constants'



export const getCookies = (key: string) => {
  try {
    const cookies = new Cookies()
    const val = cookies.get(key)
    if (val === undefined) {
      return ''
    }
    return val
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

    console.log("Token",token)

    const cookies = new Cookies()
    //Decode JWT TOKEN
    const decoded: any = jwt(token)
    console.log("decoded",decoded)

    //Set cookie
    cookies.set('userId', decoded.userId)

    //Decode using decodeURIComponent
    cookies.set('username', decoded.username)

    return decoded.sub
  } catch (err) {
    console.log(err)
  }
}


export const asyncFetchLogin = async (email: string, password: string) => {
  const request = new Request(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email: email, password: password }),
  })

  try {
    const res = await fetch(request)
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await res.json()
    const userId = await asyncDecodeUser()
    return { message: 'User succesfully Logged', userId: userId }
  } catch (err) {
    console.log(err)
  }
}
