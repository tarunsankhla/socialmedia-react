import { NormalButton } from 'components/UI/Buttons/buttons';
import { IconArrowBack, IconComment, IconHeart, IconsBookmark, IconThreeDots } from 'components/UI/Icons/Icons';
import { useUserData } from 'context/UserContext';
import { firestore } from 'firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState,useEffect } from 'react';
import {useNavigate, useParams} from 'react-router';
import { GetIndividualPostData } from 'utils/postService';
import {v4 as uuid} from "uuid";
import "./PostPage.css";

const PostPage = () => {
    const { userID, postID } = useParams();
    const [postData, setPostData] = useState({});
    const { userData, setUserData } = useUserData();
    const [comment, setComment] = useState("");
    const [toggleComment, setToggleComment] = useState(true);
    const [toggleEdit, setToggleEdit] = useState(false);
    const navigate = useNavigate();
    console.log(userID, postID, useParams());
    

    useEffect(() => {
        GetIndividualPostData(postID,setPostData)
    }, []);

    const AddCommentToPost = () => { 
        try{
            const postToUpdate = doc(firestore, `posts/${postData.postid}`);
            console.log(postToUpdate);
            let newComment = {
                content: comment,
                createdTime : new Date().getTime(),
                createdAt: new Date().toDateString(),
                commentId: uuid(),
                user: {
                    name: userData.name,
                    photo: userData.photo,
                    userId: userData.userId,
                    emailId: userData.emailId
                }
            }
            console.log(newComment);
            let response = updateDoc(postToUpdate, { [postData.postid] : {
                ...postData,
                ["comments"]: [...postData.comments, {...newComment}]
            }});
            console.log(response);
            GetIndividualPostData(postID, setPostData);
            setComment("");
        }
        catch(error) { 
            
            console.log("error");
        }
    }
    console.log("post data", postData);
    return (
        <div className='post-page-main-container'>
            <div className='post-page-back-container fn-wg-700'>
                <span onClick={()=>navigate(-1)}><IconArrowBack /></span> Post</div>
            <div className='post-page-header flex'>
                <span className='flex align-center'>
                    {postData?.user?.photo.length ?
                        <img src={postData.user.photo} className='handle-img-np user-img' />
                        : <span className='handle-img-np profile-img'>
                            {postData?.user?.name ? postData?.user?.name[0].toUpperCase() : "D"}
                            </span>
                    }
                    <span className='fn-wg-700'>{postData?.user?.name || "dummy name"}</span>
                </span>
                <span className="relative">
                   <span onClick={()=> setToggleEdit(prev=>!prev)}><IconThreeDots  /></span> 
                   {toggleEdit && <span className="absolute post-page-edit-container">
                        <button className='btn'>Edit</button>
                        <button className='btn'>Delete</button>
                    </span>}
                </span>
               
            </div>
            <p className='flex pd-10'>
                {postData.content}
            </p>
            <p className='flex gray-txt lg-txt pd-5'>
                {postData.createdAt}
            </p>
            <hr />
            <span className='fn-wg-700 post-page-like-show'>
                {postData?.likes?.likeCount} Likes
            </span>
            <hr />
            <div className="post-page-action-container">
                <IconHeart />
                <span onClick={()=>setToggleComment(prev=>!prev)}><IconComment /></span>
                <IconsBookmark />
            </div>
            <hr />
            {toggleComment &&
                <div className='flex post-page-add-comment-contatiner '>
                    {userData?.photo.length ?
                            <img src={userData.photo} className='handle-img-np user-img' />
                            : <span className='handle-img-np profile-img'>
                                {userData?.name ? userData?.name[0].toUpperCase() : "D"}
                                </span>
                    }
                    <input type="text" value={comment} onChange={ (e)=>setComment(e.target.value)} placeholder='Comment your reply' className='full-input'/>
                    <span onClick={AddCommentToPost}><NormalButton name="Post"/></span>
                </div>
            }
            <div>
                {postData?.comments?.map(comment => (
                    <div key={comment?.commentId}>
                        {/* {comment?.content}
                        {comment?.createdAt}
                        {comment?.user.name} */}
                        <div className='bg-gray post-data-container '>
                            <div> {
                                comment.user?.photo.length ?
                                    <img src={comment.user.photo} className='handle-img-np' />
                                    : <span className='handle-img-np handle-img-ph'>
                                        {  comment.user.name ? comment.user.name[0].toUpperCase() : "D"   }
                                    </span>
                            }
                            </div>
                            <div className='post-data-show-container'>
                                <div className='flex post-data-content-header'>
                                    <p>
                                    <span className='fn-wg-700'>{comment.user.name || "dummy name"}</span>
                                       
                                    </p>
                                    <span className='gray-txt lg-txt'>
                                        {
                                        comment.createdAt
                                    }</span>
                                </div>
                                <div className='post-data-content-container'> {
                                    comment.content
                                } </div>
                                {/* <div className='post-data-action-container'>
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
                                    <span className='hover'>
                                        <Link to={ `/post/${props.user.userId}/${props.postid}`}><IconComment /></Link></span>
                                    <span className='hover'><IconShare /></span>
                                    {
                                        userData.bookmarks.some(post => post.postid === props.postid)
                                            ? <span className='hover' onClick={RemovePostFromBookmarkHandler}><IconsBookmarkFill /></span>
                                            : <span className='hover'  onClick={ AddPostInBookmarkHandler}><IconsBookmark /></span>
                                    }
                                </div> */}
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default PostPage
