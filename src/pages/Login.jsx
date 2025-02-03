import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Home from "../pages/Home";
import SpinnerHomePage from "../components/SpinnerHomePage";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const [showInfo, setShowInfo] = useState(false);
  const [role, setRole] = useState("Job Seeker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (error) {
      toast.info(error);
      dispatch(clearAllUserErrors());
    }
  }, [dispatch, error, loading, isAuthenticated]);
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };
  const [formIncompleteOrLoading, setFormIncompleteOrLoading] = useState(true);
  useEffect(() => {
    if (email !== "" && password !== "" && !loading) {
      setFormIncompleteOrLoading(false);
    } else {
      setFormIncompleteOrLoading(true);
    }
  }, [email, password, loading]);
  // for page Loading animation
  if (loading) {
    return <SpinnerHomePage />;
  }
  if (isAuthenticated) {
    return <Home />;
  } else {
    return (
      <div className="flex justify-between py-8 w-full">
        <img
          src="./RegisterBanner.jpg"
          className="hidden sticky top-[50px] h-[500px] lg:w-[35%] lg:flex"
        />
        <div className="flex flex-col justify-center items-start gap-4 w-full sm:w-[600px] md:w-[750px] lg:w-[55%] lg:px-[100px]">
          <div className="flex items-start w-full pt-2 pl-2">
            <IoIosInformationCircleOutline
              className="animated-box text-3xl"
              onClick={() => {
                setShowInfo(!showInfo);
              }}
            />
            {showInfo && (
              <div className="fixed top-0 left-0 z-20 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className=" p-4 bg-white shadow-lg">
                  <p className="mb-5 mt-5">
                    <span className="text-xl font-[500]">Demo Id</span>
                    <br />
                    <br />
                    For Job Seeker-
                    <br />
                    Gmail: jobseeker@gmail.com
                    <br />
                    Password: password
                    <br />
                    <br />
                    For Employer-
                    <br />
                    Gmail: employer@gmail.com
                    <br />
                    Password: password
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setShowInfo(!showInfo);
                      }}
                      className="bg-sky-600 rounded text-white p-2 hover:cursor-pointer"
                    >
                      Thank You ✓
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <h3 className="text-xl">Login to your account</h3>
          <div className="w-full">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <label className="text-xl">Login As</label>
              <div className="flex">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border-2 border-black border-r-0"
                >
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser className="text-3xl text-white bg-sky-600 p-1" />
              </div>
              <label className="text-xl">Email</label>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-black border-r-0 pl-2 "
                />
                <MdOutlineMailOutline className="text-3xl text-white bg-sky-600 p-1" />
              </div>
              <label className="text-xl">Password</label>
              <div className="flex">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-black border-r-0 pl-2 "
                />
                {showPassword ? (
                  <IoEyeOutline
                    className="text-3xl p-1 text-white bg-sky-600"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <IoEyeOffOutline
                    className="text-3xl p-1 text-white bg-sky-600"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={formIncompleteOrLoading}
                  className={`bg-sky-600 rounded text-center w-full text-white py-2 ${
                    formIncompleteOrLoading
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  Login
                </button>
                Don't have an account yet ?
                <Link
                  to={"/register"}
                  className={` bg-gray-300 rounded underline w-full hover:text-white hover:bg-gray-400 hover:cursor-pointer text-center text-back py-2`}
                >
                  Register Now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
