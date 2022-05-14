import React from 'react';
import { Link, useNavigate as Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./LoginPage.css";
import { useAuth } from 'context/AuthContext';
import { LoginInWithEmail, LoginWIthGoogleAuth } from 'utils/authService';
import { NormalButton } from 'components/UI/Buttons/buttons';
import { useUserData } from 'context/UserContext';

const LoginPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showResetPassword, setShowResetPassword] = useState(false);
  const { userData, setUserDate } = useUserData();

  const navigate = Navigate();
  const { userState, userDispatch } = useAuth();

  const loginClickHandler = (e) => {
    e.preventDefault();
    if (data.email.trim() === "" || data.password.trim() === "") {
      // Alert("error", "Input cannot be blank");
    } else {
      LoginInWithEmail(data, userDispatch, setUserDate, navigate);
    }
  };

  const inputHandler = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (userState?.token) {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <>
      {/* {showResetPassword && (
        <ResetPassword setShowResetPassword={setShowResetPassword} />
      )} */}
      <div className="login-body-container">
        <div className="login-container">
          <div className="title-header">
            <h1 className="title-xl-wt-bold mg-1-bot">Login</h1>
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

              <div className="login-cta-buttons">
                <span
                  className="btn primary-btn-md"
                  onClick={loginClickHandler}
                >
                  <NormalButton name="Login"/>
                  {/* Login */}
                </span>
              </div>
            </form>
            <div className="google-login-container">
              <span
                className="btn secondary-outline-btn-md google-login"
                onClick={(e) => {
                  e.preventDefault();
                  LoginWIthGoogleAuth(userDispatch, navigate);
                }}
              >
                {/* <i className="fab fa-google"></i> */}
                login with Google
                <NormalButton name="login with Google"/>
              </span>
            </div>
            <Link className="btn primary-text-btn-md mg-1-top" to="/signup">
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage