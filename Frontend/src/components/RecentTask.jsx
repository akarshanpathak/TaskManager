import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function RecentTask() {
  const {currentUser}=useSelector(state=>state.user)
  const [error,setError]=useState(null)
  const [tasks,setTasks]=useState([])
  useEffect(()=>{
      const fetchTask=async()=>{
        try {
          setError(null)
          const res=await fetch(`/api/user/tasks/${currentUser._id}`)
          const data=await res.json()
          if(res.ok){
            setTasks(data.tasks)
          }
          else{
            setError(data.message)
          }
        } catch (error) {
          setError(error.message)
        }
      }
      fetchTask()
      
      
  },[currentUser])
  
  return (
    <div className='mt-4'>
      <h1 className='font-semibold text-center text-3xl'>Recent Tasks</h1>
      <div className='flex justify-center items-center'>
        <div className='w-full max-w-4xl overflow-x-auto'>
          <table className='mt-6 shadow-md w-full table-auto'>
            <thead className='bg-blue-300'>
              <tr className='text-left'>
                <th className='p-4'>S no.</th>
                <th className='p-4'>Title</th>
                
                <th className='p-4'>Status</th>
                <th className='p-4'>Created At</th> 
                <th className='p-4'>Edit</th>
                <th className='p-4'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr className='border-b'>
                <td className='p-4'>1</td>
                <td className='p-4'>Todo app</td>
                <td className='p-4'>content of task1</td>
                <td className='p-4'>Pending</td>
                <td className='p-4'>{new Date().toLocaleDateString()}</td>
                <td className='p-4'><button className='border-[1px] border-blue-300 rounded-xl hover:bg-blue-300 cursor-pointer font-semibold px-4 py-2'>Edit</button></td>
                <td className='p-4'><button className='border-[1px] border-red-300 rounded-xl hover:bg-red-800 cursor-pointer font-semibold px-4 py-2'>Delete</button></td>
              </tr> */}
              {/* Add more rows as needed */}
              {
                tasks && tasks.map((val,idx)=>(
                  <tr key={val._id} className='border-b'>
                      <td className='p-4'>{idx+1}</td>
                      <td className='p-4'>{val.title}</td>
                      
                      <td className='p-4'>{val.status}</td>
                      <td className='p-4'>{new Date(val.createdAt).toLocaleDateString()}</td>
                      <td className='p-4'><button className='border-[1px] border-blue-300 rounded-xl hover:bg-blue-300 cursor-pointer font-semibold px-4 py-2'>Edit</button></td>
                      <td className='p-4'><button className='border-[1px] border-red-300 rounded-xl hover:bg-red-800 cursor-pointer font-semibold px-4 py-2'>Delete</button></td>
                 </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecentTask;
