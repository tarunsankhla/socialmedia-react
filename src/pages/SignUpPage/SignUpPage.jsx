import { NormalButton } from 'components/UI/Buttons/buttons';
import { IconGoogle } from 'components/UI/Icons/Icons';
import { useAuth } from 'context/AuthContext';
import { useUserData } from 'context/UserContext';
import React, { useState, useEffect } from 'react';
import { useNavigate as Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { LoginWIthGoogleAuth, SignupWithEmail } from 'utils/authService';
import "./SignUpPage.css";
import "../LoginPage/LoginPage.css";
import { useDispatch } from 'react-redux';

const SignUpPage = () => {
  const [data, setData] = useState({ email: "", password: "", name:"" });
  const { userState, userDispatch } = useAuth();
  const { userData, setUserData } = useUserData();
  const navigate = Navigate();
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const signupSubmitHandler = (e) => {
    e.preventDefault();
    if (data.email.trim() === "" || data.password.trim() === "") {
      alert("Input cannot be blank")
    } else {
      console.log(setUserData, userData,data);
      SignupWithEmail(userDispatch, data, setUserData, navigate,dispatch);
    }
    
  };

  useEffect(() => {
    if (!!userState?.token.length) {
      navigate("/", { replace: true });
    }
  }, []);

  const signupWithGoogleHandler = () => {
    LoginWIthGoogleAuth(userDispatch, setUserData, navigate,dispatch);
  };
  return (
    <div className='no-one-container'>
      <div className="signup-body-container">        
        <div className="title-header">
          <p className='xxlg-txt page-title'>Create your Account</p>
          <form onSubmit={(e) => signupSubmitHandler(e)}>
          <div className="login-credential-container">
            <input type="email"
              placeholder="Email Address - xyz@gmail.com"
              name="email"
              value={data.email}
                onChange={inputHandler}
                required
              />
            </div>
            <div className="login-credential-container">
            <input
              type="password"
              onChange={inputHandler}
                name="password"
                required
              value={data.password}
              placeholder="Password"
              id=""
              /></div>
            <div className="login-credential-container">
            <input
              type="text"
              onChange={inputHandler}
              name="name"
              value={data.name}
              placeholder="Name"
                id=""
                required
            /></div>

          <button type="submit" className="btn-login-signup btn-submit">Sign Up</button>
          <div className='flex-center space-btwn pd-10 fn-wg-700 '  style={{gap:"3em"}}>
            <NormalButton
              click={signupWithGoogleHandler} name=" Google" color="red" class="btn-login-signup" icon={<IconGoogle />}
            />
            </div>
          </form>
          <Link className="flex-row-center text-dark" to="/login">
            <h2 className="cursive underline">Account Already Exist ?</h2>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage