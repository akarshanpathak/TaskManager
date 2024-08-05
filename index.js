import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import { connectDb } from './dbConnect/connect.js';
import { createtask, deleteTask, getStats, getTask, getUserTask, updateTask } from './controllers/task.controller.js';

dotenv.config(); // dotenv configuration

connectDb();
const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors()); 
app.get('/', (req, res) => {
    res.send("test route");
});

app.use('/api/auth', authRouter); 
app.post('/api/tasks', createtask);
app.get("/api/task/:taskId", getTask);
app.delete("/api/task/:taskId", deleteTask);
app.put("/api/task/:taskId", updateTask);
app.get("/api/user/tasks/:userId", getUserTask);
app.get("/api/user/tasks/stats/:userId", getStats);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
