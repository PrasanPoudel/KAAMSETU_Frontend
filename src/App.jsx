import React, { useEffect, Suspense, lazy } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/userSlice";
import Navbar from "./components/Layout/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Spinner from "./components/Spinner";
import SpinnerHome from "./components/SpinnerHome";
import NotFound from "./pages/NotFound";
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Jobs = lazy(() => import("./pages/Jobs"));
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

// Component to conditionally render navbar based on current path
const AppLayout = () => {
  const location = useLocation();
  const authRoutes = ["/login", "/register"];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
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
              <Suspense fallback={<Spinner />}>
                <Jobs />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sendmessage"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Spinner />}>
                <SendMessage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserProfile/:activeComponent"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Spinner />}>
                <UserProfile />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/application/:jobId"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Spinner />}>
                <PostApplication />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
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
    return <SpinnerHome />;
  }

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppLayout />
      <ToastContainer
        position="top-right"
        theme="light"
        style={{ width: 295 }}
      />
    </Router>
  );
};

export default App;
