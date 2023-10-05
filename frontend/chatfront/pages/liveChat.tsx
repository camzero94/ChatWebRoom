import CreateRoomComp from '@/components/CreateRoomComp'
import JoinRoomCompList from '../components/JoinRoomCompList'
import { useState, useEffect } from 'react'
import Room from '../namespaces/Room'
import { v4 as uuidv4 } from 'uuid'
import { API_URL } from '../constants/constants'

  
export default function LiveChat() {


  const [roomName, setRoomName] = useState<string>('')
  const [submited, setSubmited] = useState<boolean>(false)
  const [rooms, setRooms] = useState<Room.RoomType[]>([])

  const handleCreateRoom = async () => {
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
      console.log(data)
      setRooms(data)
    } catch (err) {
      console.log(err)
    }
  }

  const propReq = {
    roomName: roomName,
    setRoomName: setRoomName,
    handleCreateRoom: handleCreateRoom,
  }

  useEffect(() => {
    handleGetRooms()
  }, [submited])

  return (
    <>
      <div className='flex flex-col justify-around my-8 px-4 md:mx-15 w-full h-100 '>
        <JoinRoomCompList rooms={rooms} />
        <CreateRoomComp {...propReq} />
      </div>
    </>
  )
}
