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
    <div className='ml-5'>
      <h1 className='font-semibold text-3xl self-center text-center'>Task Details</h1>
      <div className="mt-4 p-2 flex flex-wrap gap-10">
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Tasks</h3>
              <p className='text-2xl'>{stats.totalTasks}</p>
            </div>
            <MdTask className='bg-blue-300 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-blue-300 flex items-center'>
              <HiArrowNarrowUp />
              {stats.totalTasks}
            </span>
            <div className='text-gray-500'>Last Month Task</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Completed Tasks</h3>
              <p className='text-2xl'>{stats.completedTasks}</p>
            </div>
            <IoCheckmarkDoneCircle className='bg-blue-300 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-blue-300 flex items-center'>
              <HiArrowNarrowUp />
              {stats.completedTasks}
            </span>
            <div className='text-gray-500'>Last Month Task</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Pending Tasks</h3>
              <p className='text-2xl'>{stats.pendingTasks}</p>
            </div>
            <MdPending className='bg-blue-300 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-blue-300 flex items-center'>
              <HiArrowNarrowUp />
              {stats.pendingTasks}
            </span>
            <div className='text-gray-500'>Last Month Task</div>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}

export default DashBoard;
