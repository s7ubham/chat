const express = require("express");
const io = require('socket.io')(8500, {
    cors: {
        origin: '*'
    }
});

const users = {};
const app = express();
app.use(express.static('public'));

// Start client on different server
client = require('http').createServer(app)
client.listen(5500)

io.on('connection', socket => {
    socket.on('new-user-joined', username => {
        users[socket.id] = username;
        socket.broadcast.emit('user-joined', username);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, username: users[socket.id]});
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', {username: users[socket.id]});
        delete users[socket.id];
    });
});


