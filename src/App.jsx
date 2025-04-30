import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/userSlice";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Loader from "./components/Loader";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Jobs = lazy(() => import("./pages/Jobs"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PostApplication = lazy(() => import("./pages/PostApplication"));
const SendMessage = lazy(() => import("./pages/SendMessage"));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const location = useLocation();

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return !loading && isAuthenticated ? children : null;
};

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser()).catch((error) => {
      console.error("Failed to fetch user data:", error);
    });
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
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
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <Jobs />
              </Suspense>
            </ProtectedRoute>
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
          path="/:activeComponent"
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
      <Footer />
      <ToastContainer
        position="top-right"
        theme="light"
        style={{ width: 275 }}
      />
    </Router>
  );
};

export default App;
