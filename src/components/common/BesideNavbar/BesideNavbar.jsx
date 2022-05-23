import { IconPlus } from 'components/UI/Icons/Icons';
import { useUserData } from 'context/UserContext';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {getAllUser} from 'utils/authService';
import { AddUserAsFollowersHandler, RemoveUserFromFollowersHandler } from 'utils/postService';
import "./BesideNavbar.css";

const BesideNavbar = () => {
    const [userFollowArray, setUserFollowArray] = useState([]);
    const { userData, setUserData } = useUserData();

    const FollowUser = async(user) => { 
        await AddUserAsFollowersHandler(userData.userId, userData, setUserData, {
            user: {
                emailId: user.emailId, name: user.name,
                photo: user.photo,
                userId: user.userId
            }
        });
        getAllUser(setUserFollowArray);
    }


    const UnFollowUser = async(user) => { 
        await RemoveUserFromFollowersHandler(userData.userId, userData, setUserData, {
            user: {
                emailId: user.emailId, name: user.name,
                photo: user.photo,
                userId: user.userId
            }
        });
        getAllUser(setUserFollowArray);
    }
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
                    {userFollowArray.slice(0,7).map(user => (
                        <div className='user-data-beside-section' key={user?.userId + user?.updatedAt   }>
                            <Link to={`/profile/${user.userId}`}>
                                <div className='user-data-beside-section-name'>

                                    {user?.photo.length ?
                                        <img src={user.photo} className='handle-img-np user-img' />
                                        : <span className='handle-img-np profile-img'>
                                            {user.name ? user.name[0].toUpperCase() : "D"}
                                            </span>
                                        }
                                    <p className='fn-wg-700 lg-txt flex-cln '>
                                        <p className='lg-txt'>{user.name}</p>
                                        <p className='md-txt gray-txt'>{"@" + user?.emailId.split("@")[0]}</p></p>
                                
                                </div>
                            </Link>
                            <span>  { userData.userId !== user.userId &&
                                (userData?.following?.some(i => i.userId === user.userId) ?
                                <span className='user-data-beside-section-name beside-action fn-wg-700 hover gray-txt lg-txt'
                                   onClick={()=>UnFollowUser(user)}>
                                    following
                                </span>
                                : <span className='user-data-beside-section-name beside-action fn-wg-700  hover lg-txt'
                                    onClick={() =>FollowUser(user)}
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
