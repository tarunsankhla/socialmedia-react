import { IMAGES } from 'assets/image';
import { NormalButton } from 'components/UI/Buttons/buttons';
import { useAuth } from 'context/AuthContext';
import React from 'react';
import { useNavigate as Navigate } from 'react-router';
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = Navigate();
  const { userState } = useAuth();
  return (
      <main className='main-landing-page'>
      <section className="landing-page-container">
        <p className='page-title'>
          SPACE VERSE
        </p>
        <section className='flex-cln landing-page-content'>
          <div className='md-txt'>
            <span className='gray-txt fn-wg-700 big-txt'>FOLLOW</span> PEOPLE AROUND THE GLOBE</div>
          <div className='md-txt'>
            <span className='gray-txt fn-wg-700 big-txt'>CONNECT</span> WITH YOUR FRIENDS</div>
          <div className='md-txt'>
            <span className='gray-txt fn-wg-700 big-txt'>SHARE</span> WHAT YOU THINKING</div>
        </section>
        
        {!userState.token.length ?
          <NormalButton name="JOIN NOW" color="red" class="landing-btn hover-btn" click={() => navigate("/login")} />
          :
          <NormalButton name="EXPLORE" color="red" class="landing-btn hover-btn" click={() => navigate("/home")}  />
          }
      </section>
      <img src={ IMAGES.LandingPage} className="landing-page-img"/>
      </main>
  )
}

export default LandingPage