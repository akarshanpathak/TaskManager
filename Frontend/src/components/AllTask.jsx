import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

function AllTask() {
  const { currentUser } = useSelector(state => state.user);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setError(null);
        const res = await fetch(`/api/user/tasks/${currentUser._id}?limit=3&startIndex=${startIndex}`);
        const data = await res.json();
        if (res.ok) {
          setTasks(data.tasks);
          setLength(data.length);
          setStartIndex(3); 
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTask();
  }, [currentUser, startIndex]);

  const handleShowMore = async () => {
    try {
      setError(null);
      const res = await fetch(`/api/user/tasks/${currentUser._id}?limit=3&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setTasks(prevTasks => [...prevTasks, ...data.tasks]);
        setLength(data.length);
        setStartIndex(prevStartIndex => prevStartIndex + data.tasks.length);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const res = await fetch(`/api/task/${taskId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setDeletedSuccessfully(data.message);
        setTimeout(() => {
          setTasks(tasks.filter(task => task._id !== taskId));
          setDeletedSuccessfully(null); 
        }, 600);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className=' min-h-screen flex flex-col items-center p-6'>
      <div className='w-full max-w-5xl bg-gray-800 rounded-lg shadow-xl p-8'>
        <h1 className='text-center text-4xl font-semibold text-white mb-6'>All Tasks</h1>
        <div className='overflow-x-auto'>
          <table className='mt-6 w-full table-auto bg-gray-700 rounded-lg'>
            <thead className='bg-blue-500 text-white'>
              <tr>
                <th className='p-4'>S no.</th>
                <th className='p-4 '>Title</th>
                <th className='p-4'>Status</th>
                <th className='p-4'>Created At</th>
                <th className='p-4'>Edit</th>
                <th className='p-4'>Delete</th>
              </tr>
            </thead>
            <tbody className='text-white'>
              {tasks.length ? (
                tasks.map((val, idx) => (
                  <tr key={val._id} className='border-b border-gray-600'>
                    <td className='p-4'>{idx + 1}</td>
                    <Link to={`/?tab=task&id=${val._id}`}>
                      <td className='p-4 text-blue-400 hover:underline'>{val.title}</td>
                    </Link>
                    <td className='p-4'>{val.status}</td>
                    <td className='p-4'>{new Date(val.createdAt).toLocaleDateString()}</td>
                    <td className='p-4'>
                      <button
                        onClick={() => navigate(`/?tab=edit-task&id=${val._id}`)}
                        className='bg-blue-300 text-white rounded-lg px-4 py-2 hover:bg-blue-400 transition duration-300'
                      >
                        Edit
                      </button>
                    </td>
                    <td className='p-4'>
                      <button
                        className='bg-red-300 text-white rounded-lg px-4 py-2 hover:bg-red-400 transition duration-300'
                        onClick={() => handleDelete(val._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className='p-4 text-center text-gray-400'>No tasks found</td>
                </tr>
              )}
            </tbody>
          </table>
          {length > tasks.length && (
            <button
              className='mx-auto mt-6 bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 text-white rounded-lg px-4 py-2 hover:from-pink-600 hover:via-purple-600 hover:to-purple-700 transition duration-300'
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </div>
        {error && (
          <div className='mt-5 py-3 border-2 border-red-300 bg-red-100 text-red-700 rounded-lg px-4'>
            {error}
          </div>
        )}
        {deletedSuccessfully && (
          <div className='mt-5 py-3 border-2 border-blue-300 bg-blue-50 text-blue-700 rounded-lg px-4'>
            {deletedSuccessfully}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllTask;
