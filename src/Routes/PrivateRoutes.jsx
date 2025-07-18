import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();
    if(loading){
        return <span className="loading loading-spinner loading-xl"></span>;
    }
    if(!user){
        return <Navigate to="/login" />;
    }
    return children;
};

export default PrivateRoutes;