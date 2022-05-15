import { NormalButton } from 'components/UI/Buttons/buttons';
import { firestore } from 'firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import React , { useEffect,useState }from 'react';
import { useParams } from 'react-router';
import { GetIndividualUserData } from 'utils/authService';
import "./ProfilePage.css";

const ProfilePage = () => {
  const { userID } = useParams();
  const [userData, setUserData] = useState({});
  console.log(userID);
  useEffect(() => {
    const userRef = doc(firestore, `users/${userID}`);
    (async () => {
      try {
        const response = await getDoc(userRef);
        console.log(response.data(), response.id, setUserData, userID);
        console.log(response.data()[userID]);
        setUserData(response.data()[userID]);
        // setData(res1.data() ?? {});
      } catch (err) {
        console.log(err.message)
        // }
        alert("error", err.message);
      }
    })();
   },[])
  return (
    <div className='flex main-profile-page'>
      <div className='profile-page-header-container flex'>
        {userData?.photo?.length ?
          <img src={userData.photo} className='handle-img-np user-img profile-img' />
          : <span className='handle-img-np profile-digit'>
              {userData?.name ? userData?.name[0].toUpperCase() : "D"}
            </span>}
        <p className='fn-wg-700 profile-page-name'>{userData?.name}</p>
        <p className='gray-txt'>{"@" + userData?.emailId?.split("@")[0]}</p>
        <NormalButton name="Edit Profile" color="red" padding="7px 1em" />
        <p>{userData?.bio || 'No Bio'}</p>
      </div>
      <div className='flex profile-page-stats-container'>
        <div>
          <p className='fn-wg-800'>{ userData?.following?.length}</p>
          <p>Following</p></div>
        <div>
          <p className='fn-wg-800'>D</p>
          <p>Posts</p></div>
        <div>
          <p className='fn-wg-800'>{ userData?.followers?.length}</p>
          <p>Followers</p></div>
      </div>
    </div>
  )
}

export default ProfilePage