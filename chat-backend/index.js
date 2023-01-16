const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

const PORT = 3001

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})
