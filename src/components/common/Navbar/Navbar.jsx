import { useUserData } from 'context/UserContext';
import React from 'react';
import "./Navbar.css";

const Navbar = () => {
  const { userData } = useUserData();
  return (
    <div className='Navbar'>
      {/* <img src={LogoWEBP1} loading="lazy" alt='logo' className='logo-navbar' /> */}
      SpaceVerse
      <p>{ userData?.emailId ? "@" + userData?.emailId?.split("@")[0] : ""}</p>
  
    </div>
  )
}

export default Navbar