import { useUserData } from 'context/UserContext';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate as Navigate } from 'react-router';
import "./Navbar.css";

const Navbar = () => {
  const { userData } = useUserData();
  const userDataCredential = useSelector(state => state.userDataCredential)
  const navigate = Navigate();
  return (
    <div className='Navbar'>
      {/* <img src={LogoWEBP1} loading="lazy" alt='logo' className='logo-navbar' /> */}
      <p className='xlg-txt' onClick={() => navigate("/")}
          style={{cursor:"pointer"}}>
        SpaceVerse</p>
      {/* <p>{userData?.emailId ? "@" + userData?.emailId?.split("@")[0] : ""}</p> */}
      <p>{userDataCredential?.user?.emailId ? "@" +userDataCredential?.user?.emailId.split("@")[0] : ""}</p>
  
    </div>
  )
}

export default Navbar