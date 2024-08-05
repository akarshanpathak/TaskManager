import mongoose from 'mongoose'
import Task from '../models/task.model.js'
export const createtask=async(req,res)=>{
    const {title,status,content,userId}=req.body
    if(!title || !content || !status || !userId ||status==='' || title==='' || content==='' || userId===''){
        return res
        .status(401)
        .json({
          message:"All fields are required",
          success:false
        })
    }
    try {
        const verify=await Task.findOne({title,userId})
        if(verify){
            return res.status(401).json({
                message:" This Title already exists",
                success:false
            })
        }
        const newTask=new Task({
            title,
            content,
            status,
            userId
        })
        await newTask.save()
        res.status(201)
        .json(newTask)
        
    } catch (error) {
        console.log("error in create task",error);
        
    }
}

export const getTask=async(req,res)=>{
   try {
     const taskId=req.params.taskId 
    //  console.log(taskId);
     const task=await Task.findById(taskId)
 
     if(!task){
         res.status(401).json({message:"No such task exists",success:false})
     }
     res.status(201).json(task)
   } catch (error) {
    console.log(error);
    
   }
}


export const deleteTask=async(req,res)=>{
    try {
        const taskId=req.params.taskId
        const task=await Task.findByIdAndDelete(taskId)
        if(!task){
            return res.status(401).json({message:"You can not delete this task",success:false})
        }
        res.status(201).json({message:"Task deleted successfully"})
    } catch (error) {
        console.log(error)
        
    }
}
export const updateTask=async(req,res)=>{
    try {
        const taskId=req.params.taskId
        const task=await Task.findByIdAndUpdate(taskId,{
               $set:{
                  title:req.body.title,
                  content:req.body.content,
                  status:req.body.status,
                  userId:req.body.userId
               }
        },{new:true})
        if(!task){
            return res.status(401).json({message:"You can not update this task",success:false})
        }
        res.status(201).json(task)
    } catch (error) {
        console.log(error)
        
    }
}




export const getUserTask = async (req, res) => {
  const { userId } = req.params;
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 3;

  try {
    // Count tasks specifically for the given user
    const length = await Task.countDocuments({ userId });

    // Find tasks for the given user with pagination and sorting by creation date (most recent first)
    const tasks = await Task.find({ userId })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' });
    }

    res.status(200).json({ tasks, length });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Server error' });
  }
};




export const getStats = async (req, res) => {
  const { userId } = req.params;

  try {
    const totalTasks = await Task.countDocuments({ userId });
    const completedTasks = await Task.countDocuments({ userId, status: 'complete' });
    const pendingTasks = await Task.countDocuments({ userId, status: 'pending' });

    // Logging to check if the counts are correct
    console.log('Total Tasks:', totalTasks);
    console.log('Completed Tasks:', completedTasks);
    console.log('Pending Tasks:', pendingTasks);

    res.status(200).json({ totalTasks, completedTasks, pendingTasks });
  } catch (error) {
    console.error('Error fetching task statistics:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
