import React, { useState,useEffect } from 'react';
import {useParams} from 'react-router';
import { GetIndividualPostData } from 'utils/postService';
import "./PostPage.css";

const PostPage = () => {
    const { userID, postID } = useParams();
    const [postData, setPostData] = useState({});
    console.log(userID, postID, useParams())
    useEffect(() => {
        GetIndividualPostData(postID,setPostData)
     }, []);
    return (
        <div>PostPage</div>
    )
}

export default PostPage
