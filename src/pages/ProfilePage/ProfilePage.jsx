import Post from 'components/common/Posts/Post';
import {NormalButton} from 'components/UI/Buttons/buttons';
import {IconCalendar, IconClose, IconShare} from 'components/UI/Icons/Icons';
import { Toast } from 'components/UI/Toast/Toast';
import { useAuth } from 'context/AuthContext';
import {firebaseStorage, firestore} from 'firebase.config';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, {useEffect, useState, useReducer} from 'react';
import { useDispatch } from 'react-redux';
import {useParams} from 'react-router';
import { signUpUser } from 'reduxStore/reducers/userSlice';
import {getAllPost} from 'utils/postService';
import "./ProfilePage.css";


const profileReducerHandler = (state, action) => {
    if (action.type === "name") {
        return {
            ...state,
            name: action.name
        }
    }
    if (action.type === "bio") {
        return {
            ...state,
            bio: action.bio
        }
    }
    if (action.type === "photo") {
      return {
          ...state,
          photo: action.photo
      }
    }
    return {
        ...state
    }
}
const ProfilePage = () => {
  const { userID } = useParams();
  const { userState, userDispatch } = useAuth();
    const [userData, setUserData] = useState({});
    const [yourPostArray, setYourPostArray] = useState([]);
    const [editToggle, setEditToggle] = useState(false);
    const [profilestate, profiledispatch] = useReducer(profileReducerHandler, {
        name: "",
        bio: "",
        photo:  ""
    });
  const [showCopied, setShowCopied] = useState(false);
  const dispatch = useDispatch()
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


                // get All data
                console.log(getAllPost());
                const data = await getAllPost();
                // if (data.isArray()) {
                setYourPostArray(() => data?.filter(i => Object.keys(i).length > 2 && i.user.userId === userID))
                // }
            } catch (err) {
                console.log(err.message)
                // }
                alert("error", err.message);
            }
        })();


    }, [])


    // copy URLto clipboard
    const urlClickHandler = () => {
        navigator.clipboard.writeText(`https://spaceverse.netlify.app/profile/${userID}`);
        setShowCopied(true);
        setTimeout(() => {
            setShowCopied(false);
        }, 2000);
  };
  
    const UpdateProfile = async () => {
      try {
          const userToUpdate = doc(firestore, `users/${userID}`);
          console.log(userToUpdate, userData, profilestate);
          let response = await updateDoc(userToUpdate, {
              [userID]: {
                  ...userData,
                  ["bio"]: profilestate.bio,
                  ["name"]: profilestate.name,
                  ["photo"] : profilestate.photo
              }
          });
          console.log(response);
          setEditToggle(false);
          const userRef = doc(firestore, `users/${userID}`);

          let response1 = await getDoc(userRef);
          console.log(response1.data()[userID]);
          Toast("info", "Profile");
          setUserData(response1.data()[userID]);
          dispatch(signUpUser(userID));
        } catch (error) {
          console.log("error");
          Toast("error", "Failed" + error.message);
        }
  }

  const UploadFile = (data) => { 
    console.log(data);
    const storageRef = ref(firebaseStorage, `profileImages/${data.name}`);
    const uploadTask = uploadBytesResumable(storageRef, data);
    uploadTask.on('state_changed', (snapshot) => { 
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, 
      (error) => {
        console.log(error);
      // Handle unsuccessful uploads
      },
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            profiledispatch({
              type: "photo",
              photo: downloadURL
            })
        });
      });
  }
  
    return (
      <div className='flex main-profile-page '>
        <div className='profile-page-header-container flex relative'>
          <div className='profile-page-header-photo'>
            {userData?.photo?.length ?
              <img src={userData.photo} className='handle-img-np user-img profile-img' />
              : <span className='handle-img-np profile-digit'>
                {userData?.name ? userData?.name[0].toUpperCase() : "D"}
              </span>
            }
          </div>
          <div className='profile-page-header-user-detail'>
            <div>
              <p className='fn-wg-700 profile-page-name'>
                {userData?.name}
              </p>
              <p className='gray-txt'>
                {"@" + userData?.emailId?.split("@")[0]}
              </p>
            </div>
                { userID === userState.user.userId &&
                <p onClick={() => {
                    setEditToggle(prev => !prev);
                    profiledispatch({
                        type: "name",
                        name: userData?.name
                    });
                    profiledispatch({
                        type: "bio",
                        bio: userData?.bio
                    })
                    profiledispatch({
                      type: "photo",
                      photo: userData?.photo
                    })
                }}>
                  <NormalButton name="Edit Profile" color="#8d9bdb" padding="7px 1em" class="profile-btn" />
                </p>
              }
          </div>
          <div className="profile-page-header-user-bio">
            <p className='fn-wg-600 '>
             Bio : {userData?.bio || 'No Bio'}
            </p>
            <div className='flex space-btwn full-width'>
              <span className='lg-txt gray-txt flex-center'>
                <IconCalendar />Joined {userData?.createdAt}
              </span>
              <NormalButton name="Share Profile" color="#8d9bdb"
                  click={urlClickHandler} padding="7px 1em" icon={<IconShare />} class="profile-btn" />
              {showCopied && <p className="copied-clipboard">Copied!</p>}
            </div>
        </div>
        <div className='flex profile-page-stats-container'>
          <div>
            <p className='fn-wg-800'>
              {userData?.following?.length}
            </p>
            <p>Following</p>
          </div>
          <div>
            <p className='fn-wg-800'>
              { yourPostArray?.length }</p>
            <p>Posts</p>
          </div>
          <div>
            <p className='fn-wg-800'>
                { userData?.followers?.length}
            </p>
            <p>Followers</p>
          </div>
          </div>
        </div>
        <div className='profile-your-post-container'>
          <p className='fn-wg-800'>Your Posts</p>
          <div>
            {yourPostArray?.map(i => (
              <Post props={i} key={ i.postid + i.createdTime }/>
            ))}
          </div>
        </div>

        {editToggle &&
          <div className='fixed post-page-edit-modal'>
            <span className='edit-post-header fn-wg-700 flex align-center full-width space-btwn pd-5'>
              <h1>Edit Post</h1>
              <span onClick={
                  () => setEditToggle(prev => !prev)
              }>
                <IconClose />
              </span>
            </span>
            <div className='post-page-edit-modal-container pd-5'>
                <textarea value={ profilestate.name } className="post-page-edit-input pd-5 bg-gray"
                    placeholder="Name"
                    onChange={ (e) => {
                            e.target.style.height = "inherit";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                            profiledispatch({type: "name", name: e.target.value})
                    }}/>
                <textarea value={profilestate.bio}
                    className="post-page-edit-input pd-5 bg-gray"
                    placeholder='Bio'
                    onChange={(e) => {
                            e.target.style.height = "inherit";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                            profiledispatch({type: "bio", bio: e.target.value});
                }} />
                <input type="file" accept='.png, .jpg, .jpeg' onChange={(event)=>UploadFile(event.target.files[0])}/>
              
              <span onClick={UpdateProfile}>
                <NormalButton name="Save Post" color="red" />
              </span>
            </div>
          </div>
        }
      </div>
    )
}

export default ProfilePage
