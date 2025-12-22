import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import {
  MdOutlineMailOutline,
  MdOutlineContactPhone,
  MdOutlineLocationOn,
} from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { TbUserPlus } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { GiSkills } from "react-icons/gi";
import jobCategoryArray from "../data/jobCategoryArray";
import cities from "../data/cities";
import FileUploader from "../components/FileUploader";
import ImageUploader from "../components/ImageUploader";
import AutoSuggestion from "../components/AutoSuggestion";
import KaamSetuLogo from "../images/KaamSetu.png";
import SpinnerHome from "../components/SpinnerHome";

const Register = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const [step, setStep] = useState(1);
  const [isDisabled, setIsDiabled] = useState(true);
  const nextStep = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
    setIsDiabled(false);
    setStep(step + 1);
  };
  const prevStep = () => {
    if (step === 2) {
      setIsDiabled(true);
    }
    if (step > 1) {
      setStep(step - 1);
    }
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [firstChoice, setFirstChoice] = useState("");
  const [secondChoice, setSecondChoice] = useState("");
  const [thirdChoice, setThirdChoice] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [resume, setResume] = useState("");
  const profilePictureHandler = (file) => {
    setProfilePicture(file);
  };
  const resumeHandler = (file) => {
    setResume(file);
  };
  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("profilePicture", profilePicture);
    if (role === "Job Seeker") {
      formData.append("firstChoice", firstChoice);
      formData.append("secondChoice", secondChoice);
      formData.append("thirdChoice", thirdChoice);
      formData.append("resume", resume);
    }

    dispatch(register(formData));
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    } else if (!error && isAuthenticated) {
      toast.info(message);
      navigateTo("/login");
      dispatch(clearAllUserErrors());
    }
  };

  const handleAddressChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setAddress(input);
  };

  const handleFirstChoiceChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setFirstChoice(input);
  };

  const handleSecondChoiceChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setSecondChoice(input);
  };

  const handleThirdChoiceChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setThirdChoice(input);
  };

  if (loading) {
    return <SpinnerHome />;
  } else {
    return (
      <div className="min-h-screen flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden">
        {/* Left panel - Brand image and information */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sky-600 to-sky-800 text-white p-10 flex-col justify-between">
          <div className="flex flex-col">
            <img
              src={KaamSetuLogo}
              alt="KaamSetu Logo"
              className="w-32 h-32 object-contain mb-10 mix-blend-lighten"
            />
            <h1 className="text-4xl font-bold mb-4">Join KaamSetu</h1>
            <p className="text-xl mb-6">
              Start your professional journey with us
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <FiUsers className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Join our community</h3>
                  <p className="text-sm text-gray-100">
                    Connect with employers and job seekers nationwide
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <GiSkills className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Showcase your skills</h3>
                  <p className="text-sm text-gray-100">
                    Let employers discover your unique talents and expertise
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-200 mt-5">
        &copy; CopyRight 2024 Kaamsetu. All Rights Reserved.

          </p>
        </div>

        {/* Right panel - Registration form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-2 sm:p-5 md:p-10 bg-gray-50 overflow-y-auto">
          <div className="max-w-md w-full">
            {/* Mobile logo */}
            <div className="flex justify-center md:hidden mb-8">
              <img
                src={KaamSetuLogo}
                alt="KaamSetu Logo"
                className="h-20 w-auto object-contain"
              />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Create Account
              </h2>
              <p className="text-gray-600 mt-2">Step {step} of 3</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {step === 1 && (
                <>
                  <div className="form-group">
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Register As
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
                      Full Name
                    </label>
                    <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                          setName(
                            e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1)
                          )
                        }
                        className="w-full h-full focus:outline-none text-base"
                        placeholder="Enter your full name"
                        required
                      />
                      <HiOutlinePencilAlt className="text-lg text-gray-500" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Phone Number
                    </label>
                    <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                      <input
                        type="number"
                        value={phone}
                        onChange={(e) => {
                          const phNumber = e.target.value;
                          setPhone(phNumber);
                          setIsValid(/^[0-9]{10}$/.test(phNumber));
                        }}
                        className="w-full h-full focus:outline-none text-base"
                        placeholder="Enter 10-digit phone number"
                        required
                      />
                      <MdOutlineContactPhone className="text-lg text-gray-500" />
                    </div>
                    {!isValid && phone.length > 0 && (
                      <p className="text-red-500 text-xs mt-1">
                        Please enter a valid 10-digit phone number
                      </p>
                    )}
                  </div>

                  <AutoSuggestion
                    label="Address"
                    value={address}
                    onChange={handleAddressChange}
                    onSelect={(suggestion) => setAddress(suggestion)}
                    suggestions={cities}
                    placeholder="Enter your city"
                    icon={<MdOutlineLocationOn />}
                    required={true}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <div className="form-group">
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Email Address
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
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Password
                    </label>
                    <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-full focus:outline-none text-base"
                        placeholder="Create a password"
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
                    <p className="text-xs text-gray-500 mt-1">
                      Password should be at least 8 characters
                    </p>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="form-group">
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      {role === "Employer" ? "Company Logo" : "Profile Picture"}
                    </label>
                    <ImageUploader
                      onImageUpload={profilePictureHandler}
                      profilePicturePreview={profilePicture}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {role === "Employer"
                        ? "Upload your company logo for better brand visibility"
                        : "Add a professional profile photo"}
                    </p>
                  </div>

                  {role === "Job Seeker" && (
                    <>
                      <div className="form-group mt-4">
                        <label className="block text-gray-700 mb-2 font-medium text-sm">
                          Resume
                        </label>
                        <FileUploader onFileUpload={resumeHandler} />
                        <p className="text-xs text-gray-500 mt-1">
                          Upload your resume (PDF format)
                        </p>
                      </div>

                      <div className="form-group mt-4">
                        <p className="block text-gray-700 mb-2 font-medium text-sm">
                          Job Preferences
                          <span className="ml-1 font-normal text-xs text-gray-500">
                            (Select 3 preferred categories)
                          </span>
                        </p>
                        <div className="flex flex-col gap-3">
                          <AutoSuggestion
                            value={firstChoice}
                            onChange={handleFirstChoiceChange}
                            onSelect={(suggestion) =>
                              setFirstChoice(suggestion)
                            }
                            suggestions={jobCategoryArray}
                            placeholder="First job preference"
                            icon={
                              <span className="text-sm text-gray-500">1st</span>
                            }
                            required={true}
                          />

                          <AutoSuggestion
                            value={secondChoice}
                            onChange={handleSecondChoiceChange}
                            onSelect={(suggestion) =>
                              setSecondChoice(suggestion)
                            }
                            suggestions={jobCategoryArray}
                            placeholder="Second job preference"
                            icon={
                              <span className="text-sm text-gray-500">2nd</span>
                            }
                            required={true}
                          />

                          <AutoSuggestion
                            value={thirdChoice}
                            onChange={handleThirdChoiceChange}
                            onSelect={(suggestion) =>
                              setThirdChoice(suggestion)
                            }
                            suggestions={jobCategoryArray}
                            placeholder="Third job preference"
                            icon={
                              <span className="text-sm text-gray-500">3rd</span>
                            }
                            required={true}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="bg-sky-600 hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 cursor-pointer text-base rounded-lg font-medium w-full text-white py-3 mt-6"
                  >
                    <TbUserPlus className="text-lg" />
                    Create Account
                  </button>
                </>
              )}

              {step !== 3 && (
                <div className="w-full flex justify-between items-center mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className={`${
                      isDisabled
                        ? "opacity-0 pointer-events-none"
                        : "border border-gray-300 hover:bg-gray-100"
                    } text-sm py-2 px-4 rounded-lg flex items-center gap-1 transition-colors text-gray-700`}
                    disabled={isDisabled}
                  >
                    <BsArrowLeft /> Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="text-sm bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-lg cursor-pointer flex items-center gap-1 transition-colors"
                  >
                    Next <BsArrowRight />
                  </button>
                </div>
              )}
            </form>

            <div className="relative flex py-4 items-center mt-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-600 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <p className="text-center text-gray-700 text-sm">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-sky-600 hover:underline font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Register;