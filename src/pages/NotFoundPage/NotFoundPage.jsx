import { IMAGES } from 'assets/image';
import { NormalButton } from 'components/UI/Buttons/buttons'
import React from 'react';
import { useNavigate as Navigate } from 'react-router';

const NotFoundPage = () => {
  const navigate = Navigate();
  return (
    <div className='flex-cln flex-center pd-10 align-center' style={{minHeight:"90vh",gap:"3em"}}>
      <NormalButton name="Go to Home" color="red" click={() => navigate("/")} />
      <img src={IMAGES.NotFound} style={{maxWidth: "50%"}}/>
    </div>
  )
}

export default NotFoundPage