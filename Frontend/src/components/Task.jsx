import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
      <div className='h-screen flex items-center justify-center bg-gray-800 dark:bg-gray-900'>
        <p className='text-red-600'>{error}</p>
      </div>
    );
  }

  if (!taskDetail.title) {
    return (
      <div className='h-screen flex items-center justify-center bg-gray-800 dark:bg-gray-900'>
        <p className='text-gray-600 dark:text-gray-300'>Loading...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center p-5 max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg'>
      <div className='text-center'>
        <h1 className='text-4xl font-semibold text-white '>Title:</h1>
        <span className='text-3xl font-medium text-white '>{taskDetail.title}</span>
      </div>
      <hr className="w-full my-4 border-gray-400 " />
      <h2 className='text-2xl font-semibold text-white  underline'>Content</h2>
      <div className='mt-5 mb-4 w-full text-white ' dangerouslySetInnerHTML={{ __html: taskDetail.content }} />
      <hr className="w-full my-4 border-gray-400 " />
      <div className="mt-5 mb-4 text-white ">
        <span className='font-medium'>Status:</span>
        <span className='ml-2 font-semibold'>{taskDetail.status}</span>
      </div>
      <hr className="w-full my-4 border-gray-400 " />
      <div className="flex space-x-4">
        <button onClick={handleDelete} className='px-4 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-100 dark:border-red-500 dark:text-red-300 dark:hover:bg-red-600 dark:hover:text-white transition duration-300'>
          Delete Task
        </button>
        <button onClick={handleEdit} className='px-4 py-2 border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-100 dark:border-blue-500 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white transition duration-300'>
          Edit Task
        </button>
      </div>
      {
        deletedSuccessfully && (
          <div className='mt-5 py-3 border border-blue-300 bg-blue-50 dark:border-blue-500 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-lg px-4'>
            {deletedSuccessfully}
          </div>
        )
      }
    </div>
  );
}

export default Task;
