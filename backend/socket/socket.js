import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:['http://localhost:3000'],
        methods:['GET', 'POST'],
    },
});

// hold all the online users
const userSocketMap = {}; // {userId: socketId}

// returns the socket id when a new user connects to the socket
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

// socket connection
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId != null) { 
        userSocketMap[userId] = socket.id;
    } 

    // emits data from server to client
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })

})

export {app, io, server};

