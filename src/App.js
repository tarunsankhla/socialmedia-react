import "./App.css";
import logo from "./logo.png";
import { app } from "firebasec.onfig";
import { Route, Routes } from "react-router";
import { ROUTES } from "src/utils/route.js";
import { Suspense } from "react/cjs/react.production.min";
import HomePage from "pages/HomePage/HomePage";
import Main from "Main";
import ExplorePage from "pages/ExplorePage/ExplorePage";
import ProfilePage from "pages/ProfilePage/ProfilePage";
import LoginPage from "pages/LoginPage/LoginPage";
import SignUpPage from "pages/SignUpPage/SignUpPage";
import BookmarkPage from "pages/BookmarkPage/BookmarkPage";
import RequiredAuth from "components/common/PrivatedRoutes/RequiredRoutes";
import Mockman from 'mockman-js';
import NotFoundPage from "pages/NotFoundPage/NotFoundPage";

console.log(app);
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
          <Route path={ROUTES.ROUTE_PATH_LoginPage} element={
            <RequiredAuth>
              <Suspense fallback={"..loading"}>
                <LoginPage />
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
        </Route>
        <Route path={ROUTES.ROUTE_PATH_MOCKMAN} element={<div className='MockAPI'><Mockman /></div>} />
        <Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
