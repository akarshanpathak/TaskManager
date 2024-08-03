import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiArrowNarrowUp } from "react-icons/hi";
import { MdTask } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5"
import { MdPending } from "react-icons/md";
function DashBoard() {
  return (
    <div>
        <h1 className='font-semibold text-3xl self-center text-center'>Task Details</h1>
      <div className="mt-4 p-2 flex flex-wrap  gap-10 fl">
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Tasks</h3>
              <p className='text-2xl'>10</p>
            </div>
            <MdTask className='bg-blue-300  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-blue-300 flex items-center'>
              <HiArrowNarrowUp />
              10
            </span>
            <div className='text-gray-500'>Last Month Task</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>completed task</h3>
              <p className='text-2xl'>10</p>
            </div>
            <IoCheckmarkDoneCircle className='bg-blue-300  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-blue-300 flex items-center'>
              <HiArrowNarrowUp />
              10
            </span>
            <div className='text-gray-500'>Last Month Task</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Pending task</h3>
              <p className='text-2xl'>10</p>
            </div>
            <MdPending className='bg-blue-300  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-blue-300 flex items-center'>
              <HiArrowNarrowUp />
              10
            </span>
            <div className='text-gray-500'>Last Month Task</div>
          </div>
        </div>
        
        </div>
    </div>
  )
}

export default DashBoard
