import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'

export const getCookies = (key: string) => {
  try {
    const cookies = new Cookies()
    const val = cookies.get(key)
    console.log('Key Cookie' + key, 'Value Cookie ' + val)
    if (val === undefined) {
      return ''
    }
    return val
  } catch (err) {
    console.log(err)
  }
}
export const deleteCookies = (key: string) => {
  try {
    const cookies = new Cookies()
    cookies.remove(key)
    console.log('Key Cookie Deleted' + key)
  } catch (err) {
    console.log(err)
  }
}
export const asyncDecodeUser = async (token: string) => {
  try {
    const cookie = new Cookies()
    console.log('Tokenaaaa', token)
    if (token && token !== '') {
      console.log('Inside', token)
      //Decode JWT TOKEN
      const decoded: any = jwt(token)
      //Set cookie
      if (decoded && decoded.userId !== '' && decoded.username !== '') {
        cookie.set('userId', decoded.userId)
        //Decode using decodeURIComponent
        cookie.set('username', decoded.username)
        return { userId: decoded.userId, username: decoded.username }
      } else {
        throw new Error('User Cannot Login, Cannot Set Cookie')
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export const asyncFetchLogin = async (email: string, password: string) => {
  console.log(process.env.API_URL)
  const request = new Request(`${process.env.API_URL}/login`, {
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
    console.log('Login Response Data=======', data)
    const responseUser = await asyncDecodeUser(data.token)
    if (responseUser) {
      return {
        message: 'User succesfully Logged',
        username: responseUser.username,
        userId: responseUser.userId,
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export const imageLoader= ({ src, width, quality }:{src?:string,width?:number,quality?:number}) => {
  return `https://mybucketappdeh.s3.ap-northeast-2.amazonaws.com/${src}`
}
 
