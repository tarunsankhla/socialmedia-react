import { NormalButton } from 'components/UI/Buttons/buttons';
import { IconArrowBack, IconClose, IconComment, IconHeart, IconHeartFill, IconsBookmark, IconsBookmarkFill, IconThreeDots } from 'components/UI/Icons/Icons';
import { useUserData } from 'context/UserContext';
import { firestore } from 'firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState,useEffect } from 'react';
import {useNavigate, useParams} from 'react-router';
import { GetIndividualUserData } from 'utils/authService';
import { AddLikeOnPost, AddPostInBookmarkHandler, deletePost, GetIndividualPostData, RemoveLikeOnPost, RemovePostFromBookmarkHandler } from 'utils/postService';
import {v4 as uuid} from "uuid";
import "./PostPage.css";

const PostPage = () => {
    const { userID, postID } = useParams();
    const [postData, setPostData] = useState({});
    const { userData, setUserData } = useUserData();
    const [comment, setComment] = useState("");
    const [postContent, setPostContent] = useState(postData?.content ?? "");
    const [toggleComment, setToggleComment] = useState(true);
    const [toggleAction, settoggleAction] = useState(false);
    const [toggleEdit, settoggleEdit] = useState(false);
    const navigate = useNavigate();
    console.log(userID, postID, useParams());
    

    useEffect(() => {
        GetIndividualPostData(postID,setPostData)
    }, []);

    const AddCommentToPost = async () => { 
        try{
            const postToUpdate = doc(firestore, `posts/${postID}`);
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
            await updateDoc(postToUpdate, { [postID] : {
                ...postData,
                ["comments"]: [...postData.comments, { ...newComment }],
                postid:postID
            }});
            await GetIndividualPostData(postID, setPostData);
            setComment("");
        }
        catch(error) { 
            
            console.log("error");
        }
    }

    const UpdatePost = async () => { 
        try{
            const postToUpdate = doc(firestore, `posts/${postID}`);
            console.log(postToUpdate);
            
            await updateDoc(postToUpdate, { [postID] : {
                ...postData,
                ["content"]: postContent,
                postid:postID
            }});
            await GetIndividualPostData(postID, setPostData);
            settoggleAction(false);
            settoggleEdit(false);
        }
        catch(error) { 
            console.log("error");
        }

    }
    console.log("post data", postData);
    return (
        <div className='post-page-main-container'>
            <div className='post-page-back-container fn-wg-700'>
                <span onClick={() => navigate(-1)}><IconArrowBack /></span> Post
            </div>
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
                    {userData.userId === userID && <span onClick={() => settoggleAction(prev => !prev)}><IconThreeDots /></span>}
                    {toggleAction &&
                        <span className="absolute post-page-edit-container">
                            <span className='fn-wg-700 flex align-center full-width space-btwn'>
                                Action <span onClick={() => settoggleAction(prev => !prev)}><IconClose /></span>
                            </span>
                            <NormalButton class='btn post-page-editor-btn' click={() => {
                                settoggleEdit(prev => !prev);
                                setPostContent(postData.content);
                            }}  name="Edit" />
                            <NormalButton class='btn post-page-editor-btn' click={() => {
                                navigate(-1);
                                deletePost(postID); }} name="Delete"/>
                    </span>}
                </span>
               
            </div>
            <p className='flex pd-10' style={{whiteSpace: "pre-wrap",textAlign:"justify"}}>
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
                <span>
                        {postData?.likes?.likedBy?.includes(userData.userId) ?
                        <span className='hover' onClick={async () => {
                            await RemoveLikeOnPost(postData, userData?.userId,postID);
                            await GetIndividualPostData(postID, setPostData);
                        }}>
                                <IconHeartFill />
                            </span>
                        : <span className='hover' onClick={async() => {
                            await AddLikeOnPost(postData, userData.userId,postID);
                            await GetIndividualPostData(postID, setPostData);
                        }}>
                                <IconHeart />
                            </span>}
                    </span>
                <span onClick={()=>setToggleComment(prev=>!prev)}><IconComment /></span>
                {
                        userData?.bookmarks?.some(post => post === postID)
                        ? <span className='hover' onClick={async () => {
                            await RemovePostFromBookmarkHandler(userData, setUserData, postID, userData.userId);
                            await GetIndividualUserData(userID, setUserData);
                            await GetIndividualPostData(postID, setPostData);
                        }
                        }><IconsBookmarkFill /></span>
                        : <span className='hover' onClick={async () => {
                            await AddPostInBookmarkHandler(userData, postData, setUserData, postID, userData.userId);
                            await GetIndividualUserData(userID, setUserData);
                            await GetIndividualPostData(postID, setPostData);
                        }}><IconsBookmark /></span>
                    }
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
                    <input type="text" value={comment} onChange={ (e)=>setComment(e.target.value)} 
                            placeholder='Comment your reply' className='full-input'/>
                    <span onClick={AddCommentToPost}>
                        <NormalButton name="Comment" color="red" class="comment-btn" />
                    </span>
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
            { toggleEdit &&
                <div className='fixed post-page-edit-modal'>
                    <span className='edit-post-header fn-wg-700 flex align-center full-width space-btwn pd-5'>
                        <h1>Edit Post</h1> <span onClick={() => settoggleEdit(prev => !prev)}><IconClose /></span>
                    </span>
                    <div className='post-page-edit-modal-container pd-5'>
                        <textarea value={postContent} className="post-page-edit-input pd-5 bg-gray"
                            onChange={(e)=>setPostContent(e.target.value)}/>
                       
                        <span onClick={UpdatePost}>
                            <NormalButton name="Save Post" color="red" />
                        </span>
                    </div>
                </div>
            }
        </div>
    )
}

export default PostPage
