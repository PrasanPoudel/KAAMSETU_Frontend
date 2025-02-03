import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const [role, setRole] = useState("Job Seeker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [firstChoice, setFirstChoice] = useState("Not Given");
  const [secondChoice, setSecondChoice] = useState("Not Given");
  const [thirdChoice, setThirdChoice] = useState("Not Given");
  const [resume, setResume] = useState("");

  const jobCategoryArray = [
    "Not Given",
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "DevOps",
    "Mobile App Development",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };
  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if (role === "Job Seeker") {
      formData.append("firstChoice", firstChoice);
      formData.append("secondChoice", secondChoice);
      formData.append("thirdChoice", thirdChoice);
      formData.append("resume", resume);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated, message]);

  return (
    <div className="flex justify-between py-8 w-full">
      <img
        src="./RegisterBanner.jpg"
        className="hidden sticky top-[50px] h-[500px] lg:w-[35%] lg:flex"
      />
      <div className="flex flex-col justify-center items-start gap-4 w-full sm:w-[600px] md:w-[750px] lg:w-[55%] lg:px-[100px]">
        <h3 className="text-xl">Register A New Account</h3>
        <div className="w-full">
          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-4 justify-center w-full items-start"
          >
            <label className="text-xl">Register As</label>
            <div className="flex w-full">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="pl-2 w-full border-2 border-black border-r-0"
              >
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser className="text-3xl text-white bg-sky-600 p-1" />
            </div>

            <label className="text-xl">Name</label>
            <div className="flex w-full">
              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                  )
                }
                className="w-full border-2 border-black border-r-0 pl-2 "
              />
              <FaPencilAlt className="text-3xl text-white bg-sky-600 p-1" />
            </div>

            <label className="text-xl">Email Address</label>
            <div className="flex w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-black border-r-0 pl-2 "
              />
              <MdOutlineMailOutline className="text-3xl text-white bg-sky-600 p-1" />
            </div>
            <label className="text-xl">Phone Number</label>
            <div className="flex w-full">
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-2 border-black border-r-0 pl-2 "
              />
              <FaPhoneFlip className="text-3xl text-white bg-sky-600 p-1" />
            </div>

            <label className="text-xl">Address</label>
            <div className="flex w-full">
              <input
                type="text"
                value={address}
                onChange={(e) =>
                  setAddress(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                  )
                }
                className="w-full border-2 border-black border-r-0 pl-2 "
              />
              <FaAddressBook className="text-3xl text-white bg-sky-600 p-1" />
            </div>

            <label className="text-xl">Password</label>
            <div className="flex w-full">
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
            {role === "Job Seeker" && (
              <>
                <div className="flex flex-col gap-4 w-full justify-center">
                  <p className="text-xl">Job Choices</p>
                  <div className="flex flex-col gap-8">
                    <div className="flex w-full">
                      <select
                        value={firstChoice}
                        onChange={(e) => setFirstChoice(e.target.value)}
                        className="w-full border-2 border-black border-r-0 px-2 "
                      >
                        {jobCategoryArray.map((jobCategory, index) => {
                          return (
                            <option key={index} value={jobCategory}>
                              {jobCategory}
                            </option>
                          );
                        })}
                      </select>
                      <MdCategory className="text-3xl text-white bg-sky-600 p-1" />
                    </div>

                    <div className="flex w-full">
                      <select
                        value={secondChoice}
                        onChange={(e) => setSecondChoice(e.target.value)}
                        className="w-full border-2 border-black border-r-0 px-2 "
                      >
                        {jobCategoryArray.map((jobCategory, index) => {
                          return (
                            <option key={index} value={jobCategory}>
                              {jobCategory}
                            </option>
                          );
                        })}
                      </select>
                      <MdCategory className="text-3xl text-white bg-sky-600 p-1" />
                    </div>

                    <div className="flex w-full">
                      <select
                        value={thirdChoice}
                        onChange={(e) => setThirdChoice(e.target.value)}
                        className="w-full border-2 border-black border-r-0 px-2 "
                      >
                        {jobCategoryArray.map((jobCategory, index) => {
                          return (
                            <option key={index} value={jobCategory}>
                              {jobCategory}
                            </option>
                          );
                        })}
                      </select>
                      <MdCategory className="text-3xl text-white bg-sky-600 p-1" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-xl">Resume</label>
                  <input
                    type="file"
                    className="text-[12px]"
                    onChange={resumeHandler}
                  />
                </div>
              </>
            )}
            <button
              type="submit"
              className="bg-sky-600 rounded w-full hover:cursor-pointer text-center text-white py-2"
              disabled={loading}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
