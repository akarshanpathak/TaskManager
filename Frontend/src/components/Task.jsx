import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { useLocation, useNavigate } from 'react-router-dom';

function Task({ data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [taskDetail, setTaskDetail] = useState(data || {});
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(null);
  const [error, setError] = useState(null);

  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setError(null);
        const res = await fetch(`/api/task/${id}`);
        const data = await res.json();

        if (res.ok) {
          const sanitizedContent = DOMPurify.sanitize(data.content);
          setTaskDetail({ ...data, content: sanitizedContent });
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the task details.");
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/task/${taskDetail._id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok) {
        setDeletedSuccessfully(data.message);
        setTimeout(() => {
          navigate('/?tab=dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while deleting the task.");
    }
  };

  const handleEdit = () => {
    navigate(`/?tab=edit-task&id=${taskDetail._id}`);
  };

  if (error) {
    return (
      <div className='h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold text-xl'>
        <p>{error}</p>
      </div>
    );
  }

  if (!taskDetail.title) {
    return (
      <div className='h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold text-xl'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className=' min-h-screen flex flex-col items-center p-6'>
      <div className='w-full max-w-3xl bg-white rounded-lg shadow-xl p-8'>
        <div className='text-center mb-6'>
          <h1 className='text-4xl font-bold text-gray-800'>Title:</h1>
          <span className='text-3xl font-semibold text-gray-800'>{taskDetail.title}</span>
        </div>
        <hr className="w-full my-4 border-gray-300" />
        <h2 className='text-2xl font-bold text-gray-800 underline mb-4'>Content</h2>
        <div className='w-full text-gray-800 mb-6' dangerouslySetInnerHTML={{ __html: taskDetail.content }} />
        <hr className="w-full my-4 border-gray-300" />
        <div className="mb-6 text-gray-800">
          <span className='font-medium'>Status:</span>
          <span className='ml-2 font-semibold'>{taskDetail.status}</span>
        </div>
        <hr className="w-full my-4 border-gray-300" />
        <div className="flex space-x-4">
          <button onClick={handleDelete} className='px-4 py-2 border border-red-300 rounded-lg text-red-700 bg-red-100 hover:bg-red-200 transition duration-300'>
            Delete Task
          </button>
          <button onClick={handleEdit} className='px-4 py-2 border border-blue-300 rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 transition duration-300'>
            Edit Task
          </button>
        </div>
        {
          deletedSuccessfully && (
            <div className='mt-5 py-3 border border-blue-300 bg-blue-50 text-blue-700 rounded-lg px-4'>
              {deletedSuccessfully}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Task;
