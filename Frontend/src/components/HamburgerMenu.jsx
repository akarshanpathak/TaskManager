import React from 'react'

function HamburgerMenu() {
  return (
    <div className='p-6 border-b-8 border-blue-300 rounded-bl-lg rounded-br-lg duration-150'>
       <ul >
        <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>Home</li>
        <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>About</li>
        <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>All Tasks</li>
        <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>Create Task</li>
       </ul>
    </div>
  )
}

export default HamburgerMenu
