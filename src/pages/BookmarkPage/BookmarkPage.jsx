import Post from 'components/common/Posts/Post';
import {useUserData} from 'context/UserContext';
import React, {useEffect, useState} from 'react';
import {getAllPost} from 'utils/postService';
import "./BookmarkPage.css";

const BookmarkPage = () => {
    const {userData, setUserData} = useUserData();
    const [bookmarkPostArray, setBookmarkPostArray] = useState([]);
    console.log(userData);

    useEffect(() => {
        (async () => {
            let getAllpostData = (await getAllPost()).filter(i => Object.keys(i).length > 2 && userData.bookmarks.includes(i.postid));
            setBookmarkPostArray([...getAllpostData])
            console.log(getAllpostData);
        })()

    }, [])

    return (
      <div className='pd-10 flex-cln'>
        <h1 className='xxlg-txt fn-wg-700 pd-10'>Your Bookmarks</h1>
        <div> {
                bookmarkPostArray.map(i => (
                    <Post props={i}
                        key={i.postid + i.createdTime} />
                   
                ))
            } </div>
        </div>
    )
}

export default BookmarkPage
