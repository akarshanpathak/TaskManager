import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInFailure, signInSuccess, signInStart } from '../redux/userSlice';

function SignIn() {
    const { currentUser, error, loading } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch("/api/auth/signin", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(signInFailure(data.message));
            } else {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-pink-200 via-purple-300 to-purple-400 flex flex-col sm:flex-row text-white h-screen animate-fadeIn">
            <div className="sm:w-[50%] py-16  flex flex-col items-center sm:pt-32 sm:justify-center px-6 sm:px-12">
                <div className="text-center sm:text-left">
                    <span className="text-5xl font-bold text-white">Welcome to TaskManager</span>
                    <br />
                    <span className="mt-4 block text-lg font-semibold text-gray-200">Sign in to use our services</span>
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center">
                            <svg className="w-8 h-8 text-pink-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3a1 1 0 00-.117 1.993L10 5h2a1 1 0 01.117 1.993L12 7H8a1 1 0 00-.117 1.993L8 9h4a1 1 0 01.117 1.993L12 11H9a1 1 0 00-.117 1.993L9 13h1a1 1 0 01.117 1.993L10 15H7a1 1 0 01-.117-1.993L7 13h1a1 1 0 00.117-1.993L8 11H6a1 1 0 01-.117-1.993L6 9h2a1 1 0 00.117-1.993L8 7H6a1 1 0 01-.117-1.993L6 5h2a1 1 0 000-2z"/></svg>
                            <span className="ml-4 text-xl text-gray-100">Organize your tasks efficiently</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a1 1 0 011-1h8a1 1 0 011 1v1h2a1 1 0 011 1v2a1 1 0 01-1 1h-1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V8H3a1 1 0 01-1-1V5a1 1 0 011-1h2V3zm10 6V6H5v3h10zM9 13h2a1 1 0 010 2H9a1 1 0 110-2z"/></svg>
                            <span className="ml-4 text-xl text-gray-100">Secure and reliable</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a1 1 0 011-1h1a1 1 0 011 1v1h6V3a1 1 0 011-1h1a1 1 0 011 1v1h2a1 1 0 011 1v1H2V5a1 1 0 011-1h2V3zm0 5v10a1 1 0 001 1h10a1 1 0 001-1V8H4zm6 3a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H9a1 1 0 110-2h1v-1a1 1 0 011-1z"/></svg>
                            <span className="ml-4 text-xl text-gray-100">Easy to use</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:w-[50%] flex flex-col items-center sm:mt-20 sm:justify-center">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
                    <h1 className="text-center mt-5 font-bold text-4xl text-gray-800"><span className="text-pink-500">Sign</span> In</h1>
                    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                        <input onChange={handleOnChange} className="w-full py-4 px-6 rounded-lg bg-gray-100 text-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300" id="email" placeholder="Enter your email" type="email" />
                        <input onChange={handleOnChange} className="w-full py-4 px-6 rounded-lg bg-gray-100 text-gray-900 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300" id="password" placeholder="Enter your password" type="password" />
                        <button type="submit" className="w-full py-4 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 text-white font-bold shadow-md hover:from-pink-600 hover:via-purple-600 hover:to-purple-700 transition duration-300">Sign in</button>
                        <div className="text-center text-lg font-semibold text-gray-800">
                            Don't have an account?
                            <Link to="/signup">
                                <span className="ml-2 text-pink-500 hover:underline transition duration-100">Sign Up</span>
                            </Link>
                        </div>
                        {error && <div className="mt-4 p-3 rounded-lg bg-red-500 text-center text-white transition duration-300">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
