import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Task({ data }) {
  const navigate=useNavigate()
  const location = useLocation();
  const [taskDetail, setTaskDetail] = useState(data || {});
  const [deletedSuccessfully,setDeletedSuccessfully]=useState(null)
  const [error, setError] = useState(null);

  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
  console.log(id);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setError(null);
        const res = await fetch(`/api/task/${id}`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          const sanitizedContent = DOMPurify.sanitize(data.content);
          setTaskDetail({ ...data, content: sanitizedContent });
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.log(error);
        setError("An error occurred while fetching the task details.");
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);
  const handleDelete=async()=>{
    try {
        const res=await fetch(`/api/task/${taskDetail._id}`,{
            method:"DELETE"
        })
        const data=await res.json()
        if(res.ok){
           setDeletedSuccessfully(data.message)
        }
        setTimeout(()=>{
            navigate('/?tab=dashboard')
        },[1500])
    } catch (error) {
        console.log(error);
        
    }
  }
  const handleEdit=()=>{
    navigate(`/?tab=edit-task&id=${taskDetail._id}`)
  }
  if (error) {
    return (
      <div className='h-screen flex items-center justify-center'>
        {error}
      </div>
    );
  }
 
  if (!taskDetail.title) {
    return (
      <div className='h-screen flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  return (
    <div className='flex h-[70vh] mt-5 flex-col items-center justify-center'>
      <div className="flex items-center justify-center">
        <h1 className='text-4xl '>Title-</h1>
        <span className='text-3xl ml-2 '>{taskDetail.title}</span>
      </div>
      <hr className="w-full my-4 border-gray-500" />
      <h2 className='text-2xl mt-5 underline'>Content</h2>
      <div className='mt-5 mb-2' dangerouslySetInnerHTML={{ __html: taskDetail.content }} />
      <hr className="w-full my-4 border-gray-500" />
      <div className=" mt-5 mb-4">
        <span>Status-</span>
        <span>{taskDetail.status}</span>
      </div>
      <hr className="w-full my-4 border-gray-500" />
      <div className="m-2">
        <button onClick={handleDelete} className='ml-5 text-lg border-[1px] px-3 py-2 border-blue-300 rounded-xl hover:bg-blue-300'>Delete Task</button>
        <button onClick={handleEdit} className='ml-5 text-lg border-[1px] px-3 py-2 border-blue-300 rounded-xl hover:bg-blue-300'>Edit Task</button>
      </div>
      {
        deletedSuccessfully && <div className='mt-5 border-[1px] border-blue-300 px-3 py-2 '>
            {deletedSuccessfully}
        </div>
      }
    </div>
  );
}

export default Task;
