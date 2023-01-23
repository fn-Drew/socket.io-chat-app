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
    <div className='max-w-3xl p-12 py-24 h-screen m-auto'>

      <div className='flex-col justify-around rounded-3xl p-4 border-black border-4 min-h-full'>

        <div className='bg-white p-8 flex flex-col'>
          {yourTexts.map((text, i) =>
            <div className={`${text.sent ? 'text-black bg-white p-4 m-4 self-end border-2 border-black rounded-3xl' : 'text-white  bg-black p-4 m-4 self-start rounded-3xl'} `} key={i + 1}>{text.message}</div>
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

      <div>Connected: {'' + isConnected}</div>

    </div>
  )
}

export default App
