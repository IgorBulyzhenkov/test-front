import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrivetRoute from "./Routy/PrivatRouter";
import PublicRoute from "./Routy/PublickRouter";
import user from "../redux/user/userOperation";
import PulseLoader from "react-spinners/PulseLoader";
import { getVerify, getVerifyToken } from "../redux/user/user-selectors";
import "./App.css";
import Footer from "./Footer/Footer";
import dragonOperation from "../redux/dragon/dragonOperation";
import { getInLoggedIn } from "../redux/user/user-selectors";
import Header from "./Header/Header";

const Verify = lazy(() =>
  import("../pages/Verify" /* webpackChunkName: "Verify" */)
);

const Home = lazy(() => import("../pages/Home" /* webpackChunkName: "Home" */));

const Gallery = lazy(() =>
  import("../pages/Gallery" /* webpackChunkName: "Gallery" */)
);

const Registration = lazy(() =>
  import("../pages/Registration" /* webpackChunkName: "Registration" */)
);

const Login = lazy(() =>
  import("../pages/Login" /* webpackChunkName: "Login" */)
);

const DragonDetails = lazy(() =>
  import("../pages/DragonDetails" /* webpackChunkName: "DragonDetails" */)
);
const { fetchCurrentUser } = user;
const { fetchDragon } = dragonOperation;

function App() {
  const verify = useSelector(getVerify);
  const verifyToken = useSelector(getVerifyToken);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getInLoggedIn);

  useEffect(() => {
    if (isLoggedIn) return;
    dispatch(fetchCurrentUser());
    dispatch(fetchDragon());
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <div className="App">
        <Header />
        <Suspense
          fallback={
            <div className="loader">
              <PulseLoader color="#02172a" className="spinier" />
            </div>
          }
        >
          <Routes>
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <Registration />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivetRoute>
                  <Home />
                </PrivetRoute>
              }
            />
            <Route
              path="/gallery"
              element={
                <PrivetRoute>
                  <Gallery />
                </PrivetRoute>
              }
            />
            <Route
              path="/details/:id"
              element={
                <PrivetRoute>
                  <DragonDetails />
                </PrivetRoute>
              }
            />
            <Route
              path="/verify"
              element={
                !verify && verifyToken ? <Verify /> : <Navigate to="/home" />
              }
            />
              <Route
                path="*"
                element={
                  isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/auth" />
                }
              />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
}

export default App;
