import { React, useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

const App = () => {
  const [sentText, setSentText] = useState('')
  const [username, setUsername] = useState('')

  const [yourTexts, setYourTexts] = useState([])

  const [isConnected, setIsConnected] = useState(socket.connected)

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

  const pinScrollBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
  }

  useEffect(() => {
    console.log(yourTexts)
  }, [yourTexts])

  // useEffect(() => {
  socket.on('receive_message', (message, fromUser) => {
    setYourTexts([...yourTexts, { message: message.sentText, sent: false, toUser: username, fromUser: message.username }])
    pinScrollBottom()
  })
  // }, [socket, yourTexts])

  const sendMessage = () => {
    socket.emit('send_message', { sentText, username })
    setYourTexts([...yourTexts, { message: sentText, sent: true, toUser: username }])
    pinScrollBottom()
  }

  const updateUsername = () => {
    socket.emit('update_username', username)
    console.log(username)
  }

  const messagesEndRef = useRef(null)

  return (
    <div className='max-w-3xl p-12 py-24 h-screen m-auto'>

      <div className='flex flex-col justify-between rounded-3xl px-4 border-black border-4 min-h-full'>

        <div className='bg-white p-8 flex max-h-[70vh] overflow-auto flex-col'>
          {yourTexts.map((text, i) => {
            return (
              <div key={i + 1} className={`${text.sent ? 'text-black bg-white p-4 m-4 self-end border-2 border-black rounded-3xl' : 'text-white  bg-black p-4 m-4 self-start rounded-3xl'} `}>
                <div> {text.fromUser} </div>
                <div key={i + 1}>{text.message}</div>
              </div>
            )
          }
          )}
          <div className='p-6' ref={messagesEndRef} />
        </div>

        <div className='p-24 flex'>
          <input
            placeholder='message...'
            onInput={(event) => setSentText(event.target.value)}
            className='basis-3/4 p-4 border-2 border-black rounded-l-full'
          />
          <button
            onClick={sendMessage}
            className='basis-1/4 text-xl bg-black -translate-x-10 text-white rounded-full min-w-[4.5rem]'
          >
            Send
          </button>
        </div>

        <div className='px-24 pb-24 flex'>
          <input
            placeholder='username...'
            onInput={(event) => setUsername(event.target.value)}
            className='basis-3/4 p-4 border-2 border-black rounded-l-full'
          />
          <button
            onClick={updateUsername}
            className='basis-1/4 text-xl bg-black -translate-x-10 text-white rounded-full min-w-[4.5rem]'
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
