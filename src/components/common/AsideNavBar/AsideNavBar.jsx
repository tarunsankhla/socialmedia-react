import { IconsBookmark, IconsExploreNavbar, IconsHomeNavbar, IconsProfile } from 'components/UI/Icons/Icons';
import { useAuth } from 'context/AuthContext';
import {useUserData} from 'context/UserContext'
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { userAuthReset } from 'reduxStore/reducers/authSlice';
import { resetUserHandler } from 'reduxStore/reducers/userSlice';
import { ROUTES } from 'utils/routes';
import "./AsideNavBar.css";

const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "var(--primary-color)" : "black",
    transform: isActive ? "scale(1.1)" : "",
    fontWeight: "700",
    fontSize: "1em",
    cursor: "pointer",
    display: "flex",
    justifyContent: "flex-start",
    gap: "0.5em",
    padding: "0.5em",
    alignItems: "center"
})
const AsideNavBar = () => {
    const { userState, userDispatch } = useAuth();
    let navigate = useNavigate();
    const { userData, setUserData } = useUserData();
    const dispatch = useDispatch();

    const LogoutHandler = () => {
        userDispatch({ type: "reset" });
        setUserData({ type: "reset" });
        dispatch(userAuthReset());
        dispatch(resetUserHandler());
        navigate("/", { replace: true });
    };

    return (
        <div className='AsideNav'>

            <li>
                <NavLink style={getActiveStyle}
                    to={ROUTES.ROUTE_PATH_HOMEPAGE}>
                    <IconsHomeNavbar height="1.5em" width="1.5em" /><p className="title-hide-responsive">Home</p>
                </NavLink>
            </li>
            <li>
                <NavLink style={getActiveStyle}
                    to={ROUTES.ROUTE_PATH_EXPLOREPAGE}>
                    <IconsExploreNavbar height="1.5em" width="1.5em" />
                    <p className="title-hide-responsive">Explore</p>
                </NavLink>
            </li>
            <li>
                <NavLink style={getActiveStyle}
                    to={ROUTES.ROUTE_PATH_BOOKMARKPAGE}>
                    <IconsBookmark height="1.5em" width="1.5em" />
                    <p className="title-hide-responsive">Bookmark</p>
                </NavLink>
            </li>
            <li>
                <NavLink style={getActiveStyle}
                    to={`/profile/${userState.user.userId}`}>
                    <IconsProfile height="1.5em" width="1.5em" />
                    <p className="title-hide-responsive">Profile</p>
                </NavLink>
            </li>
            <li>
                
                {!userState.token ? (
                    <NavLink style={getActiveStyle}
                    to={userData.userId.length ? `/profile/${userData.userId}` : "/login"}>
                    <button className="primary-outline-btn-md btn">Login</button>
                </NavLink>
                    ) : (
                    <button
                        className="btn logout-btn hover-btn"
                        onClick={LogoutHandler}
                    >
                        Logout
                    </button>
                    )}
            </li>
        </div>
    )
}

export default AsideNavBar