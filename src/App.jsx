import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PostApplication from "./pages/PostApplication";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/userSlice";
import SendMessage from "./pages/SendMessage";


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
  }, []);

  return (
    <>
      <Router>
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
          style={{ width: 300 }}
        />
      </Router>
    </>
  );
};

export default App;
