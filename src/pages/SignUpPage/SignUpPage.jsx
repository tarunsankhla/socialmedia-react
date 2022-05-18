import { NormalButton } from 'components/UI/Buttons/buttons';
import { IconGoogle } from 'components/UI/Icons/Icons';
import { useAuth } from 'context/AuthContext';
import { useUserData } from 'context/UserContext';
import React, { useState, useEffect } from 'react';
import { useNavigate as Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { LoginWIthGoogleAuth, SignupWithEmail } from 'utils/authService';
import "./SignUpPage.css";

const SignUpPage = () => {
  const [data, setData] = useState({ email: "", password: "", name:"" });
  const { userState, userDispatch } = useAuth();
  const { userData, setUserData } = useUserData();
  const navigate = Navigate();

  const inputHandler = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const signupSubmitHandler = () => {
    if (data.email.trim() === "" || data.password.trim() === "") {
      // Alert("error", "Input cannot be blank");
      alert("Input cannot be blank")
    } else {
      console.log(setUserData, userData);
      SignupWithEmail(userDispatch, data, setUserData, navigate);
    }
    
  };
  useEffect(() => {
    if (!!userState?.token.length) {
      navigate("/", { replace: true });
    }
  }, []);

  const signupWithGoogleHandler = () => {
    LoginWIthGoogleAuth(userDispatch, setUserData, navigate);
  };
  return (
    <div className='no-one-container'>
      <div className="signup-body-container">
      {/* <img src={Login} className="signup-image" alt="login-logo" /> */}
        {/* <div className="signup-container"> */}
        
        <div className="title-header">
          <p className='xxlg-txt page-title'>Create your Account</p>
          <input type="email"
            placeholder="Email Address - xyz@gmail.com"
            name="email"
            value={data.email}
            onChange={inputHandler}
          />
          <input
            type="password"
            onChange={inputHandler}
            name="password"
            value={data.password}
            placeholder="Password"
            id=""
            />
          <input
            type="text"
            onChange={inputHandler}
            name="name"
            value={data.name}
            placeholder="Name"
            id=""
          />
          <div className='flex-center space-btwn pd-10 fn-wg-700 '  style={{gap:"3em"}}>
            <NormalButton
              // class="btn primary-btn-md"
              click={signupSubmitHandler} name="Sign Up" color="red" class="btn-login-signup"
            />
              
            {/* </Norm> */}
            <NormalButton
              // className="btn secondary-outline-btn-md"
              click={signupWithGoogleHandler} name=" Google" color="red" class="btn-login-signup" icon={<IconGoogle />}
            />
              
            {/* </NormalButton> */}
          </div>
          <Link className="flex-row-center text-dark" to="/login">
            <h2 className="cursive underline">Account Already Exist ?</h2>
            {/* <span>
              <h2 className="title-md-wt-5">Sign In</h2>
            </span> */}
          </Link>
        </div>
      {/* </div> */}
        </div>
    </div>
  )
}

export default SignUpPage