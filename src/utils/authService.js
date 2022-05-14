import {
  firestore,
  firebaseAuth,
  signInAnonymously,
  signInWithPopup,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  googleAuthProvider,
} from "firebase.config";
import {
  doc,
  getDoc,
  updateDoc,
  deleteField,
  setDoc,
} from "firebase/firestore";


const LoginInWithEmail = async (data, userDispatch, setUserDate, navigate) => {
  try {
    console.log(firebaseAuth, data)
    const response = await signInWithEmailAndPassword(
      firebaseAuth,
      data.email,
      data.password
    );
    console.log(response);
    let obj = {
      name: response?.user?.displayName ?? "",
      emailId: response?.user?.email ?? "",
      userId: response?.user?.uid ?? "",
      photo: response.user.photoURL ?? "",
    }
    CreateUser(obj);
    
    userDispatch({
      type: "userauth",
      token: response?.user?.accessToken ?? "",
      name: response?.user?.displayName ?? "",
      emailId: response?.user?.email ?? "",
      userId: response?.user?.uid ?? "",
      photo: response.user.photoURL ?? "",
    });
    
    console.log(response.user.uid)
    GetIndividualUserData(response.user.uid,setUserDate);

    navigate("/", { replace: true });
    // Alert("success", "SignIn Successfully!!");
  } catch (err) {
    console.log(err);
    // Alert("error", err.message);
  }
}


const LoginWIthGoogleAuth = async (userDispatch, navigate) => {
  try {
    console.log(firebaseAuth, googleAuthProvider)
    const response = await signInWithPopup(firebaseAuth, googleAuthProvider);
    // .then(resp => console.log(resp))
    // .catch(err => console.log(err));
    console.log(response);
    let obj = {
      name: response?.user?.displayName ?? "",
      emailId: response?.user?.email ?? "",
      userId: response?.user?.uid ?? "",
      photo: response.user.photoURL ?? "",
    }
    CreateUser(obj);
    userDispatch({
      type: "userauth",
      token: response?.user?.accessToken ?? "",
      name: response?.user?.displayName ?? "",
      emailId: response?.user?.email ?? "",
      userId: response?.user?.uid ?? "",
      photo: response.user.photoURL ?? "",
    });
    navigate("/", { replace: true });
    // Alert("success", "Logged In Successfully!");
  } catch (err) {
    console.log(err);
    // Alert("error", err.message);
  }
}

const SignupWithEmail = async (userDispatch, data, navigate) => {
  try {
    console.log(firebaseAuth);
    const response = await createUserWithEmailAndPassword(
      firebaseAuth,
      data.email,
      data.password
    );
    console.log(response);
    let obj = {
      name: response?.user?.displayName ?? "",
      emailId: response?.user?.email ?? "",
      userId: response?.user?.uid ?? "",
      photo: response.user.photoURL ?? "",
    }
    CreateUser(obj);
    userDispatch({
      type: "userauth",
      token: response?.user?.accessToken ?? "",
      name: response?.user?.displayName ?? "",
      emailId: response?.user?.email ?? "",
      userId: response?.user?.uid ?? "",
      photo: response.user.photoURL ?? "",
    });
    navigate("/", { replace: true });
    // Alert("success", "SignUp Successfully!!");
  } catch (err) {
    console.log(err);
    // Alert("error", err.message);
  }
}

const CreateUser = async (obj) => {
  let userObject = {
    userId: obj.userId,
    name: obj.name,
    emailId: obj.emailId,
    photo: obj.photo,
    createdAt: new Date(),
    updatedAt: new Date(),
    followers: [],
    following: [],
    bookmarks: [],
    bio: "",
    headerImg: ""
  }
  console.log("create user", obj);
  const userRef = doc(firestore, `users/${obj.userId}`);
  console.log(userObject)
  try {
    var response = await setDoc(userRef, { // ...dashboard,
      [obj.userId]: userObject
    });
    console.log(response);
    // Alert("success", "Nkew Project Added!!");
  } catch (err) {
    console.log(err.message)
    // Alert("info", err.message);
  }
}


/// method for getting user data who has logged in
const GetIndividualUserData = async (userID,setUserData) => {
  const userRef = doc(firestore, `users/${userID}`);
  try {
    const response = await getDoc(userRef);
    console.log(response.data(),setUserData,userID);
    // setData(res1.data() ?? {});
  } catch (err) {
    console.log(err.message)
    // alert("error", err.message);
  }
}

export {
  LoginInWithEmail,
  LoginWIthGoogleAuth,
  SignupWithEmail,
  GetIndividualUserData
}