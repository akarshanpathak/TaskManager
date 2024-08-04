import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function EditTask() {
    const [formData, setFormData] = useState({ title: '', status: 'pending', content: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const {currentUser}=useSelector(state=>state.user)
    const id = urlParams.get("id");
    useEffect(()=>{
        setFormData({...formData,userId:currentUser._id})
    },[currentUser])
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
        }
    };

    return (
        <div className='flex w-full flex-col items-center justify-center'>
            <h1 className='text-center text-3xl mb-2'>Update Task</h1>
            <form onSubmit={handleSubmit} className='flex mt-5 items-center justify-center flex-col'>
                <div className='flex mt-5 items-center justify-center'>
                    <label htmlFor="title" className='text-2xl'>Title:</label>
                    <input
                        value={formData.title}
                        id='title'
                        onChange={handleChange}
                        className='border-[1px] border-blue-300 rounded-lg bg-transparent px-2 py-3 ml-2'
                        type="text"
                        placeholder='Enter title of Task'
                    />
                </div>
                <div className="flex gap-5 mt-5">
                    <label htmlFor="status" className='text-2xl'>Choose Status:</label>
                    <select
                        value={formData.status}
                        onChange={handleChange}
                        className='bg-transparent border-[1px] rounded-lg p-2 border-blue-300'
                        id="status"
                    >
                        <option className='bg-none text-black' value="pending">Pending</option>
                        <option className='bg-none text-black' value="complete">Complete</option>
                    </select>
                </div>
                <div className="mt-5">
                    <ReactQuill
                        value={formData.content}
                        placeholder='Write description of the task'
                        className='h-72 mb-12 md:w-[50vw]'
                        theme="snow"
                        onChange={handleQuillChange}
                    />
                </div>
                <button type='submit' className='border-2 hover:bg-blue-300 cursor-pointer border-blue-300 px-6 py-2 font-semibold text-lg rounded-lg mt-4 mb-2'>Update Task</button>
                {error && (
                    <div className='mt-5 py-3 border-[1px] border-blue-300 px-2 font-semibold text-red-700'>
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}

export default EditTask;
