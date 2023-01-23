import { React, useEffect, useState } from 'react'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

const App = () => {
  const [sentText, setSentText] = useState('')

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

  // useEffect(() => {
  socket.on('receive_message', (message) => {
    setYourTexts([...yourTexts, { message: message.sentText, sent: false }])
    console.log(yourTexts)
  })
  // }, [socket])

  const sendMessage = () => {
    socket.emit('send_message', { sentText })
    setYourTexts([...yourTexts, { message: sentText, sent: true }])
    console.log(yourTexts)
  }

  return (
    <div className='max-w-3xl m-auto'>
      <div>Connected: {'' + isConnected}</div>

      <div>texts array:
        {yourTexts.map((text, i) =>
          <div className={`${text.sent ? 'text-green-500' : 'text-red-500'}`} key={i + 1}>{text.message}</div>
        )}
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

    </div>
  )
}

export default App
