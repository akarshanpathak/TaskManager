import express from 'express';
import dotenv from 'dotenv';

dotenv.config();


const app=express();
app.get('/',(req,res)=>{
   res.send("test route")
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
})
