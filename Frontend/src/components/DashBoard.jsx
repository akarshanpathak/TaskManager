import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdTask } from 'react-icons/md';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { MdPending } from 'react-icons/md';
import { HiArrowNarrowUp } from 'react-icons/hi';

function DashBoard() {
  const { currentUser } = useSelector(state => state.user);
  const [stats, setStats] = useState({ totalTasks: 0, completedTasks: 0, pendingTasks: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/user/tasks/stats/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (currentUser) {
      fetchStats();
    }
  }, [currentUser]);

  return (
    <div className='p-6 bg-transparent  '>
      <h1 className='text-3xl font-semibold text-white text-center mb-6'>Task Details</h1>
      <div className="flex flex-wrap gap-6 justify-center mb-5 bg-transparent">
        {/* Total Tasks Card */}
        <div className='bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 p-6 rounded-xl border-2 border-blue-300 shadow-lg text-white flex flex-col gap-4 md:w-72 w-full'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-gray-300 text-md uppercase'>Total Tasks</h3>
              <p className='text-3xl font-semibold'>{stats.totalTasks}</p>
            </div>
            <MdTask className='bg-white text-blue-700 rounded-full text-6xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-blue-200 flex items-center'>
              <HiArrowNarrowUp />
              {stats.totalTasks}
            </span>
            <div className='text-gray-300'>Last Month Task</div>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className='bg-gradient-to-r from-green-700 via-green-600 to-green-500 p-6 rounded-xl border-2 border-green-300 shadow-lg text-white flex flex-col gap-4 md:w-72 w-full'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-gray-300 text-md uppercase'>Completed Tasks</h3>
              <p className='text-3xl font-semibold'>{stats.completedTasks}</p>
            </div>
            <IoCheckmarkDoneCircle className='bg-white text-green-700 rounded-full text-6xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-200 flex items-center'>
              <HiArrowNarrowUp />
              {stats.completedTasks}
            </span>
            <div className='text-gray-300'>Last Month Task</div>
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div className='bg-gradient-to-r from-red-700 via-red-600 to-red-500 p-6 rounded-xl border-2 border-red-300 shadow-lg text-white flex flex-col gap-4 md:w-72 w-full'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-gray-300 text-md uppercase'>Pending Tasks</h3>
              <p className='text-3xl font-semibold'>{stats.pendingTasks}</p>
            </div>
            <MdPending className='bg-white text-red-700 rounded-full text-6xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-red-200 flex items-center'>
              <HiArrowNarrowUp />
              {stats.pendingTasks}
            </span>
            <div className='text-gray-300'>Last Month Task</div>
          </div>
        </div>
      </div>
      {error && <p className="text-red-400 text-center mt-4">{error}</p>}
    </div>
  );
}

export default DashBoard;
