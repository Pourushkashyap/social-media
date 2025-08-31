import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))


app.use(cookieParser())
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"16kb"}))
import router from './routes/user.routes.js'
import router1 from "./routes/message_routes.js"


app.use('/api/v1/users',router)
app.use('/api/v1/messages',router1);



export default app