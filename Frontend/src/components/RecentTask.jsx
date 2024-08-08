import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function RecentTask() {
  const { currentUser } = useSelector(state => state.user);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setError(null);
        const res = await fetch(`/api/user/tasks/${currentUser._id}?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setTasks(data.tasks);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    if (currentUser) {
      fetchTask();
    }
  }, [currentUser]);

  return (
    <div className='p-6  '>
      <h1 className='text-3xl font-semibold text-white text-center mb-6'>Recent Tasks</h1>
      <div className='w-full max-w-4xl mx-auto overflow-x-auto bg-transparent'>
        <table className='w-full mt-6 bg-gray-800 text-white rounded-lg shadow-md border border-gray-700'>
          <thead className='bg-blue-600'>
            <tr>
              <th className='p-4 text-left'>S no.</th>
              <th className='p-4 text-left'>Title</th>
              <th className='p-4 text-left'>Status</th>
              <th className='p-4 text-left'>Created At</th>
              <th className='p-4 text-left'>Edit</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.map((val, idx) => (
              <tr key={val._id} className='border-b border-gray-600'>
                <td className='p-4'>{idx + 1}</td>
                <Link to={`/?tab=task&id=${val._id}`}>
                  <td className='p-4 cursor-pointer hover:underline hover:text-blue-300'>{val.title}</td>
                </Link>
                <td className='p-4'>{val.status}</td>
                <td className='p-4'>{new Date(val.createdAt).toLocaleDateString()}</td>
                <td className='p-4'>
                  <Link to={`/?tab=edit-task&id=${val._id}`}>
                    <button className='border border-blue-300 rounded-xl px-4 py-2 hover:bg-blue-300 text-white font-semibold'>
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-[74%] mx-auto mt-6 flex items-center justify-center">
        <Link to='/?tab=all-task'>
          <button className='border border-blue-300 rounded-xl px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold'>
            Show All Tasks
          </button>
        </Link>
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}

export default RecentTask;
