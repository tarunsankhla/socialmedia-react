import "./App.css";
import logo from "./logo.png";
import { app } from "firebase.config";
import { Route, Routes } from "react-router";
import Main from "Main";
import RequiredAuth from "components/common/PrivatedRoutes/RequiredRoutes";
import { ROUTES } from "utils/routes";
import { Suspense } from "react";
import react from "react";
import Navbar from "components/common/Navbar/Navbar";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage";
import LandingPage from "pages/LandingPage/LandingPage";
import { ToastContainer } from "react-toastify";
import Loader from "components/UI/Loader/Loader";


const PostPage = react.lazy(() => import("pages/PostPage/PostPage"));
const ProfilePage = react.lazy(() => import('./pages/ProfilePage/ProfilePage'));
const HomePage = react.lazy(() => import("pages/HomePage/HomePage"));
const ExplorePage  = react.lazy(() => import("pages/ExplorePage/ExplorePage"));
const LoginPage    = react.lazy(() => import("pages/LoginPage/LoginPage"));
const SignUpPage   = react.lazy(() => import("pages/SignUpPage/SignUpPage"));
const BookmarkPage = react.lazy(() => import("pages/BookmarkPage/BookmarkPage"));
// const NotFoundPage = react.lazy(() => import("pages/NotFoundPage/NotFoundPage"));


function App() {
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
