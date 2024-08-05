import React from 'react'
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { signOutSuccess } from '../redux/userSlice.js'
function SideBar() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleSignout=async()=>{
    try {
      const res=await fetch("/api/auth/signout",{
        method:'PUT'
      })
      if(res.ok){
        dispatch(signOutSuccess())
        navigate('/signin')
        // console.log("signout successfull");
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div>
     <div className='p-6  rounded-bl-lg rounded-br-lg duration-150 '>
       <ul className='flex flex-col gap-10'>
        <Link to='/?tab=dashboard'><li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>Home</li></Link>
        <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>About</li>
       <Link to='/?tab=all-task'> <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>All Tasks</li></Link>
       <Link to='/?tab=create-task'> <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>Create Task</li></Link>
       <li onClick={handleSignout} className='mt-4 cursor-pointer hover:underline hover:text-red-500 '>Sign Out</li>
       </ul>
    </div>
    </div>
  )
}

export default SideBar
