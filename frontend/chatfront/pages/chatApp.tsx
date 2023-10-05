
import { useEffect, useState } from 'react'

export default function ChatApp() {

  const [messages, setMessages] = useState<string[]>([])




  return (
    <div className='flex flex-col justify-center  items-center w-full'>

      <div className='flex flex-col justify-around my-8  flex-grow w-full max-w-2xl  h-full'>

      <div className='flex flex-col mx-4 bg-white shadow-lg rounded-xl overflow-hidden p-16  '>
      Hello
      </div>



        <div className='flex justify-center items-center  md:flex-row px-4 py-2  bg-grey md:mx-4 rounded-md'>
          <div className='flex w-full mr-4 rounded-md border border-blue'>
            <textarea
              placeholder='Type your message here...'
              className='w-full h-10 p-2 rounded-md focus:outline-none'
              style={{ resize: 'none' }}
            />
          </div>

          <div className='flex items-center '>
            <button className='p-2 rounded-md bg-blue-700 text-white'>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
