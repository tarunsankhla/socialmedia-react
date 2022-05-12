import { IconsBookmark, IconsExploreNavbar, IconsHomeNavbar, IconsProfile } from 'components/UI/Icons/Icons';
import React from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
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
    // let auth = useAuth();
    let navigate = useNavigate();
    // const { modalToggle, setmodalToggle } = useModal();


    return (
        <div className='AsideNav'>
            <div>
                <ul>
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
                            to={ROUTES.ROUTE_PATH_ProfilePage}>
                            <IconsProfile height="1.5em" width="1.5em" />
                            <p className="title-hide-responsive">Profile</p>
                        </NavLink>
                    </li>
                    {/* {
                        !auth.user ?

                            <span onClick={
                                () => {
                                    console.log("login");
                                    setmodalToggle(true);
                                }} className='create-btn' style={{ width: "100%" }}>
                                <p className="title-hide-responsive">Login</p>
                                <BiBoxArrowInLeft height="1.5em" width="1.5em" />
                            </span>

                            : <li>
                                <NavLink style={getActiveStyle}
                                    to={ROUTE_PATH_PROFILEPAGE}>
                                    <BiPersonHearts height="1.5em" width="1.5em" />
                                    <p className="title-hide-responsive">Profile</p>
                                </NavLink>
                            </li>
                    } */}
                </ul>
            </div>
            {/* {
                auth.user ?
                    <>
                        <hr/>
                        <div className='aside-nav-logout'>
                            <p className="title-hide-responsive">{`@${auth.userState?.firstName}${auth.userState?.lastName}`} </p>
                            <span className='logout-btn'
                                onClick={
                                    () => {
                                        auth.logoutUser(() => {
                                            navigate("/");
                                        })
                                    }}>
                                <BiBoxArrowRight height="1.5em" width="1.5em" />
                            </span>
                        </div>
                    </>
                    : ""} */}
        </div>
    )
}

export default AsideNavBar