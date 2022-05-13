import { async } from "@firebase/util";
import {
    firebaseAuth,
    googleAuthProvider,
    signInWithEmailAndPassword
} from "firebase.config"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const LoginInWithEmail = async (data, userDispatch, navigate) => {
    try {
        const response = await signInWithEmailAndPassword(
          firebaseAuth,
          data.email,
          data.password
        );
        console.log(response);
        userDispatch({
          type: "userauth",
          token: response?.user?.accessToken ?? "",
          name: response?.user?.displayName ?? "",
          emailId: response?.user?.email ?? "",
          userId: response?.user?.uid ?? "",
          photo: response.user.photoURL ?? "",
        });
        navigate("/home", { replace: true });
        // Alert("success", "SignIn Successfully!!");
    } catch (err) {
        console.log(err);
        // Alert("error", err.message);
      }
}


const LoginWIthGoogleAuth = async (userDispatch, navigate) =>
{ 
    try {
        console.log(firebaseAuth, googleAuthProvider)
        const response = await signInWithPopup(firebaseAuth, googleAuthProvider);
        console.log(response);
        userDispatch({
          type: "userauth",
          token: response?.user?.accessToken ?? "",
          name: response?.user?.displayName ?? "",
          emailId: response?.user?.email ?? "",
          userId: response?.user?.uid ?? "",
          photo: response.user.photoURL ?? "",
        });
        navigate("/dashboard", { replace: true });
        // Alert("success", "Logged In Successfully!");
    } catch (err) {
        console.log(err);
        // Alert("error", err.message);
      }
}

const SignupWithEmail = async (userDispatch, data, navigate) => {
    try {
        const response = await createUserWithEmailAndPassword(
          firebaseAuth,
          data.email,
          data.password
        );
        console.log(response);
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

export { 
    LoginInWithEmail,
    LoginWIthGoogleAuth,
    SignupWithEmail
}