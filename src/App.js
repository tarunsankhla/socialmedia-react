import "./App.css";
import logo from "./logo.png";
import { app } from "firebase.config";
import { Route, Routes } from "react-router";
import Main from "Main";
import RequiredAuth from "components/common/PrivatedRoutes/RequiredRoutes";
import { ROUTES } from "utils/routes";
import { Suspense, useEffect } from "react";
import react, {lazy} from "react";
import Navbar from "components/common/Navbar/Navbar";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage";
import LandingPage from "pages/LandingPage/LandingPage";
import { ToastContainer } from "react-toastify";
import Loader from "components/UI/Loader/Loader";
import { GetIndividualUserData } from "utils/authService";
import { getUserDataHandler, signUpUser } from "reduxStore/reducers/userSlice";
import { useDispatch } from "react-redux";
// import ProfilePage  from './pages/ProfilePage/ProfilePage';


const PostPage = lazy(() => import("pages/PostPage/PostPage"));
const ProfilePage = lazy(() => import('pages/ProfilePage/ProfilePage'));
const HomePage = lazy(() => import("pages/HomePage/HomePage"));
const ExplorePage  = lazy(() => import("pages/ExplorePage/ExplorePage"));
const LoginPage    = lazy(() => import("pages/LoginPage/LoginPage"));
const SignUpPage   = lazy(() => import("pages/SignUpPage/SignUpPage"));
const BookmarkPage = lazy(() => import("pages/BookmarkPage/BookmarkPage"));
// const NotFoundPagect.lazy(() => import("pages/NotFoundPage/NotFoundPage"));


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("hit");
    console.log(JSON.parse(localStorage.getItem(ROUTES.VAR_ENCODE_TOKEN))?.user?.userId);
    if (!!JSON.parse(localStorage.getItem(ROUTES.VAR_ENCODE_TOKEN))?.user?.userId) {
     
      dispatch(signUpUser(JSON.parse(localStorage.getItem(ROUTES.VAR_ENCODE_TOKEN))?.user?.userId));
    }
  },[])
  return (
    <div className="App">
      <Navbar/>
       <Routes >
        <Route element={
          <RequiredAuth>
            <Main />
          </RequiredAuth>}>
          <Route path={ROUTES.ROUTE_PATH_HOMEPAGE} element={
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>}
          />
          <Route path={ROUTES.ROUTE_PATH_EXPLOREPAGE} element={
              <Suspense fallback={<Loader/>}>
                <ExplorePage />
              </Suspense>}
          />
          <Route path={ROUTES.ROUTE_PATH_BOOKMARKPAGE} element={
              <Suspense fallback={<Loader />}>
                <BookmarkPage />
              </Suspense>
          }/>
        
          <Route path={ROUTES.ROUTE_PATH_ProfilePage} element={
            <Suspense fallback={<Loader />}>
              <ProfilePage />
           </Suspense>
          }/>

          <Route path={ROUTES.ROUTE_PATH_POSTPAGE} element={
              <Suspense fallback={<Loader />}>
                <PostPage />
            </Suspense>
          } />
        </Route>
        <Route
            path={ROUTES.ROUTE_PATH_LoginPage} element={
              <Suspense fallback={<Loader />}>
                <LoginPage />
              </Suspense>}
          />
          <Route path={ROUTES.ROUTE_PATH_SignupPage} element={
            <Suspense fallback={<Loader />}>
              <SignUpPage />
            </Suspense>}
        />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path={ROUTES.ROUTE_PATH_LANDINGPAGE} element={<LandingPage />} />
				<Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
