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
  }, [currentUser]);

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
    <div>
      <h1 className='text-center text-4xl'>All Tasks</h1>
      <div className='mt-4'>
        <div className='flex justify-center items-center'>
          <div className='w-full max-w-4xl overflow-x-auto'>
            <table className='mt-6 shadow-md w-full table-auto'>
              <thead className='bg-blue-300'>
                <tr className='text-left'>
                  <th className='p-4'>S no.</th>
                  <th className='p-4'>Title</th>
                  <th className='p-4'>Status</th>
                  <th className='p-4'>Created At</th>
                  <th className='p-4'>Edit</th>
                  <th className='p-4'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tasks && tasks.map((val, idx) => (
                  <tr key={val._id} className='border-b'>
                    <td className='p-4'>{idx + 1}</td>
                    <Link to={`/?tab=task&id=${val._id}`}><td className='p-4 mt-2 hover:underline hover:text-blue-300'>{val.title}</td></Link>
                    <td className='p-4'>{val.status}</td>
                    <td className='p-4'>{new Date(val.createdAt).toLocaleDateString()}</td>
                    <td className='p-4'>
                      <button onClick={()=>{navigate(`/?tab=edit-task&id=${val._id}`)}} className='border-[1px] border-blue-300 rounded-xl hover:bg-blue-300 cursor-pointer font-semibold px-4 py-2' >Edit</button>
                    </td>
                    <td className='p-4'>
                      <button
                        className='border-[1px] border-red-300 rounded-xl hover:bg-red-800 cursor-pointer font-semibold px-4 py-2'
                        onClick={() => handleDelete(val._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {length > tasks.length && (
              <button className='mx-auto w-full mt-5 border-[1px] border-blue-300 hover:bg-blue-300 rounded-xl px-3 py-2' onClick={handleShowMore}>
                Show More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTask;
