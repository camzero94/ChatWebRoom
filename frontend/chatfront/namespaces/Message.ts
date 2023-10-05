
namespace Message{
  export interface MessageType {
    content: string 
    clientId: string
    username: string
    roomId: string
    type: 'recv' | 'self'

  }
}

export default Message 
