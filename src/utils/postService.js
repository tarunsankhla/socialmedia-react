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
} from "firebase/firestore";
import { GetIndividualUserData } from "./authService";


// get all data
const getAllPost = async () => {
    // const userRef = doc(firestore, `users/${userId}`);
    const collectionRef = collection(firestore, "posts")
    try {
        const response = await getDocs(collectionRef);
        console.log(response.docs)
        console.log(response.docs.map(i => {
            return { ...(i.data()[i.id]), postid :i.id }
        }))
        // setData(res1.data() ?? {});
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
const AddLikeOnPost = (postData,userID) => {
  try{
      const postToUpdate = doc(firestore, `posts/${postData.postid}`);
      console.log(postToUpdate);
      let response = updateDoc(postToUpdate, { [postData.postid] : {
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

const RemoveLikeOnPost = (postData, userId) => { 
  try{
      const postToUpdate = doc(firestore, `posts/${postData.postid}`);
      console.log(postToUpdate);
      let response = updateDoc(postToUpdate, { [postData.postid] : {...postData,
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

const AddPostInBookmarkHandler = (userData,postUserData,setUserData,userID) => { 
  
  try {
      const userToUpdate = doc(firestore, `users/${userID}`);
      console.log(userToUpdate,userData);
      let response = updateDoc(userToUpdate, {
          [userID]: {
              ...userData,
              ["bookmarks"]: [ ...userData.bookmarks,{...postUserData} ]}
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





export {
    getAllPost,
    GetIndividualPostData
}