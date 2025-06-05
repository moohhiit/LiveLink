import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import { createServer } from 'node:http';
import {Server} from 'socket.io';



import AuthRoute from "../routes/AuthRoute.js"
import ChatRoute from "../routes/ChatRoute.js"


dotenv.config()


const app = express();
const PORT = process.env.PORT;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
      }
});


app.use(cors())

io.on('connection', (socket) => {
  console.log('client connected:', socket.id);
  socket.on('get-all-users', async () => {
    const sockets = await io.fetchSockets();
    const allUsers = sockets.map(s => ({
      id: s.id,
      username: s.handshake.auth?.userName || "Guest"
    }))
    console.log(allUsers)
    socket.emit('all-user' , allUsers)  
  
  })
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


app.use(express.json())

app.use('/api/auth', AuthRoute)
app.use('/api/chat' , ChatRoute)



mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
   
}).catch(err => console.error('MongoDB error:', err));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));