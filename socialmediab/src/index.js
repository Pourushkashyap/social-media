import dotenv from 'dotenv';
import connectdb from './db/index.js';
import app from './app.js';
import cors from "cors"
import {Server} from "socket.io"
import http from "http"
import socketmiddleware from './middleware/socket.io_middleware.js';


dotenv.config({
    path: './.env'
});

app.get('/login', (req, res) => {
    res.send("hello, my name is pourush");
});

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }
})

socketmiddleware(io);



connectdb()
    .then(() => {
        const PORT = 9000; // Explicitly set port
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to start server:', error);
    });