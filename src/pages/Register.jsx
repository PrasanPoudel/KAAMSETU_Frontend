import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import jobCategoryArray from "../data/jobCategoryArray";
import cities from "../data/cities";
import FileUploader from "../components/FileUploader";
import ImageUploader from "../components/ImageUploader";
const Register = () => {
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
    formData.append("profilePicture", profilePicture);
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
  const [filteredSuggestionsForLocation, setFilteredSuggestionsForLocation] =
    useState([]);
  const handleAddressChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setAddress(input);

    if (input.length > 0) {
      const filtered = cities.filter(
        (city) => city.toLowerCase().startsWith(input.toLowerCase()) // Ensure it starts with input
      );
      setFilteredSuggestionsForLocation(filtered);
    } else {
      setFilteredSuggestionsForLocation([]); // Hide suggestions when input is empty
    }
  };
  const [
    filteredSuggestionsForFirstChoice,
    setFilteredSuggestionsForFirstChoice,
  ] = useState([]);
  const [
    filteredSuggestionsForSecondChoice,
    setFilteredSuggestionsForSecondChoice,
  ] = useState([]);
  const [
    filteredSuggestionsForThirdChoice,
    setFilteredSuggestionsForThirdChoice,
  ] = useState([]);
  const handleFirstChoiceChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setFirstChoice(input);

    if (input.length > 0) {
      const filtered = jobCategoryArray.filter(
        (job) => job.toLowerCase().startsWith(input.toLowerCase()) // Ensure it starts with input
      );
      setFilteredSuggestionsForFirstChoice(filtered);
    } else {
      setFilteredSuggestionsForFirstChoice([]); // Hide suggestions when input is empty
    }
  };
  const handleSecondChoiceChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setSecondChoice(input);

    if (input.length > 0) {
      const filtered = jobCategoryArray.filter(
        (job) => job.toLowerCase().startsWith(input.toLowerCase()) // Ensure it starts with input
      );
      setFilteredSuggestionsForSecondChoice(filtered);
    } else {
      setFilteredSuggestionsForSecondChoice([]); // Hide suggestions when input is empty
    }
  };

  const handleThirdChoiceChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setThirdChoice(input);

    if (input.length > 0) {
      const filtered = jobCategoryArray.filter(
        (job) => job.toLowerCase().startsWith(input.toLowerCase()) // Ensure it starts with input
      );
      setFilteredSuggestionsForThirdChoice(filtered);
    } else {
      setFilteredSuggestionsForThirdChoice([]); // Hide suggestions when input is empty
    }
  };
  const handleAddressBlur = () => {
    setTimeout(() => setFilteredSuggestionsForLocation([]), 200);
  };
  const handleFirstChoiceBlur = () => {
    setTimeout(() => setFilteredSuggestionsForFirstChoice([]), 200);
  };

  const handleSecondChoiceBlur = () => {
    setTimeout(() => setFilteredSuggestionsForSecondChoice([]), 200);
  };

  const handleThirdChoiceBlur = () => {
    setTimeout(() => setFilteredSuggestionsForThirdChoice([]), 200);
  };

  return (
    <div className="lg:py-2 w-full bg-img">
      <div className="flex flex-col justify-center items-start gap-2 w-full sm:w-[600px] md:w-[750px] lg:w-[55%]">
        <h3 className="text-3xl font-bold">Register A New Account</h3>
        <div className="w-full">
          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-2 justify-center w-full items-start"
          >
            {step === 1 && (
              <>
                <label className="text-xl font-medium">Register As</label>
                <div className="flex w-full rounded-md border-2 border-black bg-white justify-between items-center px-2">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="px-2 w-full bg-white"
                  >
                    <option value="" disabled>
                      Please Select A Role
                    </option>
                    <option value="Employer">Employer</option>
                    <option value="Job Seeker">Job Seeker</option>
                  </select>
                  <FaRegUser className="text-3xl" />
                </div>
                <label className="text-xl font-medium">Name</label>
                <div className="flex w-full rounded-md border-2 border-black bg-white justify-between items-center px-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value.charAt(0).toUpperCase() +
                          e.target.value.slice(1)
                      )
                    }
                    className="pl-2 w-full"
                  />
                  <HiOutlinePencilAlt className="text-4xl" />
                </div>
                <label className="text-xl font-medium">Phone Number</label>
                <div className="flex w-full rounded-md border-2 border-black bg-white justify-between items-center px-2">
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => {
                      const phNumber = e.target.value;
                      setPhone(phNumber);
                      setIsValid(/^[0-9]{10}$/.test(phNumber));
                    }}
                    className="pl-2 w-full"
                  />
                  <MdOutlineContactPhone className="text-4xl" />
                </div>
                {!isValid && phone.length > 0 && (
                  <p className="text-red-500 mt-[-10px] ml-2">
                    Error: Invalid phone number
                  </p>
                )}
                <label className="text-xl font-medium">Address</label>
                <div className="flex w-full rounded-md border-2 border-black bg-white justify-between items-center px-2">
                  <div className="w-full flex items-center bg-white pl-2">
                    <div className="relative w-full">
                      <input
                        onBlur={handleAddressBlur}
                        type="text"
                        value={address}
                        onChange={handleAddressChange}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowRight" || e.key === "Tab") {
                            e.preventDefault();
                            if (filteredSuggestionsForLocation.length > 0) {
                              setAddress(filteredSuggestionsForLocation[0]);
                              setFilteredSuggestionsForLocation([]);
                            }
                          }
                        }}
                        className="w-full placeholder:text-gray-500"
                      />
                      {filteredSuggestionsForLocation.length > 0 &&
                        address.length > 0 && (
                          <span className="absolute left-0 top-[12px]">
                            {address}
                            <span className="text-gray-500">
                              {filteredSuggestionsForLocation[0].slice(
                                address.length
                              )}
                            </span>
                          </span>
                        )}
                    </div>
                  </div>
                  <MdOutlineLocationOn className="text-4xl" />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <label className="text-xl font-medium">Email Address</label>
                <div className="flex w-full rounded-md border-2 border-black bg-white justify-between items-center px-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    className="pl-2 w-full"
                  />
                  <MdOutlineMailOutline className="text-4xl" />
                </div>
                <label className="text-xl font-medium">Password</label>
                <div className="flex w-full rounded-md border-2 border-black bg-white justify-between items-center px-2">
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
              </>
            )}
            {step === 3 && (
              <>
                <div className="flex flex-col gap-4 w-full">
                  <label className="text-xl font-medium">Profile Picture</label>
                  <ImageUploader onImageUpload={profilePictureHandler} />
                </div>
                {role === "Job Seeker" && (
                  <>
                    <div className="flex flex-col gap-4 w-full">
                      <label className="text-xl font-medium">Resume</label>
                      <FileUploader onFileUpload={resumeHandler} />
                    </div>
                    <div className="flex flex-col gap-4 w-full justify-center">
                      <p className="text-xl font-medium">Job Choices <span>(Select Any 3 Job Category You Prefer To Do)</span></p>
                      <div className="flex flex-col gap-8">
                        <div className="flex w-full rounded-md border-2 border-black bg-white justify-between items-center px-2">
                          <div className="pl-2 w-full">
                            <div className="relative w-full">
                              <input
                                onBlur={handleFirstChoiceBlur}
                                type="text"
                                value={firstChoice}
                                onChange={handleFirstChoiceChange}
                                onKeyDown={(e) => {
                                  if (
                                    e.key === "ArrowRight" ||
                                    e.key === "Tab"
                                  ) {
                                    e.preventDefault();
                                    if (
                                      filteredSuggestionsForFirstChoice.length >
                                      0
                                    ) {
                                      setFirstChoice(
                                        filteredSuggestionsForFirstChoice[0]
                                      );
                                      setFilteredSuggestionsForFirstChoice([]);
                                    }
                                  }
                                }}
                                className="w-full outline-none bg-transparent text-black placeholder:text-gray-500"
                              />
                              {filteredSuggestionsForFirstChoice.length > 0 &&
                                jobCategoryArray.length > 0 && (
                                  <span className="absolute left-0 top-[12px]">
                                    {firstChoice}
                                    <span className="text-gray-500">
                                      {filteredSuggestionsForFirstChoice[0].slice(
                                        firstChoice.length
                                      )}
                                    </span>
                                  </span>
                                )}
                            </div>
                          </div>
                          <p className="text-xl pl-2">1st</p>
                        </div>

                        <div className="flex w-full rounded-md border-2 border-black bg-white justify-between items-center px-2">
                          <div className="pl-2 w-full">
                            <div className="relative w-full">
                              <input
                                onBlur={handleSecondChoiceBlur}
                                type="text"
                                value={secondChoice}
                                onChange={handleSecondChoiceChange}
                                onKeyDown={(e) => {
                                  if (
                                    e.key === "ArrowRight" ||
                                    e.key === "Tab"
                                  ) {
                                    e.preventDefault();
                                    if (
                                      filteredSuggestionsForSecondChoice.length >
                                      0
                                    ) {
                                      setSecondChoice(
                                        filteredSuggestionsForSecondChoice[0]
                                      );
                                      setFilteredSuggestionsForSecondChoice([]);
                                    }
                                  }
                                }}
                                className="w-full outline-none bg-transparent text-black placeholder:text-gray-500"
                              />
                              {filteredSuggestionsForSecondChoice.length > 0 &&
                                jobCategoryArray.length > 0 && (
                                  <span className="absolute left-0 top-[12px]">
                                    {secondChoice}
                                    <span className="text-gray-500">
                                      {filteredSuggestionsForSecondChoice[0].slice(
                                        secondChoice.length
                                      )}
                                    </span>
                                  </span>
                                )}
                            </div>
                          </div>
                          <p className="text-xl pl-2">2nd</p>
                        </div>

                        <div className="flex w-full rounded-md border-2 border-black bg-white justify-between items-center px-2">
                          <div className="pl-2 w-full">
                            <div className="relative w-full">
                              <input
                                onBlur={handleThirdChoiceBlur}
                                type="text"
                                value={thirdChoice}
                                onChange={handleThirdChoiceChange}
                                onKeyDown={(e) => {
                                  if (
                                    e.key === "ArrowRight" ||
                                    e.key === "Tab"
                                  ) {
                                    e.preventDefault();
                                    if (
                                      filteredSuggestionsForThirdChoice.length >
                                      0
                                    ) {
                                      setThirdChoice(
                                        filteredSuggestionsForThirdChoice[0]
                                      );
                                      setFilteredSuggestionsForThirdChoice([]);
                                    }
                                  }
                                }}
                                className="w-full outline-none bg-transparent text-black placeholder:text-gray-500"
                              />
                              {filteredSuggestionsForThirdChoice.length > 0 &&
                                jobCategoryArray.length > 0 && (
                                  <span className="absolute left-0 top-[12px]">
                                    {thirdChoice}
                                    <span className="text-gray-500">
                                      {filteredSuggestionsForThirdChoice[0].slice(
                                        thirdChoice.length
                                      )}
                                    </span>
                                  </span>
                                )}
                            </div>
                          </div>
                          <p className="text-xl pl-2">3rd</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <button
                  type="submit"
                  className="mb-2 bg-gray-500 text-white text-xl rounded-md w-full hover:bg-gray-600 hover:cursor-pointer text-center py-2"
                  disabled={loading}
                >
                  Register
                </button>
              </>
            )}
          </form>
          <div className="w-full flex justify-between items-center mt-2">
            <button
              onClick={prevStep}
              className={`${
                isDisabled
                  ? "text-white bg-white"
                  : "text-white bg-gray-500 hover:bg-gray-600"
              } text-xl  py-2 px-4 rounded-md cursor-pointer`}
              disabled={isDisabled}
            >
              Back
            </button>
            {step < 3 && (
              <button
                onClick={nextStep}
                className="text-xl text-white bg-sky-600 hover:bg-sky-700 py-2 px-4 rounded-md cursor-pointer"
              >
                Next
              </button>
            )}
          </div>
          Already have an account ?
          <button
            onClick={() => navigateTo("/login")}
            className="bg-sky-600 hover:bg-sky-700 text-xl rounded-md w-full hover:cursor-pointer text-center text-white py-2 mt-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
