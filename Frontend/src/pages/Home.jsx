import React, { useState } from 'react'
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import HamburgerMenu from '../components/HamburgerMenu';
import { RxCross2 } from "react-icons/rx";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiArrowNarrowUp } from "react-icons/hi";
import { MdTask } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5"
import { MdPending } from "react-icons/md";
import DashBoard from '../components/DashBoard';

function Home() {
  const [showMenu,setShowMenu]=useState(false)
  const handleShowMenu=()=>{
    setShowMenu(prev=>!prev)
  }
  return (
    <div className='bg-slate-900 h-screen box-border  text-white'>
        <div className="flex justify-between items-center p-4">
          <div className='border-2 font-semibold backdrop-blur-md  rounded-full p-2'><span className='text-3xl   text-blue-300 font-bold'>T</span>m</div>
           <div onClick={handleShowMenu} className='text-3xl cursor-pointer'>
            {
              showMenu?<RxCross2 />:<HiOutlineMenuAlt1/>
            }
            </div>
        </div>
        <div className="">
        {
          showMenu && <HamburgerMenu/>
        }
        </div>
        <div className="">
        <DashBoard/>
        </div>
    </div> 
  )
}

export default Home
