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

export {
    getAllPost,
    GetIndividualPostData
}