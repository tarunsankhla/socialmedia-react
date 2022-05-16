import AsideNavBar from 'components/common/AsideNavBar/AsideNavBar';
import BesideNavbar from 'components/common/BesideNavbar/BesideNavbar';
import Navbar from 'components/common/Navbar/Navbar';
import React from 'react';
import {Outlet} from 'react-router';

const Main = () => {
    return (
        <>
            <div className='main-container'>
                
                <div className='main-body'>
                    <AsideNavBar/>
                    <span className='outlet-body'>
                        <Outlet/>
                    </span>
                    <BesideNavbar />
                </div>

            </div>
        </>
    )
}

export default Main
