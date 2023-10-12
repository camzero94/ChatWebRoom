
import React, { createContext, useState, useEffect } from 'react'
import { Dispatch, SetStateAction } from 'react'

export interface WebContext {
  //Websocket Connections
  conn: WebSocket | null
  setConn: Dispatch<SetStateAction<WebSocket | null>>
}

export const Websocket_Ctx = createContext<WebContext  | null>(null)


interface IProps {
  children: React.ReactNode
}

const WebCtxProvider: React.FC<IProps> = ({ children }) => {
  const [conn, setConn] = useState<WebSocket | null>(null)

  const statesPage = {
    conn: conn,
    setConn: setConn,
  }

  return <Websocket_Ctx.Provider value={statesPage}>{children}</Websocket_Ctx.Provider>
}
export default WebCtxProvider
