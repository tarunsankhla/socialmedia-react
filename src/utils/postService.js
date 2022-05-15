import { async } from "@firebase/util";
import {
    firestore,
    firebaseAuth,
    signInAnonymously,
    signInWithPopup,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    googleAuthProvider,
    getDocs,
} from "firebase.config";
import {
    doc,
    getDoc,
    updateDoc,
    deleteField,
    collection,
    setDoc,
    query,
    orderBy,
    limit,
} from "firebase/firestore";
import { GetIndividualUserData } from "./authService";


// get all data
const getAllPost =async () => {
    const collectionRef = collection(firestore, "posts")
  try {
    let response = await getDocs(collectionRef);
      console.log(response.docs, response)
      console.log(response.docs.map(i => {
        return { ...(i.data()[i.id]), postid: i.id }
      }))
      // setData(res1.data() ?? {});
      return [...response?.docs.map(i => {
        return { ...(i.data()[i.id]), postid: i.id }
      })]

    } catch (err) {
        console.log(err);
        // Alert("error", err.meskksage);
    }
};


// get data
const getpost = async (setData, userId) => {
    const userRef = doc(firestore, `posts`);
    try {
      const res1 = await getDoc(userRef);
      setData(res1.data() ?? {});
    } catch (err) {
      alert("error", err.message);
    }
  };
  

  /// method for getting user data who has logged in
const GetIndividualPostData = async (postId,setPostData) => {
    const userRef = doc(firestore, `posts/${postId}`);
    try {
      const response = await getDoc(userRef);
      console.log(response.data(), response.id, setPostData, postId);
      console.log(response.data()[postId]);
      setPostData(response.data()[postId]);
      // setData(res1.data() ?? {});
    } catch (err) {
      console.log(err.message)
      // alert("error", err.message);
    }
  }


//post action
const AddLikeOnPost = (postData, userID,postID) => {
     console.log(postData, userID);
  try{
      const postToUpdate = doc(firestore, `posts/${postID}`);
    console.log(postToUpdate);
    console.log(postData, userID);
      let response = updateDoc(postToUpdate, { [postID] : {
          ...postData,
          ["likes"]: {...postData.likes,likedBy: [...postData.likes.likedBy, userID],
              likeCount: postData.likes.likeCount + 1
          }
      }});
      console.log(response);
  }
  catch(error) { 
      console.log("error");
  }
}

const RemoveLikeOnPost = (postData, userId,postID) => { 
  try{
      const postToUpdate = doc(firestore, `posts/${postID}`);
      console.log(postToUpdate);
      let response = updateDoc(postToUpdate, { [postID] : {...postData,
          ["likes"]: {...postData.likes,
              likedBy: [...postData.likes.likedBy.filter(userID=> userID !== userId)],
              likeCount: postData.likes.likeCount - 1
          }}
      });
      console.log(response);
      
  }
  catch(error) { 
      console.log("error");
  }
}

const AddPostInBookmarkHandler = async (userData,postData,setUserData,postID,userID) => { 
  console.log("add book",userData,postData,setUserData,postID,userID)
  try {
      const userToUpdate = doc(firestore, `users/${userData.userId}`);
      console.log(userToUpdate,userData);
      let response = await updateDoc(userToUpdate, {
          [userData.userId]: {
              ...userData,
              ["bookmarks"]: [ ...userData.bookmarks,{...postData,postid:postID} ]}
      });
      console.log(response);
      GetIndividualUserData(userID, setUserData);
  }
  catch(error) { 
      console.log("error");
  }
}

const RemovePostFromBookmarkHandler = (userData,setUserData,postID,userID) => { 
  try {
      const userToUpdate = doc(firestore, `users/${userID}`);
      console.log(userToUpdate,userData); 
      let response = updateDoc(userToUpdate, {
          [userID]: {
              ...userData,
              ["bookmarks"]: [...userData.bookmarks.filter(post => post.postid !== postID ) ]}
      });
      console.log(response);
      GetIndividualUserData(userID, setUserData);
  }
  catch(error) { 
      console.log("error");
  }
}



const deletePost = async (postID) => {
    const doctoupdate = doc(firestore, `posts/${postID}`);
    try {
      await updateDoc(doctoupdate, {
        [postID]: deleteField(),
      });
    //   Alert("info", "Project Deleted!!");
    } catch (err) {
        console.log(err);
    //   Alert("error", err.message);
    }
  };


export {
    getAllPost,
    GetIndividualPostData,
    AddLikeOnPost,
    RemoveLikeOnPost,
    AddPostInBookmarkHandler,
    RemovePostFromBookmarkHandler,
    deletePost
}