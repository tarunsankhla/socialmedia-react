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
      <p className='xlg-txt' onClick={() => navigate("/")}
          style={{cursor:"pointer"}}>
        SpaceVerse</p>
      <p>{authUserCredential?.user?.emailId ? "@" +authUserCredential?.user?.emailId.split("@")[0] : ""}</p>
  
    </div>
  )
}

export default Navbar