import React from 'react';
import {NormalButton} from '../Buttons/buttons';
import {IconEmojiInput, IconGifInput, IconImageInput} from '../Icons/Icons';
import "./AddPost.css";
import {ROUTES} from "utils/routes";
import {v4 as uuid} from "uuid";
import {firestore} from "firebase.config";
import {doc, setDoc} from "firebase/firestore";
import {useState} from 'react';
import {useAuth} from 'context/AuthContext';
import { useUserData } from 'context/UserContext';
import { useSelector } from 'react-redux';

const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToLFJbTrVFnOBgjYC_-vGIIM4aQwuYco1Xww&usqp=CAU";

const initialPostObject = {
    content: "",
    date: new Date(),
    createdTime: new Date().getTime(),
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    comments: [],
    user: localStorage.getItem(ROUTES.VAR_ENCODE_TOKEN) ?? "",
    likes: {
        likeCount: 0,
        likedBy: [],
        dislikedBy: []
    }
};


const AddPost = () => {

    const [Post, setPost] = useState(initialPostObject);
    const { userState, userDispatch } = useAuth();
    const { userData, setUserData } = useUserData()
    const selector = useSelector((state) => state);

    const AddPostHandler = async () => {
        
        if (Post.content.trim() === "") {
            alert("Input cannot be blank")
        } else {
            setPost((boardObj) => ({
                ...boardObj,
                "content": ""
            }));
            let postId = uuid();
            console.log(postId);
            Post.user = userState.user ?? "";
            Post.date = new Date();
            Post.createdTime = new Date().getTime();
            Post.createdAt = new Date().toDateString();
            Post.updatedAt = new Date().toDateString();
            console.log(Post);
            const userRef = doc(firestore, `posts/${postId}`);
            console.log(Post)
            try {
                await setDoc(userRef, { 
                    [postId]: Post
                });
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    const changeHandler = (e) => {
        setPost((boardObj) => ({
            ...boardObj,
            [e.target.name]: e.target.value
        }));
    }
    return (
        <div className='create-buzz-container'>
            <div className='buzz-img-create'>
                { userState?.user?.photo?.length ?
                    <img src={userState?.user?.photo} className='handle-img-np user-img' />
                    : <span className='handle-img-np handle-img-ph'>
                        {  userState.user.name ? userState.user.name[0].toUpperCase() : "D"   }
                    </span>}
            </div>
            <div className='create-buzz-input-container'>
                <textarea placeholder='Write something interesting' className='create-buzz-input'
                    onChange={changeHandler}
                    name="content"
                    value={
                        Post.content
                    }/>
                <div className='create-buzz-action-container'>
                    <div className='create-buzz-action-icon-container'>
                        <span className='hover'><IconImageInput/></span>
                        <span className='hover'><IconEmojiInput/></span>
                        <span className='hover'><IconGifInput/></span>
                    </div>
                    <span onClick={AddPostHandler}><NormalButton name="Post" class="post-btn hover-btn" color="red"/></span>

                </div>
            </div>
        </div>
    )
}

export default AddPost
