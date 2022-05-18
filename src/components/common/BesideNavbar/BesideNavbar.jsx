import { IconPlus } from 'components/UI/Icons/Icons';
import { useUserData } from 'context/UserContext';
import React, {useEffect, useState} from 'react';
import {getAllUser} from 'utils/authService';
import "./BesideNavbar.css";

const BesideNavbar = () => {
    const [userFollowArray, setUserFollowArray] = useState([]);
    const { userData, setUserData } = useUserData();


    useEffect(() => {
        getAllUser(setUserFollowArray);
    },[])
    return (
        <div className="BesideNavbar">
            <div className='beside-navbar-container'>
                <div className='beside-container-header'>
                    <p className='fn-wg-700'>Who to Follow?</p>
                    <p className='fn-wg-700 red-txt'>Show More</p>
                </div>
                <hr/>
                <div className='beside-user-data-container'>
                    {userFollowArray.map(user => (
                        <div className='user-data-beside-section' key={user.userId}>
                            <div className='user-data-beside-section-name'>
                                {user?.photo.length ?
                                    <img src={user.photo} className='handle-img-np user-img' />
                                    : <span className='handle-img-np profile-img'>
                                        {user.name ? user.name[0].toUpperCase() : "D"}
                                        </span>
                                    }
                                <p className='fn-wg-700 lg-txt'>{user.name}</p>
                            </div>
                            <span>  { userData.userId !== user.userId &&
                                (userData.followers.some(i => i.userId === user.userId) ?
                                <span className='user-data-beside-section-name beside-action fn-wg-700 hover gray-txt lg-txt' >
                                    following
                                </span>
                                : <span className='user-data-beside-section-name beside-action fn-wg-700  hover lg-txt'
                                >
                                    follow <IconPlus />
                                </span>)}</span>
                        </div>
                    ))
                } </div>
            </div>
        </div>
    )
}

export default BesideNavbar
