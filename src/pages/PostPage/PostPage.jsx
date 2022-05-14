import React from 'react';
import {useParams} from 'react-router';
import "./PostPage.css";

const PostPage = () => {
    const {userID, postID} = useParams();
    console.log(userID, postID, useParams())
    return (
        <div>PostPage</div>
    )
}

export default PostPage
