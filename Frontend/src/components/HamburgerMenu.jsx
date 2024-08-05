import React from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { signOutSuccess } from '../redux/userSlice.js'
function HamburgerMenu() {
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
    <div className='p-6 border-b-8 border-blue-300 rounded-bl-lg rounded-br-lg duration-150 lg:hidden'>
       <ul >
        <Link to='/'><li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>Home</li></Link>
       <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>About</li>
        <Link to='/?tab=all-task'><li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>All Tasks</li></Link>
       <Link to='/?tab=create-task'> <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>Create Task</li></Link>
       <li onClick={handleSignout} className='mt-4 cursor-pointer hover:underline hover:text-red-500 '>Sign Out</li>
       </ul>
    </div>
  )
}

export default HamburgerMenu
