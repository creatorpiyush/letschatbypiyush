const express = require('express')
const http = require('http')
const socketio = require('socket.io')

let username;

const app = express()
const server = http.createServer(app)
const io = socketio(server)

let users = {
    'piyush': 'pppp'
}

let socketMap = {

}

app.use('/', express.static(__dirname + '/public'))

io.on('connection', (socket) => {

    console.log('connection', socket.id)

    function login(s, u) {
        s.join(u)
        s.emit('logged_in')
        socketMap[s.id] = u
        console.log(socketMap)
    }

    socket.on('login', (data) => {
        if (users[data.username]) {
            if (users[data.username] == data.password) {
                login(socket, data.username)
            } else {
                socket.emit('login_failed')
            }
        } else {
            users[data.username] = data.password
            login(socket, data.username)
        }
        // console.log(users)
    })

    socket.on('msg_send', (data) => {
        data.from = socketMap[socket.id]
        if (data.to) {
            io.to(data.to).emit('msg_rcvd', data)
        } else {
            socket.broadcast.emit('msg_rcvd', data)
        }
    })


    // socket.on('msg_send', (data) => {
    //     // console.log('received ', data.msg)// ! test command
    //     // socket.emit('msg_rcvd', data) // ! send data in only for same window (ie. work on same socket)
    //     // socket.broadcast.emit('msg_rcvd', data) // ! send data of other pages except for that
    //     io.emit('msg_rcvd', data) // ! send data of all the server
    // })

})



server.listen(4646, () => {
    console.log('server started on http://localhost:4646')
})