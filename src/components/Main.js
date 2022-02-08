import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import Dashboard from './dashboard/Dashboard';
import Distribute from './dashboard/Distribute';
import FoodList from './dashboard/FoodList';
import StudentList from './dashboard/StudentList';
import AdminRoute from './protectedRoutes/AdminRoute';

const Home = () => {

    return (
            <Routes>
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
                <Route path='/dashboard' element={ <AdminRoute> <Dashboard/> </AdminRoute> }>
                    <Route path='food/list' element={ <AdminRoute> <FoodList/> </AdminRoute> } />
                    <Route path='student/list' element={ <AdminRoute> <StudentList/> </AdminRoute> } />
                    <Route path='distribute' element={ <AdminRoute> <Distribute/> </AdminRoute> } />
                    <Route path='/dashboard' element={ <AdminRoute> <Navigate to='food/list' /> </AdminRoute> } />
                </Route>
                <Route path='/*' element={ <Navigate to='/login' /> } />
            </Routes>
    );
};

export default Home;