import AsideNavBar from 'components/common/AsideNavBar/AsideNavBar';
import Navbar from 'components/common/Navbar/Navbar';
import React from 'react';
import { Outlet } from 'react-router';

const Main = () => {
  return (
    <>
    <div className='main-container'>    
        <Navbar />
        <div className='main-body'>
            <AsideNavBar />
            <span  className='outlet-body'>
                <Outlet />
            </span>
                {/* {loginShow ?
                    <LoginPage props={setLoginShow} />
                    : <SignUpPage  props={setLoginShow} />
             }
            <ToastContainer style={{ fontSize: "1.5em" }} /> */}
        </div>
    </div>
</>
  )
}

export default Main