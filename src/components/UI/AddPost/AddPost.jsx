import React from 'react';
import { NormalButton } from '../Buttons/buttons';
import { IconEmojiInput, IconGifInput, IconImageInput } from '../Icons/Icons';
import "./AddPost.css";
// import { VAR_ENCODE_TOKEN } from "utils/routes";
import { v4 as uuid } from "uuid";
import { firestore } from "firebase.config";
import { doc, setDoc } from "firebase/firestore";

const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToLFJbTrVFnOBgjYC_-vGIIM4aQwuYco1Xww&usqp=CAU";

const initialPostObject = {
    title: "",
    date: new Date(),
    createdTime: new Date().getTime(),
    expiryTime: 5,
    maxVotes: 5,
    column1: {
      name: "Good features",
      feedbacks: [],
    },
    column2: {
      name: "Improvements",
      feedbacks: [],
    },
    column3: {
      name: "Add Features",
      feedbacks: [],
    },
    // _id :localStorage.getItem(VAR_ENCODE_TOKEN).user.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      followers: [],
      following: [],
      bookmarks: [],
  };
  
  
const AddPost = () => {

    
  const AddPost = async () => { 
    const userRef = doc(firestore, `posts`);
    try {
      await setDoc(userRef, {
        // ...dashboard,
        // [uuid()]: boardObject,
      });
      // Alert("success", "Nkew Project Added!!");
    } catch (err) {
      console.log(err.message)
      // Alert("info", err.message);
    }
  }
  return (
    <div className='create-buzz-container'>
    <div className='buzz-img-create'>
      <img src={img} className='user-img' alt='user-img'/>
    </div>
    <div className='create-buzz-input-container'>
      <textarea placeholder='Write something interesting' className='create-buzz-input' />
      <div className='create-buzz-action-container'>
        <div className='create-buzz-action-icon-container'>
          <IconImageInput />
          <IconEmojiInput />
          <IconGifInput />
        </div>
        <NormalButton name="Post"/>
      </div>
    </div>
  </div>
  )
}

export default AddPost