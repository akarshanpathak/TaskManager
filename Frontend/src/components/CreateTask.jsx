import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { json } from 'react-router-dom';
function CreateTask() {
    const [value, setValue] = useState('');
    const [formData,setFormData]=useState(null)
    const [error,setError]=useState(null)
    const handleChange=(e)=>{
          setFormData({...formData,[e.target.id]:e.target.value})
        //   console.log(formData);
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        try {
            setError(null)
            const res=await fetch('/api/tasks',{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            const data=await res.json()
            if(!res.ok){
                setError(data.message)
            }
            if(res.ok){
                console.log(data);
                setError(null)
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h1 className='text-center text-3xl mb-2'>Create New Task</h1>
      <form  onSubmit={handleSubmit} className='flex mt-5 items-center justify-center flex-col'>
      <div className='flex mt-5 items-center justify-center'>
      <label htmlFor="" className='text-2xl'>Title:</label><input id='title' onChange={handleChange}  className='border-[1px] border-blue-300 rounded-lg bg-transparent px-2 py-3 ml-2 ' type="text" placeholder='Enter title of Task'/>
      </div>
      <div className="flex gap-5 mt-5">
        <label htmlFor="" className='text-2xl'>Choose Status:</label>
        <select onChange={handleChange} className='bg-transparent border-[1px] rounded-lg p-2 border-blue-300' name="" id="status">
        <option className='bg-none text-black' value="pending">Pending</option>
        <option className='bg-none text-black' value="complete">Complete</option>
        
      </select>
      </div>
      <div className="mt-5">
      <ReactQuill placeholder='Write description of the task'
          className='h-72 mb-12 md:w-[50vw]'  theme="snow"  onChange={(value)=>{setFormData({...formData,content:value})}} />;
      </div>
      <button type='submit'  className='border-2 hover:bg-blue-300 cursor-pointer border-blue-300 px-6 py-2 font-semibold text-lg rounded-lg mt-4 mb-2' >Create a Task</button>
      {
        error && 
        <div className='mt-5 py-3 border-[1px] border-blue-300 px-2 font-semibold text-red-700'>
           {error}
        </div>
      }
      </form>
    </div>
  )
}

export default CreateTask
