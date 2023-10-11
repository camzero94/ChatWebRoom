import Message from '../namespaces/Message'
import User from '../namespaces/User'

interface IPropsInputRoom {
  data: Message.MessageType[]
  users: User.UserType[]
}

const ChatBodyComp: React.FC<IPropsInputRoom> = ({ data,users }) => {

  return (
    <div className='overflow-auto focus:overflow-auto flex  h-[500px]  flex-col mx-4 bg-white shadow-lg rounded-xl  p-16 '>
      {data.map((message, index) => {
        if (message.type === 'self') {
          return (
            <div
              key={index}
              className='flex max-w-2xl justify-end  mt-2  text-right  '
            >
              <div className='  bg-blue-700 text-white  px-4 py-1  rounded-md mt-1'>
                {message.content}
              </div>
            </div>
          )
        } else {
          return (
            <div
              key={index}
              className='mt-2 '
            >
              <div className='bg-gray-200 text-dark-secondary px-4 py-1 rounded-md inline-block mt-1'>
                {message.content}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default ChatBodyComp
