import React from 'react';
import { Link, useNavigate as Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./LoginPage.css";
import { useAuth } from 'context/AuthContext';
import { LoginInWithEmail, LoginWIthGoogleAuth } from 'utils/authService';
import { NormalButton } from 'components/UI/Buttons/buttons';
import { useUserData } from 'context/UserContext';
import { IconGoogle } from 'components/UI/Icons/Icons';

const LoginPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showResetPassword, setShowResetPassword] = useState(false);
  const { userData, setUserData } = useUserData();
  const { userState, userDispatch } = useAuth();
  const navigate = Navigate();
  console.log("login ")

  const loginClickHandler = (e) => {
    e.preventDefault();
    if (data.email.trim() === "" || data.password.trim() === "") {
      // Alert("error", "Input cannot be blank");
      alert("Input cannot be blank")
    } else {
      console.log(setUserData,userData);
      LoginInWithEmail(data, userDispatch, setUserData, navigate);
    }
  };

  const inputHandler = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!!userState?.token.length) {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <div className='no-one-container'>
      {/* {showResetPassword && (
        <ResetPassword setShowResetPassword={setShowResetPassword} />
      )} */}
      <div className="login-body-container">
        <div className="login-container">
          <div className="title-header">
            <h1 className="xxlg-txt page-title">Login</h1>
            <form onSubmit={(e) => loginClickHandler(e)}>
              <div className="login-credential-container">
                <input
                  placeholder="Email Address - xyz@gmail.com"
                  name="email"
                  type="email"
                  required="required"
                  value={data.email}
                  onChange={inputHandler}
                />
              </div>
              <div className="login-credential-container">
                <input
                  type="password"
                  onChange={inputHandler}
                  name="password"
                  required="required"
                  value={data.password}
                  placeholder="Password"
                />
              </div>
              <div
                onClick={() => {
                  setShowResetPassword(true);
                }}
                className="forget-password"
              >
                Forgot your password?
              </div>
              <div className='flex-center pd-10' style={{gap:"2em"}}>
                <NormalButton name="Login" color="red" click={loginClickHandler} class="btn-login-signup" />
                <NormalButton name=" Google" color="red" click={(e) => {
                    e.preventDefault();
                    LoginWIthGoogleAuth(userDispatch, setUserData, navigate);
                }} icon={<IconGoogle />} class="btn-login-signup" />
              </div>

              {/* <div className="login-cta-buttons"> */}
                {/* <span
                  className="btn primary-btn-md"
                  onClick={loginClickHandler}
                > */}
                  
                  {/* Login */}
                {/* </span> */}
              {/* </div> */}
            </form>
            {/* <div className="google-login-container"> */}
              {/* <span
                className="btn secondary-outline-btn-md google-login"
                onClick={(e) => {
                  e.preventDefault();
                  LoginWIthGoogleAuth(userDispatch,setUserData, navigate);
                }}
              > */}
                {/* <i className="fab fa-google"></i> */}
            {/* login with Google */}
            
           
              {/* </span> */}
            {/* </div> */}
            <Link className="cursive underline" to="/signup">
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage