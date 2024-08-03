import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import {connectDb} from './dbConnect/connect.js'
import {createtask} from './controllers/task.controller.js'
dotenv.config(); //dotenv configuration

connectDb()
const app=express();
app.use(express.json()) 

app.use(cookieParser())
app.get('/',(req,res)=>{
   res.send("test route")
})

app.use('/api/auth',authRouter)
app.post('/api/tasks',createtask)/

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
})

