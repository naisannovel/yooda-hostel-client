import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
            <div>
                <div className='w-1/5 fixed top-0 right-0 left-0 bottom-0'> <Sidebar/> </div>
                <div className='w-4/5 ml-auto'>
                    <Outlet/>
                </div>
            </div>
    );
};
 
export default Dashboard;