import { useAuth } from 'context/AuthContext';
import React from 'react'
import { Navigate, useLocation } from 'react-router'


function RequiredAuth({children}) {
    let location = useLocation();
    const {userState, userDispatch } = useAuth();
    // console.log(userState.token)
    if (!userState.token.length) { 
        return <Navigate to="/login" replace />
    }
        // return <Navigate to="/login" state={{from :location  }} replace/>    }
    return children;
}

export default RequiredAuth;