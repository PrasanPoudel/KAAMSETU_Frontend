import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import SpinnerHome from "../components/SpinnerHome";
import KaamSetuLogo from "../images/KaamSetu.png";

const Login = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
  }, [error, dispatch]);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo(from, { replace: true });
    }
  }, [isAuthenticated, navigateTo, from]);

  if (loading) {
    return <SpinnerHome />;
  } else {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sky-600 to-sky-800 text-white p-10 flex-col justify-between">
          <div className="flex flex-col">
            <img
              src={KaamSetuLogo}
              alt="KaamSetu Logo"
              className="w-32 h-32 object-contain mb-10"
            />
            <h1 className="text-4xl font-bold mb-4">Welcome to KaamSetu</h1>
            <p className="text-xl mb-6">Your bridge to professional success</p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <FiLogIn className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Connect with opportunities</h3>
                  <p className="text-sm text-gray-100">
                    Find your dream job or the perfect candidate
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <FaRegUser className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Personalized experience</h3>
                  <p className="text-sm text-gray-100">
                    Custom-tailored for job seekers and employers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-200">
            © 2024 KaamSetu. All rights reserved.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-5 md:p-10 bg-gray-50">
          <div className="max-w-md w-full">
            <div className="flex justify-center md:hidden mb-8">
              <img
                src={KaamSetuLogo}
                alt="KaamSetu Logo"
                className="h-20 w-auto object-contain"
              />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
              <p className="text-gray-600 mt-2">Access your KaamSetu account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="form-group">
                <label className="block text-gray-700 mb-2 font-medium text-sm">
                  Login As
                </label>
                <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-full bg-white focus:outline-none text-base"
                    required
                  >
                    <option value="" disabled>
                      Please Select A Role
                    </option>
                    <option value="Employer">Employer</option>
                    <option value="Job Seeker">Job Seeker</option>
                  </select>
                  <FaRegUser className="text-lg text-gray-500" />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-gray-700 mb-2 font-medium text-sm">
                  Email
                </label>
                <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    className="w-full h-full focus:outline-none text-base"
                    placeholder="Enter your email"
                    required
                  />
                  <MdOutlineMailOutline className="text-lg text-gray-500" />
                </div>
              </div>

              <div className="form-group">
                <div className="flex justify-between mb-2">
                  <label className="block text-gray-700 font-medium text-sm">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sky-600 hover:underline text-xs font-medium"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-full focus:outline-none text-base"
                    placeholder="Enter your password"
                    required
                  />
                  {showPassword ? (
                    <IoEyeOutline
                      className="text-lg text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <IoEyeOffOutline
                      className="text-lg text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 cursor-pointer text-base rounded-lg font-medium w-full text-white py-3"
              >
                <FiLogIn className="text-lg" />
                Sign In
              </button>

              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-3 text-gray-600 text-sm">
                  Don't have an account?
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <Link
                to="/register"
                className="bg-white hover:bg-gray-50 border-gray-300 border transition-colors flex items-center justify-center gap-2 cursor-pointer text-base rounded-lg font-medium w-full text-gray-700 py-3"
              >
                <FaRegUser className="text-lg" />
                Create an Account
              </Link>

              <div className="mt-6 space-y-2">
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setRole("Employer");
                      setEmail("demo.employer@kaamsetu.com");
                      setPassword("demo1234");
                    }}
                    className="px-4 py-2 mx-2 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    Demo Employer Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRole("Job Seeker");
                      setEmail("demo.jobseeker@kaamsetu.com");
                      setPassword("demo1234");
                    }}
                    className="px-4 py-2 mx-2 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    Demo Job Seeker Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
