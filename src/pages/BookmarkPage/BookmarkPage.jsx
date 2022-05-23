import Post from 'components/common/Posts/Post';
import {useUserData} from 'context/UserContext';
import { firestore } from 'firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import { GetIndividualUserData } from 'utils/authService';
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

    useEffect(() => onSnapshot(
        collection(firestore, "users"), (doc) => { 

            console.log(doc.docs.map(i => { 
                return i.data()[i.id]
            }).filter(user => user.userId === userData.userId));
            console.log(userData)
                    
            GetIndividualUserData(userData.userId, setUserData);
            // setUserData({ type: "getuserdata", payload: doc.docs.map(i => { 
            //     return i.data()[i.id]
            // }).filter(user => user.userId === userData.userId) });
            // console.log(doc.docs.map(i => {
            //     return {
            //         ...(i.data()[i.id]),
            //         postid: i.id
            //     }
            // }).filter(i => Object.keys(i).length > 2 && userData.bookmarks.includes(i.postid)));
            // let getAllpostData = doc.docs.map(i => {
            //     return {
            //         ...(i.data()[i.id]),
            //         postid: i.id
            //     }
            // }).filter(i => Object.keys(i).length > 2 && userData.bookmarks.includes(i.postid))
            //     setBookmarkPostArray([...getAllpostData])
            // console.log(getAllpostData);
            // setTimeout(() => {
            //     (async () => {
                
            //         let getAllpostData = (await getAllPost()).filter(i => Object.keys(i).length > 2 && userData?.bookmarks.includes(i.postid));
            //         setBookmarkPostArray([...getAllpostData])
            //         console.log(getAllpostData,userData);
               
            //     })()
            // }, 0)
        }),[])

    useEffect(() => {
        (async () => {
                
            let getAllpostData = (await getAllPost()).filter(i => Object.keys(i).length > 2 && userData?.bookmarks.includes(i.postid));
            setBookmarkPostArray([...getAllpostData])
            console.log(getAllpostData,userData);
       
        })()
        
        console.log(userData,"teast")
     },[userData])
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
