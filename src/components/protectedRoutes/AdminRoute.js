import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import swal from 'sweetalert';
import { isAuthenticated, logOut, userInfo } from '../authentication/authUtilities';

const AdminRoute = ({ children }) => {

    const { role } = userInfo();

    const removeNormalUserAuth = () => {
        if (isAuthenticated() && (role !== undefined && role === 'user')) {

            logOut(() => < Navigate to = '/' / > )

            swal("opps!", "This site only available for yooda admin! \n collect admin account from readme.md file", "error")
        }
    }

    useEffect(removeNormalUserAuth, [])

    return isAuthenticated() && (role !== undefined && role === 'admin') ? children : < Navigate to = "/login" / > ;

};

export default AdminRoute;