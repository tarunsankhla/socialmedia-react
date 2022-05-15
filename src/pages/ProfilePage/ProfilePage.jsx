import React , { useEffect,useState }from 'react';
import { useParams } from 'react-router';
import { GetIndividualUserData } from 'utils/authService';
import "./ProfilePage.css";

const ProfilePage = () => {
  const { userID } = useParams();
  const [userData, setUserData] = useState({});
  console.log(userID);
  useEffect(() => {
    GetIndividualUserData(userID, setUserData);
   },[])
  return (
    <div>
      { userData?.payload?.name}
    </div>
  )
}

export default ProfilePage