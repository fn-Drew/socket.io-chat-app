import { React, useEffect, useState } from 'react'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

const App = () => {
  const [text, setText] = useState('')
  const [textSent, setTextSent] = useState('')
  const [textReceived, setTextReceived] = useState('')
  const sendMessage = () => {
    socket.emit('send_message', { text })
    setTextSent(text)
  }

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setTextReceived(message.text)
    })
  }, [socket])

  return (
    <div>
      <input
        placeholder='message...'
        onChange={(event) => setText(event.target.value)}
      />
      <button onClick={sendMessage}> Send</button>
      <div>received texts:</div>
      {textReceived}
      <div>sent texts:</div>
      {textSent}
    </div>
  )
}

export default App
