import { React, useEffect, useState } from 'react'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

const App = () => {
  const [text, setText] = useState('')
  const [textSent, setTextSent] = useState('')
  const [textReceived, setTextReceived] = useState('')
  const [isConnected, setIsConnected] = useState(socket.connected)

  const sendMessage = () => {
    socket.emit('send_message', { text })
    setTextSent(text)
  }

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

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setTextReceived(message.text)
    })
  }, [socket])

  return (
    <div className='max-w-3xl m-auto'>
      <div>Connected: {'' + isConnected}</div>
      <div className='p-24 flex'>
        <input
          placeholder='message...'
          onChange={(event) => setText(event.target.value)}
          className='basis-3/4 p-4 border-2 border-black rounded-l-full'
        />
        <button
          onClick={sendMessage}
          className='basis-1/4 text-xl bg-black -translate-x-10 text-white rounded-full min-w-[4.5rem]'
        >
          Send
        </button>
      </div>
      <div>received texts:</div>
      {textReceived}
      <div>sent texts:</div>
      {textSent}
    </div>
  )
}

export default App
