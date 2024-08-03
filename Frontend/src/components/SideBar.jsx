import React from 'react'

function SideBar() {
  return (
    <div>
     <div className='p-6  rounded-bl-lg rounded-br-lg duration-150 '>
       <ul className='flex flex-col gap-10'>
        <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>Home</li>
        <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>About</li>
        <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>All Tasks</li>
        <li className='mt-4 cursor-pointer hover:underline hover:text-blue-300 '>Create Task</li>
       </ul>
    </div>
    </div>
  )
}

export default SideBar
