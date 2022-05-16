import { NormalButton } from 'components/UI/Buttons/buttons'
import React from 'react';
import { useNavigate as Navigate } from 'react-router';

const NotFoundPage = () => {
  const navigate = Navigate();
  return (
    <div className='flex-cln pd-10 align-center'>
      <NormalButton name="Go to Home" color="red" click={ ()=> navigate("/")}/>
    </div>
  )
}

export default NotFoundPage