import { React, useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import ConversationBox from './components/render/ConversationBox'
import PinScrollBottom from './components/PinScrollBottom'
import MessageInput from './components/render/MessageInput'

const CLIENT_URL = 'http://localhost:3001'
const socket = io.connect(CLIENT_URL)

const App = () => {
  const [sentMessage, setSentMessage] = useState('')
  const [username, setUsername] = useState('')
  const [totalMessages, setTotalMessages] = useState([])
  const [group, setGroup] = useState('')
  const [isConnected, setIsConnected] = useState(socket.connected)
  const messagesEndRef = useRef(null)

  const sendMessage = () => {
    socket.emit('send_message', { sentMessage, username })
    setTotalMessages([...totalMessages, { message: sentMessage, sent: true, toUser: username }])
    PinScrollBottom(messagesEndRef)
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

  const handleGroupInput = (event) => {
    setGroup(event.target.value)
  }

  return (
    <div className='max-w-3xl flex flex-col h-[100dvh] m-auto'>

      <div className='flex text-xl justify-around bg-black text-white px-4 py-4 items-center'>

        <div className='flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 -ml-8 translate-x-12 text-black">
            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
          </svg>
          <textarea
            className='rounded-full p-2 text-black text-center'
            rows={1}
            spellCheck={false}
            value={group}
            onInput={handleGroupInput}
          />
        </div>

        <div className='flex'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      <div className='grow flex max-h-full overflow-auto flex-col'>
        <ConversationBox totalMessages={totalMessages} messagesEndRef={messagesEndRef} />
        <div className='p-16' ref={messagesEndRef} />
      </div>

      <div className='justify-center p-10 border-t-4 border-black flex'>
        <MessageInput setSentMessage={setSentMessage} sendMessage={sendMessage} />
      </div>

      <div className='justify-center hidden flex'>
        <input
          placeholder='username...'
          onInput={(event) => setUsername(event.target.value)}
          className='basis-3/4 p-4 border-2 border-black rounded-l-full'
        />
        <button
          onClick={updateUsername}
          className='basis-1/4 text-xl bg-black -translate-x-10 text-white rounded-full'
        >
          Update
        </button>
      </div>

    </div>
  )
}

export default App
