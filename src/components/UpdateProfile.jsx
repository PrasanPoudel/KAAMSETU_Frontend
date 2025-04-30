import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "../store/slices/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../store/slices/userSlice";
import { Link } from "react-router-dom";
import jobCategoryArray from "../data/jobCategoryArray";
import cities from "../data/cities";
import ImageUploader from "./ImageUploader";
import FileUploader from "./FileUploader";
import ResumeViewer from "./ResumeViewer";

const UpdateProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const { user } = useSelector((state) => state.user);

  const [isDemoAccount, setIsDemoAccount] = useState(false);
  useEffect(() => {
    setIsDemoAccount(
      user?.name === "Demo Employer" || user?.name === "Demo Job Seeker"
    );
  }, [user]);

  if (isDemoAccount) {
    console.log("It is a Demo Account");
  }
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );
  const dispatch = useDispatch();
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture.url || null
  );
  const [resume, setResume] = useState(user?.resume?.url || null);
  const [firstChoice, setFirstChoice] = useState(
    user && user.jobChoices?.firstChoice
  );
  const [secondChoice, setSecondChoice] = useState(
    user && user.jobChoices?.secondChoice
  );
  const [thirdChoice, setThirdChoice] = useState(
    user && user.jobChoices?.thirdChoice
  );
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (user && user.role === "Job Seeker") {
      formData.append("firstChoice", firstChoice);
      formData.append("secondChoice", secondChoice);
      formData.append("thirdChoice", thirdChoice);
    }
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated.");
      dispatch(clearAllUpdateProfileErrors());
      window.scrollTo(0, 0); // Scroll to the top of the page
      dispatch(getUser());
    }
  }, [dispatch, loading, error, isUpdated, user]);
  const profilePictureHandler = (file) => {
    setProfilePicture(file);
  };
  const resumeHandler = (file) => {
    setResume(file);
  };
  const [filteredSuggestionsForLocation, setFilteredSuggestionsForLocation] =
    useState([]);
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
    <form
      onSubmit={handleUpdateProfile}
      className="grid gap-4 w-full md:w-[80%]"
    >
      <div className="flex flex-col gap-2">
        <label className="text-xl ">Profile Picture</label>
        <ImageUploader
          onImageUpload={profilePictureHandler}
          profilePicturePreview={profilePicture}
        />
        <p className="text-sm">*Click on profile picture to change</p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xl ">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-black pl-2 "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl ">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-black pl-2 "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl ">Phone Number</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border-2 border-black pl-2 "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl ">Address</label>
          <div className="w-full border-2 border-black rounded-md flex items-center bg-white pl-2">
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
                className="w-full outline-none bg-transparent text-black placeholder:text-gray-500"
              />
              {filteredSuggestionsForLocation.length > 0 &&
                address.length > 0 && (
                  <span className="absolute left-0 top-[12px]">
                    {address}
                    <span className="text-gray-500">
                      {filteredSuggestionsForLocation[0].slice(address.length)}
                    </span>
                  </span>
                )}
            </div>
          </div>
        </div>
      </div>
      {user && user.role === "Job Seeker" && (
        <>
          <div className="flex flex-col gap-2">
            <label className="text-xl ">My Job Choices</label>
            <div className="flex flex-col gap-2">
              <div className="w-full border-2 border-black rounded-md flex items-center bg-white pl-2">
                <div className="relative w-full">
                  <input
                    onBlur={handleFirstChoiceBlur}
                    type="text"
                    value={firstChoice}
                    onChange={handleFirstChoiceChange}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "Tab") {
                        e.preventDefault();
                        if (filteredSuggestionsForFirstChoice.length > 0) {
                          setFirstChoice(filteredSuggestionsForFirstChoice[0]);
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
              <div className="w-full border-2 border-black rounded-md flex items-center bg-white pl-2">
                <div className="relative w-full">
                  <input
                    onBlur={handleSecondChoiceBlur}
                    type="text"
                    value={secondChoice}
                    onChange={handleSecondChoiceChange}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "Tab") {
                        e.preventDefault();
                        if (filteredSuggestionsForSecondChoice.length > 0) {
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
              <div className="w-full border-2 border-black rounded-md flex items-center bg-white pl-2">
                <div className="relative w-full">
                  <input
                    onBlur={handleThirdChoiceBlur}
                    type="text"
                    value={thirdChoice}
                    onChange={handleThirdChoiceChange}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "Tab") {
                        e.preventDefault();
                        if (filteredSuggestionsForThirdChoice.length > 0) {
                          setThirdChoice(filteredSuggestionsForThirdChoice[0]);
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
            </div>
          </div>

          {user && user.resume && user.role === "Job Seeker" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xl ">Change Resume</label>
                <FileUploader onFileUpload={resumeHandler} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xl ">Current Resume</label>
                <ResumeViewer resume={resume} />
                <Link
                  to={resume}
                  target="_blank"
                  className="underline text-center text-white p-2 rounded-md bg-gray-500"
                >
                  Open File In New Tab
                </Link>
              </div>
            </div>
          )}
        </>
      )}
      {!isDemoAccount ? (
        <button
          type="submit"
          disabled={loading}
          className="bg-sky-600 hover:bg-sky-600 text-xl rounded-md w-full hover:cursor-pointer text-center text-white  md:px-2 px-1   py-2"
        >
          Update Profile
        </button>
      ) : (
        <div
          onClick={() => {
            toast.info("Demo Account Isn't Allowed To Update Profile");
          }}
          className="bg-sky-600 hover:bg-sky-600 text-xl rounded-md w-full hover:cursor-pointer text-center text-white  md:px-2 px-1   py-2"
        >
          Update Profile
        </div>
      )}
    </form>
  );
};

export default UpdateProfile;
