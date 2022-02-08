import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoRestaurant, IoShareSocialSharp, IoPeople, IoLogOut } from "react-icons/io5";
import { logOut, userInfo } from '../authentication/authUtilities';

const Sidebar = () => {

    const navigate = useNavigate();
    const { name } = userInfo();

    return (
        <div className='w-full h-screen bg-slate-100 grid place-items-center'>
            <div className='h-5/6 w-full flex flex-col justify-between items-center'>
                <div className='w-5/6'>
                    <div className="container flex flex-col justify-between items-center mb-12">
                        <span className='w-12 h-12 grid place-items-center rounded-full text-xl text-blue-900 font-bold border-4 border-blue-400'> { name?.trim()[0]?.toUpperCase() } </span>
                        <span className='text-lg font-bold text-blue-900'> { name?.trim().toUpperCase() } </span>
                    </div>
                    <NavLink to='food/list' className={(navInfo)=> (navInfo.isActive ? 'sidebar-item-active':'sidebar-item')}> <IoRestaurant className='mr-2 ml-6 text-gray-600'/> Food</NavLink>
                    <NavLink to='student/list' className={(navInfo)=> (navInfo.isActive ? 'sidebar-item-active mt-2':'sidebar-item mt-2')}> <IoPeople className='mr-2 ml-6 text-gray-600'/> Student</NavLink>
                    <NavLink to='distribute' className={(navInfo)=> (navInfo.isActive ? 'sidebar-item-active mt-2':'sidebar-item mt-2')}> <IoShareSocialSharp className='mr-2 ml-6 text-gray-600'/> Distribute</NavLink>
                </div>
                <span onClick={()=> logOut(()=> navigate('/',{ replace: true }) )} className='flex justify-start items-center cursor-pointer text-blue-900'> <IoLogOut className='mr-2 text-gray-600'/> Log Out</span>
            </div>
        </div>
    );
};

export default Sidebar;