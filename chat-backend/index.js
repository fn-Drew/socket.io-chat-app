const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const server = http.createServer(app)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

const PORT = 3001

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
