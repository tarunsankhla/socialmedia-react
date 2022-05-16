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
  collection,
  getDocs,
} from "firebase/firestore";


const LoginInWithEmail = async (data, userDispatch, setUserData, navigate) => {
  try {
    console.log(firebaseAuth, data)
    const response = await signInWithEmailAndPassword(
      firebaseAuth,
      data.email,
      data.password
    );
    console.log(response);

    const userRef = doc(firestore, `users/${response.user.uid}`);
    const responseOfDOC = await getDoc(userRef);
    console.log(responseOfDOC.data(), responseOfDOC.id, setUserData, response.user.uid);
    console.log(responseOfDOC.data()[response.user.uid]);


    
    userDispatch({
      type: "userauth",
      token: response?.user?.accessToken ?? "",
      name: response?.user?.displayName || responseOfDOC.data()[response.user.uid].name,
      emailId: response?.user?.email ?? "",
      userId: response?.user?.uid ?? "",
      photo: response.user.photoURL || responseOfDOC.data()[response.user.uid].photo,
    });
    
    console.log(response.user.uid,setUserData)
    GetIndividualUserData(response.user.uid,setUserData);

    navigate("/", { replace: true });
    // Alert("success", "SignIn Successfully!!");
  } catch (err) {
    console.log(err);
    // Alert("error", err.message);
  }
}


const LoginWIthGoogleAuth = async (userDispatch, setUserData, navigate) => {
  try {
    console.log(firebaseAuth, googleAuthProvider)
    const response = await signInWithPopup(firebaseAuth, googleAuthProvider);
    console.log(response);
    let obj = {
      name: response?.user?.displayName ?? "",
      emailId: response?.user?.email ?? "",
      userId: response?.user?.uid ?? "",
      photo: response.user.photoURL ?? "",
    }
    let doesUserAlreadyExist = await checkIfUserExist(response.user.uid);
    if (!doesUserAlreadyExist) { 
      await CreateUser(obj);
    }
    const userRef = doc(firestore, `users/${response.user.uid}`);
      const responseOfDOC = await getDoc(userRef);
      console.log(responseOfDOC.data(), responseOfDOC.id, setUserData, response.user.uid);
      console.log(responseOfDOC.data()[response.user.uid]);
    userDispatch({
      type: "userauth",
      token: response?.user?.accessToken ?? "",
      name: response?.user?.displayName,
      emailId: response?.user?.email ?? "",
      userId: response?.user?.uid ?? "",
      photo: response.user.photoURL,
    });

    console.log(response.user.uid,setUserData)
    GetIndividualUserData(response.user.uid,setUserData);
    navigate("/", { replace: true });
    // Alert("success", "Logged In Successfully!");
  } catch (err) {
    console.log(err);
    // Alert("error", err.message);
  }
}

const SignupWithEmail = async (userDispatch, data,setUserData, navigate) => {
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

    console.log(response.user.uid,setUserData)
    GetIndividualUserData(response.user.uid,setUserData);
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
    createdAt: new Date().toDateString(),
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

const checkIfUserExist = async (userId) => { 
  const collectionRef = collection(firestore, "users")
  try {
    var result = await getDocs(collectionRef);
    console.log(result);
    let check = result.docs.map(i => {
        return { ...(i.data()[i.id]) }
      }).some(user => user.userId === userId);
    console.log(result, check);
    return check;
  } catch (err) { 
    console.log(err);
    return false;
  }
}


/// method for getting user data who has logged in
const GetIndividualUserData = async (userID,setUserData) => {
  const userRef = doc(firestore, `users/${userID}`);
  try {
    const response = await getDoc(userRef);
    console.log(response.data(), response.id, setUserData, userID);
    console.log(response.data()[userID]);
    setUserData({ type: "getuserdata", payload: response.data()[userID] });
    // setData(res1.data() ?? {});
  } catch (err) {
    console.log(err.message)
    // alert("error", err.message);
  }
}


const getAllUser = async (setData) => { 
  const collectionRef = collection(firestore, "users")
  try {
    var result = await getDocs(collectionRef);
    // console.log(result.docs);
    setData(result.docs.map(i => {
        return { ...(i.data()[i.id]) }
      }));
  } catch (err) { 
    console.log(err);
    return false;
  }
}

export {
  LoginInWithEmail,
  LoginWIthGoogleAuth,
  SignupWithEmail,
  GetIndividualUserData,
  getAllUser
}