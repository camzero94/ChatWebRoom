import CreateRoomComp from '@/components/CreateRoomComp'
import JoinRoomCompList from '../components/JoinRoomCompList'
import { useState, useEffect, useContext } from 'react'
import Room from '../namespaces/Room'
import { v4 as uuidv4 } from 'uuid'
import { WS_API_URL, API_URL } from '../constants/constants'
import { Websocket_Ctx, WebContext } from '../store/websocketContext'
import { useRouter } from 'next/router'
import { deleteCookies } from '../utils/util'

export default function LiveChat() {
  const [roomName, setRoomName] = useState<string>('')
  const [submited, setSubmited] = useState<boolean>(false)
  const [rooms, setRooms] = useState<Room.RoomType[]>([])
  const { conn, setConn } = useContext(Websocket_Ctx) as WebContext
  const router = useRouter()

  const handleLogOut = async () => {
    deleteCookies('Authorization')
    deleteCookies('username')
    deleteCookies('userId')
    router.push('/login')
  }
  const handleDeleteRoom = async (roomID: string, roomName: string) => {
    try {
      const request = new Request(
        `${API_URL}/ws/deleteRoom?roomId=${roomID}&roomName=${roomName}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const res = await fetch(request)
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await res.json()
      if (data) {
        console.log(data)
        setSubmited(!submited)
      } else {
        console.log('Error Serializing JSON')
      }
    } catch (err) {}
  }

  const handleJoinRoom = async (
    roomID: string,
    username: string,
    userID: string
  ) => {
    try {
      const ws = new WebSocket(
        `${WS_API_URL}/ws/joinRoom/${roomID}?username=${username}&userID=${userID}`
      )
      if (ws.onerror) {
        ws.close()
        throw new Error('Network response was not ok')
      }
      if (ws.OPEN) {
        console.log('Connection established')
        setConn(ws)
        router.push(`/chatApp`)
      }
      if (ws.CLOSED) {
        console.log('Connection closed')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleCreateRoom = async () => {
    if (roomName !== 'undefined' && roomName !== '') {
      const reqCreateRoom = new Request(`${API_URL}/ws/createRoom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: uuidv4(), name: roomName }),
      })

      try {
        const res = await fetch(reqCreateRoom)
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await res.json()
        console.log(data)
        setSubmited(!submited)
        setRoomName('')
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleGetRooms = async () => {
    const reqCreateRoom = new Request(`${API_URL}/ws/getRooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    try {
      const res = await fetch(reqCreateRoom)
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      const data: Room.RoomType[] = await res.json()
      console.log('Rooms', data)
      setRooms(data)
    } catch (err) {
      console.log(err)
    }
  }

  const propReq = {
    roomName: roomName,
    setRoomName: setRoomName,
    handleCreateRoom: handleCreateRoom,
    handleLogOut: handleLogOut,
  }
  const propsJoinRoom = {
    rooms: rooms,
    joinRoom: handleJoinRoom,
    deleteRoom: handleDeleteRoom,
  }

  useEffect(() => {
    handleGetRooms()
  }, [submited])

  return (
    <>
      <div className='flex flex-col justify-around my-8 px-4 md:mx-15 w-full '>
        <JoinRoomCompList {...propsJoinRoom} />
        <CreateRoomComp {...propReq} />
      </div>
    </>
  )
}
