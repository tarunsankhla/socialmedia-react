import React, {useEffect, useState} from 'react';
import AddPost from 'components/UI/AddPost/AddPost';
import {getAllPost} from '../../utils/postService';
import {collection, doc, onSnapshot} from 'firebase/firestore';
import {firestore} from '../../firebase.config';
import Post from '../../components/common/Posts/Post';
import "./HomePage.css";

const HomePage = () => {
    const [allDataArray, setAllDataArray] = useState([]);
    useEffect(() => {
        getAllPost();
    }, [])

    useEffect(() => onSnapshot(collection(firestore, "posts"), (doc) => {
        // console.log(doc.docs)
        // console.log(doc.docs.map(i => {
        //     return {
        //         ...(i.data()[i.id]),
        //         postid: i.id
        //     }
        // }))
        setAllDataArray(() => [...doc.docs.map(i => {
                return {
                    ...(i.data()[i.id]),
                    postid: i.id
                }
            })])
    }), [])
    return (
        <div>
            <AddPost/>
            <div> {
                allDataArray.map(i => (
                    <Post props={i}
                        key={
                            i.postid
                        }/>
                ))
            } </div>
        </div>
    )
}

export default HomePage
