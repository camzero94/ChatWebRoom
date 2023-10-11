import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'
import { API_URL } from '../constants/constants'

export const getCookies =(key: string) => {
  try {
    const cookies = new Cookies()
    const val = cookies.get(key)
    console.log('Key Cookie'+ key, 'Value Cookie '+ val)
    if (val === undefined) {
      return ''
    }
    return val
  } catch (err) {
    console.log(err)
  }
}
export const deleteCookies=(key: string) => {
  try {
    const cookies = new Cookies()
    cookies.remove(key)
    console.log('Key Cookie Deleted'+ key)
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
    } else {
      token = cookie.split('=')[1]
    }

    const cookies = new Cookies()
    //Decode JWT TOKEN
    const decoded: any = jwt(token)

    //Set cookie
    if (decoded && decoded.userId !== '' && decoded.username !== '') {
      cookies.set('userId', decoded.userId)
      //Decode using decodeURIComponent
      cookies.set('username', decoded.username)
      return { userId: decoded.userId, username: decoded.username }
    }
    throw new Error('User Cannot Login, Cannot Set Cookie')
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
    const responseUser = await asyncDecodeUser()
    if (responseUser) {
      return { message: 'User succesfully Logged', username: responseUser.username , userId: responseUser.userId}
    } 
  } catch (err) {
    console.log(err)
  }
}
