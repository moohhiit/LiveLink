import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"


import {createServer} from "node:http"


import AuthRoute from "../routes/AuthRoute.js"
import ChatRoute from "../routes/ChatRoute.js"
import { initSocket } from "../socket/Socket.js"
dotenv.config()


const app = express()
const PORT = process.env.PORT
const server = createServer(app)
app.use(cors())
app.use(express.json())

app.use('/api/auth', AuthRoute)
app.use('/api/chat' , ChatRoute)

initSocket(server)


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB error:', err));