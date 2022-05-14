import React from 'react';
import {
    IconComment,
    IconHeart,
    IconHeartFill,
    IconsBookmark,
    IconsBookmarkFill,
    IconShare
} from '../../UI/Icons/Icons';
import {useAuth} from "context/AuthContext";
import "./Post.css";
import {firestore} from 'firebase.config';
import {doc, updateDoc} from 'firebase/firestore';

const Post = ({props}) => {
    const {userState, userDispatch} = useAuth();
    console.log(props)

    const AddLikeOnPost = () => {
        const postToUpdate = doc(firestore, `posts/${props.postid
            }`);
        console.log(postToUpdate);
        let response = updateDoc(postToUpdate, { [props.postid] : {
            ...props,
            ["likes"]: {...props.likes,likedBy: [...props.likes.likedBy, userState.user.userId],
                likeCount: props.likes.likeCount + 1
            }
        }});
        console.log(response);
    }

    const RemoveLikeOnPost = () => { 
        const postToUpdate = doc(firestore, `posts/${props.postid
        }`);
    console.log(postToUpdate);
    let response = updateDoc(postToUpdate, { [props.postid] : {
        ...props,
        ["likes"]: {...props.likes,
            likedBy: [...props.likes.likedBy.filter(userID=> userID !== userState.user.userId)],
            likeCount: props.likes.likeCount - 1
        }
    }});
    console.log(response);
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
                    <span className='fn-wg-700'>
                        {
                        props.user.name || "dummy name"
                    }</span>
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
                    <span className='hover'><IconShare/></span>
                    <span className='hover'><IconsBookmark /></span>
                    <span className='hover'><IconsBookmarkFill/></span>
                </div>
            </div>
        </div>
    )
}

export default Post
