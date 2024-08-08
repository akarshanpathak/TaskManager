import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function CreateTask() {
  const { currentUser } = useSelector(state => state.user);
  const [value, setValue] = useState('');
  const [formData, setFormData] = useState({ title: '', status: 'pending', content: '', userId: currentUser?._id });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (currentUser) {
      setFormData(prevData => ({ ...prevData, userId: currentUser._id }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const res = await fetch('/api/tasks', {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      }
      if (res.ok) {
        navigate(`/?tab=task&id=${data._id}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='  flex items-center justify-center '>
      <div className='w-full max-w-lg bg-white rounded-lg shadow-xl p-4'>
        <h1 className='text-center text-3xl font-bold mb-6 text-gray-800'>
          <span className='text-pink-500'>Create</span> New Task
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <div className='flex flex-col mb-6'>
            <label htmlFor="title" className='text-lg font-semibold mb-2 text-gray-800'>Title:</label>
            <input id='title' onChange={handleChange} value={formData.title} className='border-2 border-gray-300 rounded-lg px-4 py-2 w-full text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300' type="text" placeholder='Enter title of Task' />
          </div>
          <div className='flex flex-col mb-6'>
            <label htmlFor="status" className='text-lg font-semibold mb-2 text-gray-800'>Choose Status:</label>
            <select onChange={handleChange} id="status" value={formData.status} className='border-2 border-gray-300 rounded-lg px-4 py-2 w-full text-gray-800 shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300'>
              <option value="pending">Select Status</option>
              <option value="pending">Pending</option>
              <option value="complete">Complete</option>
            </select>
          </div>
          <div className='mb-6'>
            <ReactQuill placeholder='Write description of the task' className='h-72 w-full text-black' theme="snow" onChange={(value) => setFormData({ ...formData, content: value })} />
          </div>
          <button type='submit' className='bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 text-white font-bold py-3 px-6 mt-20 sm:mt-8 rounded-lg shadow-md hover:from-pink-600 hover:via-purple-600 hover:to-purple-700 transition duration-300'>
            Create Task
          </button>
          {error && <div className='mt-5 py-3 border-2 border-red-300 bg-red-100 px-2 font-semibold text-red-700 rounded-lg'>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
