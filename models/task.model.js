import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',

    }
},
{
    timestamps:true
})

const Task=mongoose.model("task",taskSchema)

export default Task