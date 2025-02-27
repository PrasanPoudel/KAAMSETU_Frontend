import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/userSlice";
import Loader from "./components/Loader"; // Import your custom Loader component

// Lazy load all pages
const Home = lazy(() => import("./pages/Home"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PostApplication = lazy(() => import("./pages/PostApplication"));
const Register = lazy(() => import("./pages/Register"));
const SendMessage = lazy(() => import("./pages/SendMessage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);

  return children;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
                <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense>
            }
          />
          <Route
            path="/jobs"
            element={
                <Suspense fallback={<Loader />}>
                  <Jobs />
                </Suspense>
            }
          />
          <Route
            path="/sendmessage"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <SendMessage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:activeComponent"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/application/:jobId"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <PostApplication />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loader />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          theme="light"
          style={{ width: 300 }}
        />
      </Router>
    </>
  );
};

export default App;