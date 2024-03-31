import Room from '../namespaces/Room'
import Image from 'next/image'
import { Auth_Ctx, IContext } from '../store/context'

import { useContext } from 'react'
import { WebContext, Websocket_Ctx } from '../store/websocketContext'
import { useRouter } from 'next/router'

import { imageLoader } from '../utils/util'

interface PropsRooms {
  rooms: Room.RoomType[]
  joinRoom: (roomID: string, username: string, userID: string) => void
  deleteRoom: (roomID: string, roomName: string) => void
}

const JoinRoomCompList: React.FC<PropsRooms> = ({ rooms, joinRoom,deleteRoom }) => {
  const { user } = useContext(Auth_Ctx) as IContext
  //Connect Websocket
  const { conn, setConn } = useContext(Websocket_Ctx) as WebContext
  const router = useRouter()

  return (
    <div className='mt-6  '>
      <div className='flex flex-row justify-center content-center items-center'>
        <div className='flex  font-bold text-xl'>Aviable Rooms</div>
        <span className='ml-2'>
          <Image 
          loader={imageLoader}
          src={'strawberry.png'} alt='stwb' width={35} height={35} />
        </span>
      </div>

      <div className='   grid grid-cols-2 md:grid-cols-5 gap-8 mt-6 px-4'>
        {rooms.map((room, index) => (
          <div
            key={index}
            className=' transition-transform transform hover:scale-110 flex flex-col justify-center items-center border border-blue p-4  rounded-md w-full'
          >
            <div className='flex flex-col items-center justify-center w-full mb-2'>
              <div className='text-sm'>RoomID</div>
              <div className='text-blue font-bold text-md'>{room.name}</div>
            </div>
            <div
             className='flex 2xl:flex-row md:flex-col  items-center justify-around w-full mb-2'
            >
            <button
              className='md:m-1 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50  text-md px-4 bg-blue-700 border rounded-md text-white '
              onClick={() => joinRoom(room.id, user.username, user.userId)}
            >
              Join 
            </button>
            <button
              className=' md:m-1 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50  text-md px-4 bg-blue-700 border rounded-md text-white'
              onClick={() => deleteRoom(room.id,room.name)}
            >
              Delete 
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JoinRoomCompList
