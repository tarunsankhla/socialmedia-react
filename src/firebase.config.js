import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// const firebaseConfig = {
//     apiKey: "AIzaSyB0XTGuTOOGbshnA5gBGgYwdmDhl-2_EJk",
//     authDomain: "socialmediareact-67c57.firebaseapp.com",
//     projectId: "socialmediareact-67c57",
//     storageBucket: "socialmediareact-67c57.appspot.com",
//     messagingSenderId: "823376411059",
//     appId: "1:823376411059:web:525fba5a9d30ce006f73c6",
//     measurementId: "G-GSFNYHT60H"
//   };

console.log(process.env.REACT_APP_FIREBASE_API_KEY, process.env.REACT_APP_FIREBASE_AUTH_DOMAIN)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseStorage = getStorage(app);
const firestore = getFirestore(app);
const firebaseAuth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
console.log(app, firebaseAuth, googleAuthProvider);

export {
    app,
    analytics,
    firebaseStorage,
    firestore,
    firebaseAuth,
    googleAuthProvider,
    getAuth,
    signInWithPopup,
    signInAnonymously,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getFirestore,
    collection,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
    ref,
    getDownloadURL,
    uploadBytesResumable    
}