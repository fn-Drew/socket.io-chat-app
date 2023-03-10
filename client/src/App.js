import { React, useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import ConversationBox from './components/render/ConversationBox'
import PinScrollBottom from './components/PinScrollBottom'
import MessageInput from './components/render/MessageInput'
import UsernameInput from './components/render/UsernameInput'

const CLIENT_URL = 'http://localhost:3001'
const socket = io.connect(CLIENT_URL)

const App = () => {
  const [sentMessage, setSentMessage] = useState('')
  const [username, setUsername] = useState('')
  const [totalMessages, setTotalMessages] = useState([])
  const [isConnected, setIsConnected] = useState(socket.connected)
  const messagesEndRef = useRef(null)

  const sendMessage = () => {
    socket.emit('send_message', { sentMessage, username })
    setTotalMessages([...totalMessages, { message: sentMessage, sent: true, toUser: username }])
    PinScrollBottom(messagesEndRef)
    setSentMessage('')
  }

  const updateUsername = () => {
    socket.emit('update_username', username)
    console.log(username)
  }

  // Disconnects all event listeners related to a socket when it disconnects
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
      console.log('Connected: ', isConnected)
    })
    socket.on('disconnect', () => {
      setIsConnected(false)
      console.log('Connected: ', isConnected)
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('pong')
    }
  }, [])

  socket.on('receive_message', (message) => {
    setTotalMessages([...totalMessages, { message: message.sentMessage, sent: false, toUser: username, fromUser: message.username }])
    PinScrollBottom(messagesEndRef)
  })

  return (
    <div className='max-w-3xl flex flex-col h-[100dvh] m-auto'>

      <div className='flex justify-between bg-black text-white px-4 py-4 items-center'>
        <div className='justify-center text-black w-full flex'>
          <UsernameInput setUsername={setUsername} updateUsername={updateUsername} />
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      <div className='grow flex max-h-full overflow-auto flex-col'>
        <ConversationBox totalMessages={totalMessages} messagesEndRef={messagesEndRef} />
        <div className='p-16' ref={messagesEndRef} />
      </div>

      <div className='justify-center p-10 border-t-4 border-black flex'>
        <MessageInput setSentMessage={setSentMessage} sentMessage={sentMessage} sendMessage={sendMessage} />
      </div>

    </div>
  )
}

export default App
