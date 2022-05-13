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

const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToLFJbTrVFnOBgjYC_-vGIIM4aQwuYco1Xww&usqp=CAU";

const initialPostObject = {
    content: "",
    date: new Date(),
    createdTime: new Date().getTime(),
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    comments: [],
    user: localStorage.getItem(ROUTES.VAR_ENCODE_TOKEN) ?? ""
};


const AddPost = () => {

    const [Post, setPost] = useState(initialPostObject);
    const {userState, userDispatch} = useAuth();

    const AddPostHandler = async () => {
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
            await setDoc(userRef, { // ...dashboard,
                [postId]: Post
            });
            // Alert("success", "Nkew Project Added!!");
        } catch (err) {
            console.log(err.message)
            // Alert("info", err.message);
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
                <img src={img}
                    className='user-img'
                    alt='user-img'/>
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
                        <IconImageInput/>
                        <IconEmojiInput/>
                        <IconGifInput/>
                    </div>
                    <span onClick={AddPostHandler}><NormalButton name="Post"/></span>

                </div>
            </div>
        </div>
    )
}

export default AddPost
