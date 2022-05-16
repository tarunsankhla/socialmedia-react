import React,{useState} from 'react';
import {
    IconComment,
    IconHeart,
    IconHeartFill,
    IconPlus,
    IconsBookmark,
    IconsBookmarkFill,
    IconShare
} from '../../UI/Icons/Icons';
import {useAuth} from "context/AuthContext";
import "./Post.css";
import {firestore} from 'firebase.config';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import { useUserData } from 'context/UserContext';
import { GetIndividualUserData } from 'utils/authService';
import { Link, NavLink } from 'react-router-dom';

const Post = ({props}) => {
    const { userState, userDispatch } = useAuth();
    const { userData, setUserData } = useUserData();
    const [showCopied, setShowCopied] = useState(false);

    const urlClickHandler = () => {
        navigator.clipboard.writeText(
            `https://spaceverse.netlify.app/post/${props.user.userId}/${props.postid}`
        );
        setShowCopied(true);
        setTimeout(() => {
          setShowCopied(false);
        }, 2000);
    };
    
    const AddLikeOnPost = () => {
        try{
            const postToUpdate = doc(firestore, `posts/${props.postid}`);
            console.log(postToUpdate);
            let response = updateDoc(postToUpdate, { [props.postid] : {
                ...props,
                ["likes"]: {...props.likes,likedBy: [...props.likes.likedBy, userState.user.userId],
                    likeCount: props.likes.likeCount + 1
                }
            }});
            console.log(response);
        }
        catch(error) { 
            console.log("error");
        }
    }

    const RemoveLikeOnPost = () => { 
        try{
            const postToUpdate = doc(firestore, `posts/${props.postid}`);
            console.log(postToUpdate);
            let response = updateDoc(postToUpdate, { [props.postid] : {...props,
                ["likes"]: {...props.likes,
                    likedBy: [...props.likes.likedBy.filter(userID=> userID !== userState.user.userId)],
                    likeCount: props.likes.likeCount - 1
                }}
            });
            console.log(response);
            
        }
        catch(error) { 
            console.log("error");
        }
    }

    const AddPostInBookmarkHandler = async () => { 
        
        try {
            const userToUpdate = doc(firestore, `users/${userState.user.userId}`);
            console.log(userToUpdate,userData);
            // let response = await updateDoc(userToUpdate, {
            //     [userState.user.userId]: {
            //         ...userData,
            //         ["bookmarks"]: [ ...userData.bookmarks,{...props} ]}
            // });
            let response = await updateDoc(userToUpdate, {
                [userState.user.userId]: {
                    ...userData,
                    ["bookmarks"]: [ ...userData.bookmarks,props.postid ]}
            });
            console.log(response,props);
            GetIndividualUserData(userState.user.userId, setUserData);
        }
        catch(error) { 
            console.log("error");
        }
    }

    const RemovePostFromBookmarkHandler = () => { 
        try {
            const userToUpdate = doc(firestore, `users/${userState.user.userId}`);
            console.log(userToUpdate,userData);
            let response = updateDoc(userToUpdate, {
                [userState.user.userId]: {
                    ...userData,
                    ["bookmarks"]: [...userData.bookmarks.filter(post => post !== props.postid ) ]}
            });
            console.log(response);
            GetIndividualUserData(userState.user.userId, setUserData);
        }
        catch(error) { 
            console.log("error");
        }
    }

    const AddUserAsFollowersHandler = async () => { 
 
        try {
            const userToUpdate = doc(firestore, `users/${userState.user.userId}`);
            console.log(userToUpdate,userData,userState.user.userId);
            let response = await updateDoc(userToUpdate, {
                [userState.user.userId]: {
                    ...userData,
                    ["followers"]: [ ...userData.followers,{...props.user} ]}
            });
            console.log(response);

            const followingUserToUpdate = doc(firestore, `users/${props.user.userId}`);
            console.log(followingUserToUpdate, userData, props.user.userId);

            let response1 = await getDoc(followingUserToUpdate);
            console.log(response1.data(), response1.id);
            console.log(response1.data()[props.user.userId]);

            var otherUserData = response1.data()[props.user.userId];
            let response2 = updateDoc(followingUserToUpdate, {
                [props.user.userId]: {
                    ...otherUserData,
                    ["following"]: [...otherUserData.following, {
                            name: userData.name,
                            userId: userData.userId,
                            photo: userData.photo,
                            emailId : userData.emailId,
                        }]
                }
            });
            console.log(response2);
            await GetIndividualUserData(userState.user.userId, setUserData);
        }
        catch(error) { 
            console.log("error");
        }
    }

    const RemoveUserFromFollowersHandler = async() => { 

        try {
            const userToUpdate = doc(firestore, `users/${userState.user.userId}`);
            console.log(userToUpdate,userData,userState.user.userId);
            let response = await updateDoc(userToUpdate, {
                [userState.user.userId]: {
                    ...userData,
                    ["followers"]: [ ...userData.followers.filter(user=> user.userId !==props.user.userId) ]}
            });
            console.log(response);

            const followingUserToUpdate = doc(firestore, `users/${props.user.userId}`);
            console.log(followingUserToUpdate, userData, props.user.userId);

            let response1 = await getDoc(followingUserToUpdate);
            console.log(response1.data(), response1.id);
            console.log(response1.data()[props.user.userId]);

            var otherUserData = response1.data()[props.user.userId];
            let response2 = updateDoc(followingUserToUpdate, {
                [props.user.userId]: {
                    ...otherUserData,
                    ["following"]: [...otherUserData.following.filter(user=> user.userId !== userState.user.userId)]
                }
            });
            console.log(response2);
            await GetIndividualUserData(userState.user.userId, setUserData);
        }
        catch(error) { 
            console.log("error");
        }
    }

    return (
        <div className='post-data-container relative'>
            <div>
            <Link to={`/profile/${props.user.userId}`}>{
                props.user?.photo.length ?
                    <img src={props.user.photo} className='handle-img-np' />
                    : <span className='handle-img-np handle-img-ph'>
                        {  props.user.name ? props.user.name[0].toUpperCase() : "D"   }
                    </span>
            }</Link>
            </div>
            <div className='post-data-show-container'>
                <div className='flex post-data-content-header'>
                    <p>
                    <span className='fn-wg-700'>{props.user.name || "dummy name"}</span>
                        {props.user.userId !== userData.userId &&
                            (userData.followers.some(user => user.userId === props.user.userId ) ?
                            <span className='post-data-follow-container hover gray-txt lg-txt' onClick={RemoveUserFromFollowersHandler}>
                                following
                            </span>
                            : <span className=' post-data-follow-container hover gray-txt lg-txt'
                                onClick={AddUserAsFollowersHandler}>
                                follow <IconPlus />
                                </span>)}
                        
                    </p>
                    <span className='gray-txt lg-txt'>
                        {
                        props.createdAt
                    }</span>
                </div>
                <Link to={`/post/${props.user.userId}/${props.postid}`}>
                    <div className='post-data-content-container'>
                        {
                            props.content
                        }
                    </div>
                </Link>
                <div className='post-data-action-container'>
                    <span className='hover flex flex-center lg-txt'>
                        {props.likes.likedBy.includes(userState.user.userId) ?
                            <span className='hover' onClick={RemoveLikeOnPost}>
                                <IconHeartFill />
                            </span>
                            : <span className='hover' onClick={AddLikeOnPost}>
                                <IconHeart />
                            </span>}
                        {props.likes.likedBy.length}
                    </span>
                    <span className='hover'>
                        <Link to={ `/post/${props.user.userId}/${props.postid}`}><IconComment /></Link></span>
                    <span className='hover' onClick={urlClickHandler}><IconShare /></span>
                    {
                        userData.bookmarks.some(post => post === props.postid)
                            ? <span className='hover' onClick={RemovePostFromBookmarkHandler}><IconsBookmarkFill /></span>
                            : <span className='hover'  onClick={ AddPostInBookmarkHandler}><IconsBookmark /></span>
                    }
                    {showCopied && <p className="copied-clipboard">Copied!</p>}
                </div>
            </div>
        </div>
    )
}

export default Post
