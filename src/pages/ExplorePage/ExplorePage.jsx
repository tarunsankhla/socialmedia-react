import Post from 'components/common/Posts/Post';
import { firestore } from 'firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';
import React,{useState,useEffect} from 'react';
import "./ExplorePage.css";

const ExplorePage = () => {
  const [allDataArray, setAllDataArray] = useState([]);

  useEffect(() => onSnapshot(
      collection(firestore, "posts"), (doc) => {
          console.log(doc.docs.map(i => {
                  return {
                      ...(i.data()[i.id]),
                      postid: i.id
                  }
          }).filter(i => Object.keys(i).length > 2));
          setAllDataArray(() => [...doc.docs.map(i => {
              return {
                  ...(i.data()[i.id]),
                  postid: i.id
              }
      }).filter(i => Object.keys(i).length > 2)])
  }), [])
  return (
      <div>
          <div> {
              allDataArray.map(i => (
                  <Post props={i}
                      key={i.postid + i.createdTime} />
                 
              ))
          } </div>
      </div>
  )
}

export default ExplorePage