import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function EditTask() {
    const { currentUser } = useSelector(state => state.user);
    const [formData, setFormData] = useState({ title: '', status: 'pending', content: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get("id");

    useEffect(() => {
        setFormData(prevData => ({ ...prevData, userId: currentUser?._id }));
    }, [currentUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleQuillChange = (value) => {
        setFormData({ ...formData, content: value });
    };

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setError(null);
                const res = await fetch(`/api/task/${id}`);
                const data = await res.json();

                if (res.ok) {
                    setFormData(data);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error(error);
                setError("An error occurred while fetching the task details.");
            }
        };

        fetchDetail();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            const res = await fetch(`/api/task/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message);
            } else {
                setError(null);
                navigate(`/?tab=task&id=${data._id}`);
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred while updating the task.");
        }
    };

    return (
        <div className=' min-h-screen flex flex-col items-center p-6'>
            <div className='w-full max-w-3xl bg-white rounded-lg shadow-xl p-8'>
                <h1 className='text-center text-3xl font-semibold mb-6 text-gray-800'>Update Task</h1>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <div className='flex flex-col w-full mb-5'>
                        <label htmlFor="title" className='text-xl mb-2 text-gray-800'>Title:</label>
                        <input
                            value={formData.title}
                            id='title'
                            onChange={handleChange}
                            className='border-2 border-blue-300 rounded-lg px-3 py-2 w-full text-gray-800 bg-gray-100'
                            type="text"
                            placeholder='Enter title of Task'
                        />
                    </div>
                    <div className='flex flex-col w-full mb-5'>
                        <label htmlFor="status" className='text-xl mb-2 text-gray-800'>Choose Status:</label>
                        <select
                            value={formData.status}
                            onChange={handleChange}
                            id="status"
                            className='border-2 border-blue-300 rounded-lg px-3 py-2 w-full text-gray-800 bg-gray-100'
                        >
                            <option value="pending">Pending</option>
                            <option value="complete">Complete</option>
                        </select>
                    </div>
                    <div className="w-full mb-5">
                        <ReactQuill
                            value={formData.content}
                            placeholder='Write description of the task'
                            className='h-72 w-full bg-gray-100 text-black'
                            theme="snow"
                            onChange={handleQuillChange}
                        />
                    </div>
                    <button type='submit' className='bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 text-white font-bold py-3 px-6 mt-20 sm:mt-8 rounded-lg shadow-md hover:from-pink-600 hover:via-purple-600 hover:to-purple-700 transition duration-300'>
            Update Task
          </button>
                    {error && (
                        <div className='mt-5 py-3 border-2 border-red-300 bg-red-100 px-2 font-semibold text-red-700 rounded-lg'>
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default EditTask;
