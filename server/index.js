import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const PORT = 8000;

//components
import Connection from './database/db.js';
import Router from './routes/route.js';

//socket.io
const httpServer = createServer(app);
export const io = new Server(httpServer);

dotenv.config();

Connection();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', Router);

io.on('connection', (socket) => {
    // console.log('a user connected', socket.id);
    socket.on('comment', (msg) => {
        // console.log('new comment received', msg);
        io.emit('new-comment', msg);
    });
    socket.on('delete', (msg) => {
        io.emit('delete-comment', msg);
    });
});

httpServer.listen(PORT, () =>
    console.log(`Server is running successfully on PORT ${PORT}`)
);
