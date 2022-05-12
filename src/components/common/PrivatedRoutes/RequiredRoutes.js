import React from 'react'
import { Navigate, useLocation } from 'react-router'


function RequiredAuth({children}) {
    // let location = useLocation();
    // let auth = useAuth();
    // // console.log(auth.user)
    // if (!auth.userState) { 
    //     return <Navigate to="/" state={{from :location  }} replace/>    }
    return children;
}

export default RequiredAuth;