import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Home from "./Jobs";
import SpinnerHomePage from "../components/SpinnerHomePage";
import KaamSetu from "../images/KaamSetu.png";

const Login = () => {
   useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      }, []);
  const [role, setRole] = useState("");
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
      toast.error(error);
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
      <div className="flex flex-col lg:flex-row justify-between lg:py-8 w-full">
        <img
          src={KaamSetu}
          className="w-[120px] h-[120px] lg:sticky lg:top-[50px] lg:h-[500px] lg:w-[35%] lg:flex"
        />
        <div className="flex flex-col justify-center items-start gap-4 w-full sm:w-[600px] md:w-[750px] lg:w-[55%] lg:px-[100px]">
          <h3 className="text-3xl">Welcome Back</h3>
          <div className="w-full">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <label className="text-xl font-medium">Login As</label>
              <div className="flex px-2 border-2 border-black rounded-md justify-between items-center">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="px-2 w-full"
                >
                  <option value="" disabled>
                    Please Select A Role
                  </option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser className="text-3xl" />
              </div>
              <label className="text-xl font-medium">Email</label>
              <div className="flex rounded-md px-2 border-2 border-black items-center justify-between">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  className="pl-2 w-full"
                />
                <MdOutlineMailOutline className="text-4xl" />
              </div>
              <label className="text-xl font-medium">Password</label>
              <div className="flex rounded-md px-2 border-2 border-black items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-2 w-full"
                />
                {showPassword ? (
                  <IoEyeOutline
                    className="text-4xl"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <IoEyeOffOutline
                    className="text-4xl"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              <button
                type="submit"
                disabled={formIncompleteOrLoading}
                className={`bg-sky-600 hover:bg-sky-700 text-xl rounded-md text-center w-full text-white  md:px-2 px-1   py-2 ${
                  formIncompleteOrLoading
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Login
              </button>
              <div className="flex flex-col gap-4 mt-5">
                Don't have an account yet ?
                <button
                  onClick={() => {
                    if (role == "") {
                      toast.info("Select user role for login");
                    } else if (role && role == "Employer") {
                      setEmail("employer@gmail.com");
                      setPassword("password");
                    } else if (role && role == "Job Seeker") {
                      setEmail("jobseeker@gmail.com");
                      setPassword("password");
                    }
                  }}
                  className={` bg-sky-600 hover:bg-sky-700 text-xl rounded-md w-full text-white hover:cursor-pointer text-center  md:px-2 px-1   py-2`}
                >
                  Login With Demo Account
                </button>
                <Link
                  to={"/register"}
                  className={` bg-gray-500 text-white text-xl rounded-md underline w-full hover:bg-gray-600 hover:cursor-pointer text-center text-back md:px-2 px-1 py-2`}
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
