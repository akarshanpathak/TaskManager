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
        <div className='flex w-full flex-col items-center justify-center p-5'>
            <h1 className='text-center text-3xl mb-5 font-semibold  '>Update Task</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center bg-gray-800 dark:bg-gray-900 p-5 rounded-lg shadow-lg w-full max-w-lg'>
                <div className='flex flex-col w-full mb-5'>
                    <label htmlFor="title" className='text-xl mb-2 text-white '>Title:</label>
                    <input
                        value={formData.title}
                        id='title'
                        onChange={handleChange}
                        className='border-2 border-blue-300 rounded-lg px-3 py-2 w-full text-white  bg-transparent '
                        type="text"
                        placeholder='Enter title of Task'
                    />
                </div>
                <div className='flex flex-col w-full mb-5'>
                    <label htmlFor="status" className='text-xl mb-2 text-white dark:text-gray-100'>Choose Status:</label>
                    <select
                        value={formData.status}
                        onChange={handleChange}
                        id="status"
                        className='border-2 border-blue-300 rounded-lg px-3 py-2 w-full text-white dark:text-white bg-transparent dark:bg-gray-800'
                    >
                        <option className='bg-none text-black dark:text-white' value="pending">Pending</option>
                        <option className='bg-none text-black dark:text-white' value="complete">Complete</option>
                    </select>
                </div>
                <div className="w-full mb-5">
                    <ReactQuill
                        value={formData.content}
                        placeholder='Write description of the task'
                        className='h-72 mb-12 w-full bg-transparent dark:bg-gray-800'
                        theme="snow"
                        onChange={handleQuillChange}
                        style={{ color: 'white' }} // Ensure text color is white
                    />
                </div>
                <button type='submit' className='bg-blue-300 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-400 transition duration-300'>Update Task</button>
                {error && (
                    <div className='mt-5 py-3 border-2 border-red-300 bg-red-100 px-2 font-semibold text-red-700 rounded-lg'>
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}

export default EditTask;
