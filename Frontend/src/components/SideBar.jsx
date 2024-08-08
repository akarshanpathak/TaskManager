import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOutSuccess } from '../redux/userSlice.js';

function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'PUT',
      });
      if (res.ok) {
        dispatch(signOutSuccess());
        navigate('/signin');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=' min-h-screen w-64 p-6 '>
      <div className='flex flex-col gap-6 bg-transparent'>
        <h2 className='text-4xl font-bold text-white'>
          <span className='text-pink-500'>Task</span>Manager
        </h2>
        <ul className='flex flex-col gap-4'>
          <Link to='/?tab=dashboard'>
            <li className='text-lg font-semibold text-white cursor-pointer hover:text-gray-100 transition duration-300'>
              Home
            </li>
          </Link>
          <Link to='/?tab=about'>
            <li className='text-lg font-semibold text-white cursor-pointer hover:text-gray-100 transition duration-300'>
              About
            </li>
          </Link>
          <Link to='/?tab=all-task'>
            <li className='text-lg font-semibold text-white cursor-pointer hover:text-gray-100 transition duration-300'>
              All Tasks
            </li>
          </Link>
          <Link to='/?tab=create-task'>
            <li className='text-lg font-semibold text-white cursor-pointer hover:text-gray-100 transition duration-300'>
              Create Task
            </li>
          </Link>
        </ul>
        <button
          onClick={handleSignout}
          className='mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 text-white font-bold shadow-md hover:from-pink-600 hover:via-purple-600 hover:to-purple-700 transition duration-300'>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
