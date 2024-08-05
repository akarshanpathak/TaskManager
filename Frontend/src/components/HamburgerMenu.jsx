import React from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function HamburgerMenu() {
  const navigate=useNavigate()
  return (
    <div className='p-6 border-b-8 border-blue-300 rounded-bl-lg rounded-br-lg duration-150 lg:hidden'>
       <ul >
        <Link to='/'><li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>Home</li></Link>
       <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>About</li>
        <Link to='/?tab=all-task'><li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>All Tasks</li></Link>
       <Link to='/?tab=create-task'> <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>Create Task</li></Link>
       </ul>
    </div>
  )
}

export default HamburgerMenu
