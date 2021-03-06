const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = require('http').createServer(app)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.get('/', (req, res)=> {
    res.render('index')
})

server.listen(process.env.PORT || 3000, () => {
    console.log("server is running")
})

//initialize socket for the server
const io = socketio(server)

io.on('connection', socket => {
    console.log("New user connected")
})

io.on('connection', socket => {
    console.log("New user connected")
    
    //Default username is Anonymous
    socket.username = "Anonymous"
    
    //event to change usename
    socket.on('change_username', data => {
        socket.username = data.username
    })
    
   //handle the new message event
    socket.on('new_message', data => {
        console.log("new message")
        io.sockets.emit('receive_message', {message: data.message, username: socket.username})
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', {username: socket.username})
    })

})
