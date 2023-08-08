const {Server} = require("socket.io");
const express = require("express");
const {createServer} = require("http");
const app = express();
const server = createServer(app)

const io = new Server(server, {
    cors: {origin: '*'},

})

io.on('connection', (socket) => {
    console.log('Connection ')

    // escuchamos el evento `message`
    socket.on('notification', (data) => {

        console.log(data)

        io.emit('client', {data})


        // socket.broadcast.emit(`send-notification`, data)
        // socket.emit('notificationReceived', { message: 'Notificación recibida', data: data});

//         // guardamos el mensaje en nuestra "DB"
//         messages.push(data)
//         // enviamos el mensaje a todos los usuarios menos a quién los envió
//         socket.broadcast.emit('message', data)

    })
})

server.listen(4000, () => {
    console.log("server running on port 4000")
})


