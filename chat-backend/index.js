const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

const PORT = 3001
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
