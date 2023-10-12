import { useEffect, useContext, useState, useRef } from 'react'
import Message from '../namespaces/Message'
import ChatBodyComp from '../components/ChatBodyComp'
import { Websocket_Ctx } from '../store/websocketContext'
import { WebContext } from '../store/websocketContext'
import { useRouter } from 'next/router'
import User from '../namespaces/User'
import { API_URL } from '@/constants/constants'

import { Auth_Ctx, IContext } from '../store/context'

export default function ChatApp() {
  const textRef = useRef<HTMLTextAreaElement | null>(null)
  const { conn } = useContext(Websocket_Ctx) as WebContext
  const { user } = useContext(Auth_Ctx) as IContext
  const [messages, setMessages] = useState<Message.MessageType[]>([])
  const [users, setUsers] = useState<User.UserType[]>([])

  const router = useRouter()

  const handleSendMess = () => {
    //Check if text is empty
    if (!textRef.current?.value) return
    //Check Connection
    if (!conn) {
      console.log('Send connn good')
      router.push('/liveChat')
      return
    }
    conn.send(textRef.current?.value)
    textRef.current.value = ''
  }

  //Get Users in the room
  useEffect(() => {
    if (conn === null) {
      router.push('/liveChat')
      return
    }
    //Get Room ID from URL
    const roomId = conn.url.split('/')[5].split('?')[0]
    async function handleGetUsers() {
      try {
        const req = new Request(`${API_URL}/ws/getClients/${roomId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const res = await fetch(req)
        if (!res.ok) {
          throw new Error(
            'Network response was not ok. Could not Get User Information Data'
          )
        }

        const data = await res.json()
        if (data) {
          console.log('Data Get Users', data)
          setUsers(data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    handleGetUsers()
  }, [])

  //Handle websocket messages
  useEffect(() => {
    if (conn === null) {
      router.push('/liveChat')
      return
    }

    //Check Message on join new User to the websocket connection
    conn.onmessage = (mssg) => {
      const m: Message.MessageType = JSON.parse(mssg.data)
      console.log('Enter onmessage Mess====>', m.content)

      //If new user joined the room
      if (m.content == `${m.username} joined room`) {
        console.log('New User Joined', m)
        setUsers([...users, { username: m.username, userId: m.clientId }])
      }
      //If user left the room
      if (m.content == `${m.username} has left the room`) {
        console.log('User Left', m)
        const remainUsers = [
          ...users.filter((user) => {
            user.username != m.username
          }),
        ]
        console.log('Remain Users', remainUsers)
        setUsers(remainUsers)
        setMessages([...messages, m])
      }
      //Check if the message is from the current user
      user?.username == m.username ? (m.type = 'self') : (m.type = 'recv')
      setMessages([...messages, m])
    }

    conn.onopen = (e) => {
      console.log('Open Websocket', e)
    }
    conn.onclose = (e) => {
      console.log('Close Websocket', e)
    }
    conn.onerror = (e) => {
      console.log('Error', e)
    }
  }, [messages, users, conn, textRef, conn?.readyState])

  console.log('Users', users)
  console.log('Messages', messages)
  console.log('State Websocket', conn?.readyState)
  return (
    <div className='flex flex-col justify-center  items-center w-full '>
      <div className='flex flex-col justify-center my-8  flex-grow w-full max-w-2xl  '>
        <ChatBodyComp data={messages} users={users} />
        <div className='flex mt-8 justify-center items-center  md:flex-row px-4 py-2  bg-grey md:mx-4 rounded-md'>
          <div className='flex w-full mr-4 rounded-md border border-blue'>
            <textarea
              placeholder='Type your message here...'
              className='w-full h-10 p-2 rounded-md focus:outline-none'
              style={{ resize: 'none' }}
              ref={textRef}
            />
          </div>

          <div className='flex items-center '>
            <button
              className='p-2 rounded-md bg-blue-700 text-white'
              onClick={() => handleSendMess()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
