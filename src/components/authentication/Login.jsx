import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { MAIN_API } from '../../API/url';
import { Alert } from 'reactstrap';
import { isAuthenticated } from './authUtilities';
import Spinner from '../utilities/Spinner';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [spinner, setSpinner] = useState(false);
    const [errMsg, setErrMsg] = useState(null);

    const onSubmit = data => {
        setSpinner(true);

        axios.post(`${MAIN_API}/login`,data)
        .then(response =>{
            localStorage.setItem('token',JSON.stringify(response.data.token));
            localStorage.setItem('_id',response.data.data._id);
            const { exp } = jwt_decode(response.data.token);
            const expirationTime = new Date(exp * 1000);
            localStorage.setItem('expirationTime',expirationTime);
            navigate('/dashboard',{
                replace: true
            })
            setSpinner(false);
        })
        .catch(err=>{
            setSpinner(false);
            setErrMsg(err.response.data)
            setTimeout(()=>setErrMsg(null),2000)
        })
    };

    const redirectUser = () => {
        if (isAuthenticated()) return <Navigate to="/dashboard" />
    }

    return (
        <div className="h-screen bg-login grid place-items-center">
            { redirectUser() }
            {
                spinner ? <Spinner/>:
                <form onSubmit={handleSubmit(onSubmit)} className='w-2/5 flex flex-col items-center'>
                    { errMsg !== null && <Alert color='danger' className='text-lg w-full'>{errMsg}</Alert>}
                    <p className='text-4xl font-bold text-white'>Log in</p>
                    <hr className='h-0.5 w-full bg-gray-50 my-6' />

                    <input type="text" {...register("email", { required: true, pattern:/\S+@\S+\.\S+/,minLength:5,maxLength:255 })} className='w-3/5 rounded-input' name='email' placeholder='Enter Your Email' />
                    {errors.email && <span className='text-red-500 text-md'>required</span>}

                    <input type="text" {...register("password", { required: true,minLength:5,maxLength:255 })} className='w-3/5 rounded-input mt-6' name='password' placeholder='Enter Your Password' />
                    {errors.password && <span className='text-red-500 text-md'>required - minimum 5 characters</span>}

                    <input type="submit" value='Log In' className='rounded-button mt-6'/>
                    <p className='text-white mt-5'>Do not have any account? <Link to='/signup' className='text-blue-600 font-semibold underline'>Sign Up</Link></p>
                </form>
            }
        </div>
    );
};

export default Login;