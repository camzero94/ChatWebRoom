import React, { createContext, useState, useEffect } from 'react'
import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { getCookies } from '../utils/util'
import User from '../namespaces/User'




export interface IContext {
  //User Page States
  authenticated: boolean
  setAuthenticated: Dispatch<SetStateAction<boolean>>
  user: User.UserType 
  setUser: Dispatch<SetStateAction<User.UserType >>
}

export const Auth_Ctx = createContext<IContext | null>(null)

interface IProps {
  children: React.ReactNode
}

const AuthCtxProvider: React.FC<IProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<User.UserType >({
    userId: '',
    username: '',
    })
  const router = useRouter()

  useEffect(() => {
    const userId = getCookies('userId')
    const username = getCookies('username')

    console.log(userId, username)
    if (userId === '' || userId === undefined) {
      if (window.location.pathname === '/signUp') {
        router.push('/login')
        return
      }
    } else {
      setUser({ userId: userId, username: username })
      setAuthenticated(true)
      router.push('/liveChat')
    }
  }, [authenticated])

  const statesPage = {
    authenticated: authenticated,
    setAuthenticated: setAuthenticated,
    user: user,
    setUser: setUser,
  }

  return <Auth_Ctx.Provider value={statesPage}>{children}</Auth_Ctx.Provider>
}
export default AuthCtxProvider
