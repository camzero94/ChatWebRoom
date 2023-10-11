import {useState} from 'react'

interface IPropsInputRoom{
  roomName:string
  setRoomName?:React.Dispatch<React.SetStateAction<string>>
  handleCreateRoom:() =>Promise<void>
  handleLogOut:() => void
  }


const CreateRoomComp:React.FC <IPropsInputRoom> = ({roomName,setRoomName,handleCreateRoom,handleLogOut}) => {
   
  return (
      <div className='flex justify-center  content-center  items-center mt-3 p-5'>
        <input
          className='border border-gray p-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent '
          type='text'
          id='Create Room'
          name='Create Room'
          placeholder='Room name'
          value={roomName}
          onChange={(e)=>setRoomName?setRoomName(e.target.value):null}
        />

        <button className=' hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50  bg-blue-700 border rounded-md text-white p-2 md:ml-4 ml-4 '
          onClick={()=>handleCreateRoom()}
        >
          Create Room
        </button>
        <button className=' hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50  bg-blue-700 border rounded-md text-white p-2 md:ml-4 ml-4 '
          onClick={()=>handleLogOut()}
        >
          Log Out
        </button>
      </div>
  )
}

export default CreateRoomComp
