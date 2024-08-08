import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOutSuccess } from '../redux/userSlice';

function HamburgerMenu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignout = async () => {
        try {
            const res = await fetch("/api/auth/signout", {
                method: 'PUT'
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
        <div className='p-6  text-white  lg:hidden'>
            <ul className='space-y-4'>
                <Link to='/'>
                    <li className='text-lg font-semibold hover:text-gray-200 transition duration-200'>Home</li>
                </Link>
                <Link to='/?tab=about'>
                    <li className='text-lg font-semibold hover:text-gray-200 transition duration-200'>About</li>
                </Link>
                <Link to='/?tab=all-task'>
                    <li className='text-lg font-semibold hover:text-gray-200 transition duration-200'>All Tasks</li>
                </Link>
                <Link to='/?tab=create-task'>
                    <li className='text-lg font-semibold hover:text-gray-200 transition duration-200'>Create Task</li>
                </Link>
                <li onClick={handleSignout} className='text-lg  font-semibold hover:text-red-300 cursor-pointer transition duration-200'>Sign Out</li>
            </ul>
        </div>
    );
}

export default HamburgerMenu;
