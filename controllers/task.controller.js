import Task from '../models/task.model.js'
export const createtask=async(req,res)=>{
    const {title,status,content}=req.body
    if(!title || !content || !status ||status==='' || title==='' || content===''){
        return res
        .status(401)
        .json({
          message:"All fields are required",
          success:false
        })
    }
    try {
        const verify=await Task.findOne({title})
        if(verify){
            return res.status(401).json({
                message:" This Title already exists",
                success:false
            })
        }
        const newTask=new Task({
            title,
            content,
            status
        })
        await newTask.save()
        res.status(201)
        .json(newTask)
        
    } catch (error) {
        console.log("error in create task",error);
        
    }
}