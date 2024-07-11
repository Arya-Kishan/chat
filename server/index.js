const express = require('express');
const app = express();
const dotenv = require("dotenv")
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const { Server } = require("socket.io");
dotenv.config({});
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
}))

app.get('/', (req, res) => {
    res.send('arya');
});

let userSocketMap = {};

const getSocketIdByUserId = (userId) => {
    return userSocketMap[userId];
}

io.on('connection', (socket) => {
    console.log('a user connected', socket.handshake.query.userName);

    const userId = socket.handshake.query.userName;
    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
    }

    io.emit("joined", socket.handshake.query.userName)

    io.emit("onlineUsers", Object.keys(userSocketMap))

    socket.on("send_message", (val) => {
        console.log(val);
        console.log(userSocketMap);

        socket.broadcast.emit("receive_message", val)

    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit("left", socket.handshake.query.userName)
        delete userSocketMap[userId];
        io.emit("onlineUsers", Object.keys(userSocketMap))
    });

});

server.listen(process.env.PORT, () => {
    console.log(`listening on :${process.env.PORT}`);
});