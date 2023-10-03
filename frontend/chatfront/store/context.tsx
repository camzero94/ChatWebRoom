import React, { createContext, useState, useEffect } from 'react'
import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { getCookies } from '../utils/util'

export interface IContext {
  //User Page States
  authenticated: boolean
  setAuthenticated: Dispatch<SetStateAction<boolean>>
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
}

export const Auth_Ctx = createContext<IContext | null>(null)

interface IProps {
  children: React.ReactNode
}

const AuthCtxProvider: React.FC<IProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const userId = getCookies('userId')
    if (userId === '' || userId === undefined) {
      if (window.location.pathname === '/signUp') {
        router.push('/login')
        return
      }
    } else {
      setUserId(userId)
      setAuthenticated(true)
      router.push('/liveChat')
    }
  }, [authenticated])

  const statesPage = {
    authenticated: authenticated,
    setAuthenticated: setAuthenticated,
    userId: userId,
    setUserId: setUserId,
  }

  return <Auth_Ctx.Provider value={statesPage}>{children}</Auth_Ctx.Provider>
}
export default AuthCtxProvider
