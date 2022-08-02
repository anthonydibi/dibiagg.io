const http = require('http')
const express = require('express')
const app = express()
app.set('port', '8001')
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.sockets.on('connection', (socket) => {
    console.log('Client connected: ' + socket.id)
    socket.on('line', (data) => { console.log(data); socket.broadcast.emit('line', data) })
    socket.on('disconnect', () => console.log('Client has disconnected'))
})

server.on('listening', () => {
 console.log('Listening on port 8001')
})
server.listen('8001')