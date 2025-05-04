import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "../../store/slices/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../../store/slices/userSlice";
import { Link } from "react-router-dom";
import jobCategoryArray from "../../data/jobCategoryArray";
import cities from "../../data/cities";
import ImageUploader from "../ImageUploader";
import FileUploader from "../FileUploader";
import ResumeViewer from "../ResumeViewer";
import AutoSuggestion from "../AutoSuggestion";
import { HiOutlineUser } from "react-icons/hi";
import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
} from "react-icons/md";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

const UpdateProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
      window.scrollTo(0, 0);
      dispatch(getUser());
    }
  }, [dispatch, loading, error, isUpdated, user]);
  const profilePictureHandler = (file) => {
    setProfilePicture(file);
  };
  const resumeHandler = (file) => {
    setResume(file);
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

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Your Profile
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Manage your profile information and preferences
        </p>

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="flex flex-col items-center mb-8">
            <label className="block text-gray-700 mb-3 font-medium text-sm">
              Profile Picture
            </label>
            <div className="w-32 h-32 mx-auto">
              <ImageUploader
                onImageUpload={profilePictureHandler}
                profilePicturePreview={profilePicture}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Click on the image to update your profile picture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Full Name
              </label>
              <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-full focus:outline-none text-base"
                  placeholder="Enter your full name"
                  required
                />
                <HiOutlineUser className="text-lg text-gray-500" />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Email Address
              </label>
              <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full focus:outline-none text-base"
                  placeholder="Enter your email"
                  required
                />
                <MdOutlineEmail className="text-lg text-gray-500" />
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
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-full focus:outline-none text-base"
                  placeholder="Enter your phone number"
                  required
                />
                <MdOutlinePhone className="text-lg text-gray-500" />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Address (City)
              </label>
              <AutoSuggestion
                value={address || ""}
                onChange={handleAddressChange}
                onSelect={(suggestion) => setAddress(suggestion)}
                suggestions={cities}
                placeholder="Enter your city"
                icon={<MdOutlineLocationOn className="text-lg text-gray-500" />}
                required
              />
            </div>
          </div>

          {user && user.role === "Job Seeker" && (
            <>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Job Preferences
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select up to three job categories that interest you the most
                </p>

                <div className="space-y-4">
                  <AutoSuggestion
                    value={firstChoice || ""}
                    onChange={handleFirstChoiceChange}
                    onSelect={(suggestion) => setFirstChoice(suggestion)}
                    suggestions={jobCategoryArray}
                    placeholder="First job preference"
                    icon={
                      <span className="text-sm font-medium text-sky-600">
                        1st
                      </span>
                    }
                    label="First Choice"
                  />

                  <AutoSuggestion
                    value={secondChoice || ""}
                    onChange={handleSecondChoiceChange}
                    onSelect={(suggestion) => setSecondChoice(suggestion)}
                    suggestions={jobCategoryArray}
                    placeholder="Second job preference"
                    icon={
                      <span className="text-sm font-medium text-sky-600">
                        2nd
                      </span>
                    }
                    label="Second Choice"
                  />

                  <AutoSuggestion
                    value={thirdChoice || ""}
                    onChange={handleThirdChoiceChange}
                    onSelect={(suggestion) => setThirdChoice(suggestion)}
                    suggestions={jobCategoryArray}
                    placeholder="Third job preference"
                    icon={
                      <span className="text-sm font-medium text-sky-600">
                        3rd
                      </span>
                    }
                    label="Third Choice"
                  />
                </div>
              </div>

              {user && user.resume && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Resume
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="block text-gray-700 mb-2 font-medium text-sm">
                        Update Resume
                      </label>
                      <FileUploader onFileUpload={resumeHandler} />
                      <p className="text-xs text-gray-500 mt-2">
                        Upload a new PDF file to update your resume
                      </p>
                    </div>

                    <div className="form-group">
                      <label className="block text-gray-700 mb-2 font-medium text-sm">
                        Current Resume
                      </label>
                      <div className="mb-3">
                        <ResumeViewer resume={resume} />
                      </div>
                      <Link
                        to={resume}
                        target="_blank"
                        className="inline-block bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                      >
                        View Resume
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="pt-6 mt-8">
            <button
              type="submit"
              disabled={loading || isDemoAccount}
              className={`flex items-center justify-center gap-2 cursor-pointer text-base rounded-lg font-medium w-full py-3 transition-colors ${
                isDemoAccount
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-700 text-white"
              }`}
            >
              <BsFillBookmarkCheckFill className="text-lg" />
              {isDemoAccount ? "Demo Account (Cannot Update)" : "Save Changes"}
            </button>
            {isDemoAccount && (
              <p className="text-xs text-center text-red-500 mt-2">
                Demo accounts cannot be updated
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
