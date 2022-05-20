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
import { Toast } from 'components/UI/Toast/Toast';
import { async } from '@firebase/util';

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
    
    const AddLikeOnPost = async () => {
        try{
            const postToUpdate = doc(firestore, `posts/${props.postid}`);
            await updateDoc(postToUpdate, { [props.postid] : {
                ...props,
                ["likes"]: {...props.likes,likedBy: [...props.likes.likedBy, userState.user.userId],
                    likeCount: props.likes.likeCount + 1
                }
            }});
            Toast("info","Liked a Post")
        }
        catch(error) { 
            Toast("error", "Failed" + error.message);
        }
    }

    const RemoveLikeOnPost = async () => { 
        try{
            const postToUpdate = doc(firestore, `posts/${props.postid}`);
            await updateDoc(postToUpdate, { [props.postid] : {...props,
                ["likes"]: {...props.likes,
                    likedBy: [...props.likes.likedBy.filter(userID=> userID !== userState.user.userId)],
                    likeCount: props.likes.likeCount - 1
                }}
            });
            Toast("info", "Disliked a Post");
        }
        catch(error) { 
            Toast("error", "Failed" + error.message);
        }
    }

    const AddPostInBookmarkHandler = async () => { 
        
        try {
            const userToUpdate = doc(firestore, `users/${userState.user.userId}`);
            await updateDoc(userToUpdate, {
                [userState.user.userId]: {
                    ...userData,
                    ["bookmarks"]: [ ...userData.bookmarks,props.postid ]}
            });
            Toast("info", "Bookmark Added");
            GetIndividualUserData(userState.user.userId, setUserData);
        }
        catch(error) { 
            Toast("error", "Failed" + error.message);
        }
    }

    const RemovePostFromBookmarkHandler = async () => { 
        try {
            const userToUpdate = doc(firestore, `users/${userState.user.userId}`);
            await updateDoc(userToUpdate, {
                [userState.user.userId]: {
                    ...userData,
                    ["bookmarks"]: [...userData.bookmarks.filter(post => post !== props.postid ) ]}
            });
            Toast("info", "Bookmark Removed");
            GetIndividualUserData(userState.user.userId, setUserData);
        }
        catch(error) { 
            Toast("error", "Failed" + error.message);
        }
    }

    const AddUserAsFollowersHandler = async () => { 
 
        try {
            const userToUpdate = doc(firestore, `users/${userState.user.userId}`);
            let response = await updateDoc(userToUpdate, {
                [userState.user.userId]: {
                    ...userData,
                    ["following"]: [ ...userData.following,{...props.user} ]}
            });

            const followingUserToUpdate = doc(firestore, `users/${props.user.userId}`);
            let response1 = await getDoc(followingUserToUpdate);
            var otherUserData = response1.data()[props.user.userId];
            let response2 = updateDoc(followingUserToUpdate, {
                [props.user.userId]: {
                    ...otherUserData,
                    ["followers"]: [...otherUserData.followers, {
                            name: userData.name,
                            userId: userData.userId,
                            photo: userData.photo,
                            emailId : userData.emailId,
                        }]
                }
            });

            Toast("info","Followed!")
            await GetIndividualUserData(userState.user.userId, setUserData);
        }
        catch(error) { 
            Toast("error", "Failed" + error.message);
        }
    }

    const RemoveUserFromFollowersHandler = async() => { 

        try {
            const userToUpdate = doc(firestore, `users/${userState.user.userId}`);
            let response = await updateDoc(userToUpdate, {
                [userState.user.userId]: {
                    ...userData,
                    ["following"]: [ ...userData.following.filter(user=> user.userId !==props.user.userId) ]}
            });


            const followingUserToUpdate = doc(firestore, `users/${props.user.userId}`);

            let response1 = await getDoc(followingUserToUpdate);
            var otherUserData = response1.data()[props.user.userId];
            let response2 = updateDoc(followingUserToUpdate, {
                [props.user.userId]: {
                    ...otherUserData,
                    ["followers"]: [...otherUserData.followers.filter(user=> user.userId !== userState.user.userId)]
                }
            });
            Toast("info","UnFollowed")
            await GetIndividualUserData(userState.user.userId, setUserData);
        }
        catch(error) { 
            Toast("error", "Failed" + error.message);
        }
    }

    return (
        <div className='post-data-container relative'>
            <div>
            <Link to={`/profile/${props?.user?.userId}`}>{
                props?.user?.photo.length ?
                    <img src={props?.user?.photo} className='handle-img-np' />
                    : <span className='handle-img-np handle-img-ph'>
                        {  props?.user?.name ? props?.user?.name[0].toUpperCase() : "D"   }
                    </span>
            }</Link>
            </div>
            <div className='post-data-show-container'>
                <div className='flex post-data-content-header'>
                    <p>
                    <span className='fn-wg-700'>{props?.user?.name || "dummy name"}</span>
                        {props?.user?.userId !== userData?.userId &&
                            (userData.following.some(user => user.userId === props.user.userId ) ?
                            <span className='post-data-follow-container hover gray-txt lg-txt fn-wg-700 ' onClick={RemoveUserFromFollowersHandler}>
                                following
                            </span>
                            : <span className=' post-data-follow-container hover gray-txt lg-txt fn-wg-700 '
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
                        {props?.likes?.likedBy?.includes(userState.user.userId) ?
                            <span className='hover' onClick={RemoveLikeOnPost}>
                                <IconHeartFill />
                            </span>
                            : <span className='hover' onClick={AddLikeOnPost}>
                                <IconHeart />
                            </span>}
                        {props?.likes?.likedBy?.length}
                    </span>
                    <span className='hover'>
                        <Link to={ `/post/${props.user.userId}/${props.postid}`}><IconComment /></Link></span>
                    <span className='hover' onClick={urlClickHandler}><IconShare /></span>
                    {
                        userData.bookmarks.some(post => post === props?.postid)
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
