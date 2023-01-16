const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

io.on('connection', (socket) => {
  socket.on('chat message', (message) => {
    console.log(`message: ${message}`)
  })
})

io.on('connection', (socket) => {
  socket.on('chat message', (message) => {
    io.emit('chat message', message)
  })
})

const PORT = 3001
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
