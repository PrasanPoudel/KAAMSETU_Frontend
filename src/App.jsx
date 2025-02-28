import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/userSlice";
import Loader from "./components/Loader"; // Import your custom Loader component
import Dashboard from "./pages/Dashboard";
// Lazy load all pages
const Home = React.lazy(() => import("./pages/Home"));
const Jobs = React.lazy(() => import("./pages/Jobs"));
const Login = React.lazy(() => import("./pages/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const PostApplication = React.lazy(() => import("./pages/PostApplication"));
const Register = React.lazy(() => import("./pages/Register"));
const SendMessage = React.lazy(() => import("./pages/SendMessage"));
const Footer = React.lazy(() => import("./components/Footer"));
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
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/application/:jobId"
            element={
              <Suspense fallback={<Loader />}>
                <PostApplication />
              </Suspense>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
        <Suspense fallback={<Loader />}>
          <Footer />
        </Suspense>
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
