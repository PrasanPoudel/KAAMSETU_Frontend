import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "../store/slices/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../store/slices/userSlice";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
  const [firstChoice, setFirstChoice] = useState(
    user && user.jobChoices?.firstChoice
  );
  const [secondChoice, setSecondChoice] = useState(
    user && user.jobChoices?.secondChoice
  );
  const [thirdChoice, setThirdChoice] = useState(
    user && user.jobChoices?.thirdChoice
  );
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user && user.resume?.url);

  const handleUpdateProfile = () => {
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
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated, user]);

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const jobChoicesArray = [
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

  return (
    <div className="flex flex-col md:w-[80%] w-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xl">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-black pl-2 "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-black pl-2 "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Phone Number</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border-2 border-black pl-2 "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border-2 border-black pl-2 "
          />
        </div>

        {user && user.role === "Job Seeker" && (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-xl">My Job Choices</label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <select
                  value={firstChoice}
                  onChange={(e) => setFirstChoice(e.target.value)}
                  className="w-full border-2 border-black pl-2 "
                >
                  {jobChoicesArray.map((element, index) => {
                    return (
                      <option value={element} key={index}>
                        {element}
                      </option>
                    );
                  })}
                </select>
                <select
                  value={secondChoice}
                  onChange={(e) => setSecondChoice(e.target.value)}
                  className="w-full border-2 border-black pl-2 "
                >
                  {jobChoicesArray.map((element, index) => {
                    return (
                      <option value={element} key={index}>
                        {element}
                      </option>
                    );
                  })}
                </select>
                <select
                  value={thirdChoice}
                  onChange={(e) => setThirdChoice(e.target.value)}
                  className="w-full border-2 border-black pl-2 "
                >
                  {jobChoicesArray.map((element, index) => {
                    return (
                      <option value={element} key={index}>
                        {element}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {user && user.resume && user.role === "Job Seeker" && (
              <div className="flex flex-col gap-2">
                <label className="text-xl">Current Resume</label>
                <Link
                  to={user.resume && user.resume.url}
                  target="_blank"
                  className="bg-sky-600 hover:cursor-pointer text-center text-white px-2 py-1  w-full"
                >
                  View Resume
                </Link>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="text-xl">Change Resume</label>
              <input type="file" onChange={resumeHandler} />
            </div>
          </>
        )}
        <div>
          <button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="bg-sky-600 rounded w-full hover:cursor-pointer text-center text-white py-2 "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
