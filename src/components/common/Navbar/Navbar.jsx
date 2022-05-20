import { useUserData } from 'context/UserContext';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate as Navigate } from 'react-router';
import "./Navbar.css";

const Navbar = () => {
  const { userData } = useUserData();
  const authUserCredential = useSelector(state => state.authUserCredential)
  const navigate = Navigate();
  return (
    <div className='Navbar'>
      {/* <img src={LogoWEBP1} loading="lazy" alt='logo' className='logo-navbar' /> */}
      <p className='xlg-txt' onClick={() => navigate("/")}
          style={{cursor:"pointer"}}>
        SpaceVerse</p>
      {/* <p>{userData?.emailId ? "@" + userData?.emailId?.split("@")[0] : ""}</p> */}
      <p>{authUserCredential?.user?.emailId ? "@" +authUserCredential?.user?.emailId.split("@")[0] : ""}</p>
  
    </div>
  )
}

export default Navbar