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
  

export { getAllPost }