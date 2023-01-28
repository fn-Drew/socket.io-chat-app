const cors = require('cors')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const CLIENT_URL = 'http://localhost:3000'
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST']
  }
})

app.use(cors)

io.on('connection', (socket) => {
  console.log(`[Connect] ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`[Disconnect] ${socket.id}`)
  })

  socket.on('send_message', (message) => {
    console.log('Message sent')
    console.log('Message: ', message)
    socket.broadcast.emit('receive_message', message)
  })

  socket.on('update_username', (username) => {
    socket.username = username
    console.log(`[Username Update] ${username} ${socket.id}`)
    console.log(socket.username)
  })
})

const PORT = 3001
server.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`)
})
