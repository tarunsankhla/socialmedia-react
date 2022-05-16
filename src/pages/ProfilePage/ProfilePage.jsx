import Post from 'components/common/Posts/Post';
import {NormalButton} from 'components/UI/Buttons/buttons';
import {IconCalendar, IconClose, IconShare} from 'components/UI/Icons/Icons';
import { useAuth } from 'context/AuthContext';
import {firestore} from 'firebase.config';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import React, {useEffect, useState, useReducer} from 'react';
import {useParams} from 'react-router';
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
        bio: ""
    });
    const [showCopied, setShowCopied] = useState(false);
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
                let data = await getAllPost();
                // if (data.isArray()) {
                setYourPostArray(() => data ?. filter(i => Object.keys(i).length > 2 && i.user.userId === userID))
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
                    ["name"]: profilestate.name
                }
            });
            console.log(response);
            setEditToggle(false);
            const userRef = doc(firestore, `users/${userID}`);

            let response1 = await getDoc(userRef);
            console.log(response1.data()[userID]);
            setUserData(response1.data()[userID]);
        } catch (error) {
            console.log("error");
        }
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
          <div>
            <div>
          <p className='fn-wg-700 profile-page-name'>
            {userData?.name}
          </p>
          <p className='gray-txt'>
            {"@" + userData?.emailId?.split("@")[0]}
              </p></div>
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
            }}>
              <NormalButton name="Edit Profile" color="red" padding="7px 1em" />
            </p>
          }
          </div>
          <p>
            {userData?.bio || 'No Bio'}
          </p>
          <NormalButton name="Share Profile" color="red"
              click={urlClickHandler} padding="7px 1em" icon={<IconShare />} />
          {showCopied && <p className="copied-clipboard">Copied!</p>}
          
          <span className='lg-txt gray-txt flex-center'>
            <IconCalendar />Joined {userData?.createdAt}
          </span>
       
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
                        }}/>
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
