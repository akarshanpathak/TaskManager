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
    <div className='flex w-full flex-col items-center justify-center p-5'>
      <h1 className='text-center text-3xl mb-5 font-semibold'>Create New Task</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center bg-gray-800 dark:bg-gray-900 p-5 rounded-lg shadow-lg w-full max-w-lg'>
        <div className='flex flex-col w-full mb-5'>
          <label htmlFor="title" className='text-xl mb-2'>Title:</label>
          <input id='title' onChange={handleChange} value={formData.title} className='border-2 border-blue-300 rounded-lg px-3 py-2 w-full text-white dark:text-gray-200 bg-transparent dark:bg-gray-800' type="text" placeholder='Enter title of Task' />
        </div>
        <div className='flex flex-col w-full mb-5'>
          <label htmlFor="status" className='text-xl mb-2'>Choose Status:</label>
          <select onChange={handleChange} id="status" value={formData.status} className='border-2 border-blue-300 rounded-lg px-3 py-2 w-full  dark:text-gray-200 bg-transparent text-black dark:bg-gray-800'>
            <option value="pending">Select Status</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <div className="w-full mb-5">
          <ReactQuill placeholder='Write description of the task' className='h-72 mb-12 w-full text-white' theme="snow" onChange={(value) => setFormData({ ...formData, content: value })} />
        </div>
        <button type='submit' className='bg-blue-300 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-400 transition duration-300'>Create a Task</button>
        {error && <div className='mt-5 py-3 border-2 border-red-300 bg-red-100 px-2 font-semibold text-red-700 rounded-lg'>{error}</div>}
      </form>
    </div>
  );
}

export default CreateTask;
