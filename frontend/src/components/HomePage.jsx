import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';
import axios from "axios";
import toast from "react-hot-toast";



const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector(store => store.user);

  const logoutHandler = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
        navigate("/login");
        toast.success(res.data.message);
        dispatch(setAuthUser(null));
        dispatch(setMessages(null));
        dispatch(setOtherUsers(null));
        dispatch(setSelectedUser(null));
    } catch (error) {
        console.error(error);
    }
}

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className='flex'>
      <div className='text-lg items-center flex flex-col justify-center font-bold mr-4'>
        <div className='flex flex-col items-center justify-center p-2'>
          Hi, {authUser?.fullName}
          <img alt="Tailwind CSS chat bubble component" src={ authUser?.profilePhoto } className='w-[8rem]'/>
        </div>
        <div>
          A simplistic chating platform 🔥
        </div>
        <div className='mt-2'>
          <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
        </div>
      </div>
      <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden border bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  )
}

export default HomePage