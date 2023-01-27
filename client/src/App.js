import { React, useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import ConversationBox from './components/render/ConversationBox'
import PinScrollBottom from './components/PinScrollBottom'
import MessageInput from './components/render/MessageInput'
const socket = io.connect('http://localhost:3001')

const App = () => {
  const [sentText, setSentText] = useState('')
  const [username, setUsername] = useState('')
  const [yourTexts, setYourTexts] = useState([])
  const [isConnected, setIsConnected] = useState(socket.connected)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })
    socket.on('disconnect', () => {
      setIsConnected(false)
    })
    return () => {
      console.log(isConnected)
      socket.off('connect')
      socket.off('disconnect')
      socket.off('pong')
    }
  }, [])

  // useEffect(() => {
  //   console.log(yourTexts)
  // }, [yourTexts])

  // useEffect(() => {
  socket.on('receive_message', (message, fromUser) => {
    setYourTexts([...yourTexts, { message: message.sentText, sent: false, toUser: username, fromUser: message.username }])
    PinScrollBottom(messagesEndRef)
  })
  // }, [socket, yourTexts])

  const sendMessage = () => {
    socket.emit('send_message', { sentText, username })
    setYourTexts([...yourTexts, { message: sentText, sent: true, toUser: username }])
    PinScrollBottom(messagesEndRef)
  }

  const updateUsername = () => {
    socket.emit('update_username', username)
    console.log(username)
  }

  return (
    <div className='max-w-3xl flex flex-col h-[100dvh] m-auto'>

      <div className='flex text-xl justify-between bg-black text-white px-4 py-4 items-center'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
        <div>
          room: xJU7sH6aPjD4
        </div>

        <div className='flex'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

      </div>

      <div className='grow flex max-h-full overflow-auto flex-col'>
        <ConversationBox yourTexts={yourTexts} messagesEndRef={messagesEndRef} />
        <div className='p-16' ref={messagesEndRef} />
      </div>

      <div className='justify-center p-10 border-t-4 border-black flex'>
        <MessageInput setSentText={setSentText} sendMessage={sendMessage} />
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
