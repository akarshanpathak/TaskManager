import React from 'react'

function RecentTask() {
  return (
    <div className='mt-4'>
      <h1 className='font-semibold text-center text-3xl'>Recent Tasks</h1>
      <div className="flex justify-center items-center">
      <table className='mt-[3vh] shadow-gray-800 flex flex-col overflow-y-scroll justify-center items-center'>
        <thead className='flex overflow-y-scroll sm:gap-20 gap-[15vw]   '>
            <tr className=''>S no.</tr>
            <tr className=''>Title</tr> 
            <tr className=''>Content</tr>
            <tr className=''>Status</tr>
        </thead>
        <tbody className='flex justify-around overflow-y-scroll  gap-[15vw] sm:gap-20 ml-[2vh] mt-[2vh]'>
            <tb className=''>1</tb>
            <tb className=''>Todo app</tb>
            <tb className=''>Create a app</tb>
            <tb className=''>Pending</tb>
        </tbody>
       
      </table>
      </div>
    </div>
  )
}

export default RecentTask
