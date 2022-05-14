import "./App.css";
import logo from "./logo.png";
import { app } from "firebase.config";
import { Route, Routes } from "react-router";
import Main from "Main";
import RequiredAuth from "components/common/PrivatedRoutes/RequiredRoutes";
import Mockman from 'mockman-js';
import { ROUTES } from "utils/routes";
import { Suspense } from "react";
import react from "react";


const PostPage = react.lazy(() => import("pages/PostPage/PostPage"));
const ProfilePage = react.lazy(() => import('./pages/ProfilePage/ProfilePage'));
const HomePage = react.lazy(() => import("pages/HomePage/HomePage"));
const ExplorePage  = react.lazy(() => import("pages/ExplorePage/ExplorePage"));
const LoginPage    = react.lazy(() => import("pages/LoginPage/LoginPage"));
const SignUpPage   = react.lazy(() => import("pages/SignUpPage/SignUpPage"));
const BookmarkPage = react.lazy(() => import("pages/BookmarkPage/BookmarkPage"));
const NotFoundPage = react.lazy(() => import("pages/NotFoundPage/NotFoundPage"));


function App() {
  return (
    <div className="App">
       <Routes >
        <Route element={<Main />}>
          <Route path={ROUTES.ROUTE_PATH_HOMEPAGE} element={
            <Suspense fallback={"..loading"}>
              <HomePage />
            </Suspense>}
          />
          <Route path={ROUTES.ROUTE_PATH_EXPLOREPAGE} element={
            <RequiredAuth>
              <Suspense fallback={"..loading"}>
                <ExplorePage />
              </Suspense>
            </RequiredAuth>}
          />
          <Route path={ROUTES.ROUTE_PATH_BOOKMARKPAGE} element={
            <RequiredAuth>
              <Suspense fallback={"..loading"}>
                <BookmarkPage />
              </Suspense>
            </RequiredAuth>}
          />
          <Route
            path={ROUTES.ROUTE_PATH_LoginPage} element={
            <RequiredAuth>
              <Suspense fallback={"..loading"}>
                <LoginPage />
              </Suspense>
            </RequiredAuth>}
          />
           <Route path={ROUTES.ROUTE_PATH_SignupPage} element={
            <RequiredAuth>
              <Suspense fallback={"..loading"}>
                <SignUpPage />
              </Suspense>
            </RequiredAuth>}
          />
          <Route path={ROUTES.ROUTE_PATH_ProfilePage} element={
            <RequiredAuth>
              <Suspense fallback="Loading">
                <ProfilePage />
              </Suspense>
            </RequiredAuth>}
          />
          <Route path={ROUTES.ROUTE_PATH_POSTPAGE} element={
            <RequiredAuth>
              <Suspense fallback={"..loading"}>
                <PostPage />
              </Suspense>
            </RequiredAuth>}
          />
        </Route>
        
        {/* <Route path={ROUTES.ROUTE_PATH_MOCKMAN} element={<div className='MockAPI'><Mockman /></div>} /> */}
        <Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
