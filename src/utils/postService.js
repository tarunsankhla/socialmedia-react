import { async } from "@firebase/util";
import { Toast } from "components/UI/Toast/Toast";
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
const getAllPost = async () => {
  const collectionRef = collection(firestore, "posts")
  try {
    const response = await getDocs(collectionRef);
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
const GetIndividualPostData = async (postId, setPostData) => {
  const userRef = doc(firestore, `posts/${postId}`);
  try {
    const response = await getDoc(userRef);
    setPostData(response.data()[postId]);
  } catch (err) {
    console.log(err.message)
  }
}


//post action
const AddLikeOnPost = async (postData, userID, postID) => {
  try {
    const postToUpdate = doc(firestore, `posts/${postID}`);
    await updateDoc(postToUpdate, {
      [postID]: {
        ...postData,
        ["likes"]: {
          ...postData.likes, likedBy: [...postData.likes.likedBy, userID],
          likeCount: postData.likes.likeCount + 1
        }
      }
    });
    Toast("info", "Liked a Post")
  }
  catch (error) {
    console.log("error");
    Toast("error", "Failed" + error.message);
  }
}

const RemoveLikeOnPost = async (postData, userId, postID) => {
  try {
    const postToUpdate = doc(firestore, `posts/${postID}`);
    await updateDoc(postToUpdate, {
      [postID]: {
        ...postData,
        ["likes"]: {
          ...postData.likes,
          likedBy: [...postData.likes.likedBy.filter(userID => userID !== userId)],
          likeCount: postData.likes.likeCount - 1
        }
      }
    });
    Toast("info", "Disliked a Post");
  }
  catch (error) {
    console.log("error");
    Toast("error", "Failed" + error.message)
  }
}

const AddPostInBookmarkHandler = async (userData, postData, setUserData, postID, userID) => {
  try {
    const userToUpdate = doc(firestore, `users/${userData.userId}`);
    await updateDoc(userToUpdate, {
      [userData.userId]: {
        ...userData,
        ["bookmarks"]: [...userData.bookmarks, postID]
      }
    });
    Toast("info", "Bookmark Added");
    await GetIndividualUserData(userID, setUserData);
  }
  catch (error) {
    console.log("error");
    Toast("error", "Failed" + error.message);
  }
}

const RemovePostFromBookmarkHandler = async (userData, setUserData, postID, userID) => {
  try {
    const userToUpdate = doc(firestore, `users/${userID}`);
    await updateDoc(userToUpdate, {
      [userID]: {
        ...userData,
        ["bookmarks"]: [...userData.bookmarks.filter(post => post !== postID)]
      }
    });
    Toast("info", "Bookmark Removed");
    await GetIndividualUserData(userID, setUserData);
  }
  catch (error) {
    console.log("error");
    Toast("error", "Failed" + error.message);
  }
}



const deletePost = async (postID) => {
  const doctoupdate = doc(firestore, `posts/${postID}`);
  try {
    await updateDoc(doctoupdate, {
      [postID]: deleteField(),
    });
    Toast("info", "Post Deleted!!");
  } catch (err) {
    console.log(err);
    Toast("error", err.message);
  }
};



const AddUserAsFollowersHandler = async (followingUserId,userData, setUserData, followerUser) => {

  try {
    const userToUpdate = doc(firestore, `users/${followingUserId}`);
     await updateDoc(userToUpdate, {
      [followingUserId]: {
        ...userData,
        ["following"]: [...userData.following, { ...followerUser.user }]
      }
    });
    const followingUserToUpdate = doc(firestore, `users/${followerUser.user.userId}`);

    let response1 = await getDoc(followingUserToUpdate);

    var otherUserData = response1.data()[followerUser.user.userId];
    await updateDoc(followingUserToUpdate, {
      [followerUser.user.userId]: {
        ...otherUserData,
        ["followers"]: [...otherUserData.followers, {
          name: userData.name,
          userId: userData.userId,
          photo: userData.photo,
          emailId: userData.emailId,
        }]
      }
    });
    Toast("info", "Followed!")
    await GetIndividualUserData(followingUserId, setUserData);
  }
  catch (error) {
    Toast("error", "Failed" + error.message);
  }
}

const RemoveUserFromFollowersHandler = async (followingUserId,userData, setUserData, followerUser) => {

  try {
    const userToUpdate = doc(firestore, `users/${followingUserId}`);
     await updateDoc(userToUpdate, {
      [followingUserId]: {
        ...userData,
        ["following"]: [...userData.following.filter(user => user.userId !== followerUser.user.userId)]
      }
    });

    const followingUserToUpdate = doc(firestore, `users/${followerUser.user.userId}`);
    let response1 = await getDoc(followingUserToUpdate);

    var otherUserData = response1.data()[followerUser.user.userId];
    await updateDoc(followingUserToUpdate, {
      [followerUser.user.userId]: {
        ...otherUserData,
        ["followers"]: [...otherUserData.followers.filter(user => user.userId !== followingUserId)]
      }
    });
    Toast("info", "UnFollowed")
    await GetIndividualUserData(followingUserId, setUserData);
  }
  catch (error) {
    console.log("error");
    Toast("error", "Failed" + error.message);
  }
}



export {
  getAllPost,
  GetIndividualPostData,
  AddLikeOnPost,
  RemoveLikeOnPost,
  AddPostInBookmarkHandler,
  RemovePostFromBookmarkHandler,
  deletePost,
  AddUserAsFollowersHandler,
  RemoveUserFromFollowersHandler
}