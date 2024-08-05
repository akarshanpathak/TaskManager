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
    <div className='mt-4'>
      <h1 className='font-semibold text-center text-3xl'>Recent Tasks</h1>
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
              </tr>
            </thead>
            <tbody>
              {tasks && tasks.map((val, idx) => (
                <tr key={val._id} className='border-b'>
                  <td className='p-4'>{idx + 1}</td>
                 <Link to={`/?tab=task&id=${val._id}`}> <td className='p-4 cursor-pointer hover:underline hover:text-blue-300'>{val.title}</td></Link>
                  <td className='p-4'>{val.status}</td>
                  <td className='p-4'>{new Date(val.createdAt).toLocaleDateString()}</td>
                  <td className='p-4'>
                    <Link to={`/?tab=edit-task&id=${val._id}`}>
                      <button className='border-[1px] border-blue-300 rounded-xl hover:bg-blue-300 cursor-pointer font-semibold px-4 py-2'>Edit</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Link to='/?tab=all-task'>
        <div className="w-[74%] mx-auto flex items-center justify-center">
          <button className='w-full mx-auto mt-5 border-[1px] rounded-xl px-3 py-2 hover:bg-blue-300'>
            Show All Tasks
          </button>
        </div>
      </Link>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}

export default RecentTask;
