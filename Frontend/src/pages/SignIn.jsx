import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { signInFailure,signInSuccess,signInStart } from '../redux/userSlice'
function SignIn() {
    // access allalone
    // const {currentUser,error,loading}=useSelector(state=>state.user)
    const {currentUser,error,loading}=useSelector(state=>state.user)
    
    
    const navigate=useNavigate()
    const dispatch=useDispatch()
    // console.log(loading);
    //  const [error,setError]=useState(null)
     const [formData,setFormData]=useState({})
    const handleOnChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    // console.log(formData)
    const handleSubmit=async (e)=>{
        e.preventDefault()
        try {
           dispatch(signInStart())
            const res=await fetch("/api/auth/signin",{
                method:'POST',
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            const data =await res.json()
            if(!res.ok){
                dispatch(signInFailure(data.message))
            }

            if(res.ok){
                console.log("dispatched");
                
                dispatch(signInSuccess(data))
                navigate('/')

            }
            // console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
    // if(currentUser){
    //     console.log("current user",currentUser);
    // }
  return (
    <div className='bg-slate-900 flex flex-col sm:flex-row text-white h-screen'>
     
    <div  className='sm:w-[50%] sm:border-b-0 py-16 sm:border-r-2 border-b-2 flex flex-col item-center sm:pt-32 sm:justify-center'>
        <div className=' text-center'>
        <span className='text-4xl font-semibold text-blue-300 '>Welcome to TaskManager</span> 
         <br/>
        <span className=' font-semibold '>Sign in to use our services</span>
        </div>
    </div>
    <div  className='sm:w-[50%]   flex flex-col item-center sm:mt-20 sm:justify-center'>
       <div className="">
       <h1 className='text-center mt-5 font-semibold font-sans text-4xl'><span className='text-blue-300'>Sign</span> In</h1>
        <form onSubmit={handleSubmit} className='mx-auto  flex flex-col items-center justify-center mt-10'>
           
            <input onChange={handleOnChange}  className='outline-none m-2 py-4 px-10 rounded-lg bg-transparent border-2 text-blue-300' id='email' placeholder='Enter your email' type="email" />
            <input onChange={handleOnChange}  className='outline-none m-2 py-4 px-10 rounded-lg bg-transparent border-2 text-blue-300' id='password' placeholder='Enter your password' type="password" />
            
            <button type='submit' className=' mt-5 border-2 rounded-md text-blue-300  px-3 py-2 font-semibold hover:bg-blue-800 hover:text-white duration-200'>Sign in</button>
            <div className="mt-4 font-semibold font-sans">
                Don't have an account ?<Link to='/signup'>
                <span className='ml-2 text-blue-400 hover:underline duration-100'>Sign Up</span>
                </Link>
            </div>
           {
            error &&  <div className="mt-7 rounded-xl  bg   bg-red-500 p-3">
            {error}
        </div>
           }
        </form>
       </div>
    </div>
</div>
  )
}

export default SignIn