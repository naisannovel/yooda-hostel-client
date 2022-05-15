import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import swal from 'sweetalert';
import { isAuthenticated, logOut, userInfo } from '../authentication/authUtilities';

const AdminRoute = ({ children }) => {

    const { role } = userInfo();

    const removeNormalUserAuth = () => {
        if (isAuthenticated() && (role !== undefined && role === 'user')) {

            logOut(() => < Navigate to = '/' / > )

            swal("opps!", "This site only available for yooda admin! \n use this email and password for login \n email: admin@mail.com \n password: 11111", "error")
        }
    }

    useEffect(removeNormalUserAuth, [])

    return isAuthenticated() && (role !== undefined && role === 'admin') ? children : < Navigate to = "/login" / > ;

};

export default AdminRoute;