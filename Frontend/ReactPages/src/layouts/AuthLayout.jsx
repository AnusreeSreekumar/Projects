import React from 'react'
import {Outlet, Navigate} from 'react-router-dom';
import checkAuth from '../utils/checkAuth';
import NotFound from '../components/NotFound';

const AuthLayout = () => {
    const userType = checkAuth();
    if(userType.loginRole == 'admin'){

     return <Navigate to='/admin-dashboard' />;
    }
    return <Outlet />
    else{

      return <NotFound />        
    }
};

export default AuthLayout