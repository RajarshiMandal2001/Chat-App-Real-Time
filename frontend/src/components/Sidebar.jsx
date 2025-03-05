import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
 
const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const {otherUsers} = useSelector(store => store.user);

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.filter((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers(conversationUser));
        }else{
            toast.error("User not found!");
        }
    }

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='input input-bordered rounded-md' type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-zinc-700 text-white'>
                    <BiSearchAlt2 className='w-6 h-6 outline-none'/>
                </button>
            </form>
            <div className="divider px-3"></div> 

            <OtherUsers/> 
        </div>
    )
}

export default Sidebar