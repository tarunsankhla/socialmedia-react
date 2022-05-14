import React from 'react';
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
import {doc, updateDoc} from 'firebase/firestore';
import { useUserData } from 'context/UserContext';
import { GetIndividualUserData } from 'utils/authService';

const Post = ({props}) => {
    const { userState, userDispatch } = useAuth();
    const { userData, setUserData } = useUserData();
    console.log(props)

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

    const AddPostInBookmarkHandler = () => { 
        
        try {
            const userToUpdate = doc(firestore, `users/${userState.user.userId}`);
            console.log(userToUpdate,userData);
            let response = updateDoc(userToUpdate, {
                [userState.user.userId]: {
                    ...userData,
                    ["bookmarks"]: [ ...userData.bookmarks,{...props} ]}
            });
            console.log(response);
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
                    ["bookmarks"]: [...userData.bookmarks.filter(post => post.postid !== props.postid ) ]}
            });
            console.log(response);
            GetIndividualUserData(userState.user.userId, setUserData);
        }
        catch(error) { 
            console.log("error");
        }
    }
    return (
        <div className='post--data-container'>
            <div> {
                props.user?.photo.length ?
                    <img src={props.user.photo} className='handle-img-np' />
                    : <span className='handle-img-np handle-img-ph'>
                        {  props.user.name ? props.user.name[0].toUpperCase() : "D"   }
                    </span>
            }
            </div>
            <div className='post-data-show-container'>
                <div className='flex post-data-content-header'>
                    <p>
                    <span className='fn-wg-700'>{props.user.name || "dummy name"}</span>
                        {props.user.userId !== userData.userId &&
                            (userData.followers.some(USERID => USERID === userData.userId ) ?
                                <span>following  </span>
                                : <span>follow <IconPlus /></span>)}
                        
                    </p>
                    <span className='gray-txt lg-txt'>
                        {
                        props.createdAt
                    }</span>
                </div>
                <div> {
                    props.content
                } </div>
                <div className='post-data-action-container'>
                    <span>
                        {props.likes.likedBy.includes(userState.user.userId) ?
                            <span className='hover' onClick={RemoveLikeOnPost}>
                                <IconHeartFill />
                            </span>
                            : <span className='hover' onClick={AddLikeOnPost}>
                                <IconHeart />
                            </span>}
                        {props.likes.likedBy.length}
                    </span>
                    <span className='hover'><IconComment/></span>
                    <span className='hover'><IconShare /></span>
                    {
                        userData.bookmarks.some(post => post.postid === props.postid)
                            ? <span className='hover' onClick={RemovePostFromBookmarkHandler}><IconsBookmarkFill /></span>
                            : <span className='hover'  onClick={ AddPostInBookmarkHandler}><IconsBookmark /></span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Post
