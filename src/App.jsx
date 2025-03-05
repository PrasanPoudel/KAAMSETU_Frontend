import React, { useEffect } from "react";
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
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PostApplication from "./pages/PostApplication";
import Register from "./pages/Register";
import SendMessage from "./pages/SendMessage";
import Footer from "./components/Footer";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser()).catch((error) => {
      console.error("Failed to fetch user data:", error);
    });
  }, [dispatch]);

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
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sendmessage"
          element={
            <ProtectedRoute>
              <SendMessage />
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
            <ProtectedRoute>
              <PostApplication />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
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
