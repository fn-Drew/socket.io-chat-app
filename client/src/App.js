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
    <div className='max-w-3xl h-screen m-auto'>

      <div className='flex flex-col justify-between min-h-full'>

        <div className='bg-white p-8 flex max-h-[70vh] overflow-auto flex-col'>
          <ConversationBox yourTexts={yourTexts} messagesEndRef={messagesEndRef} />
          <div className='p-12' ref={messagesEndRef} />
        </div>

        <div className='p-24 justify-center flex'>
          <MessageInput setSentText={setSentText} sendMessage={sendMessage} />
        </div>

        <div className='px-24 justify-center pb-24 flex'>
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

      <div>Connected: {'' + isConnected}</div>

    </div>
  )
}

export default App
