import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";

const PostApplication = () => {
  const navigateTo= useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );
  const { jobId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState("");

  const dispatch = useDispatch();
  const postedJob = singleJob;
  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  let jobPostedOn = "Unknown";
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setResume((user.resume && user.resume.url) || "");
    }
    if (error) {
      toast.info(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
    console.log(singleJob);
  }, [dispatch, error, message, jobId, user]);

  if (typeof postedJob.jobPostedOn === "string") {
    jobPostedOn = postedJob.jobPostedOn.substring(0, 10);
  }
  if(!isAuthenticated){
    navigateTo('/login');
  }
  return (
    <>
      <h1 className="flex flex-col gap-2 text-xl justify-center pl-2 mt-4">
        Job Id:
        <p className="text-gray-500">{jobId}</p>
      </h1>
      <div className="flex flex-col items-start sm:flex-row gap-4 mt-10 justify-center md:justify-between">
        <div className="md:sticky md:top-[150px] rounded-lg shadow-sm p-4 gap-4 bg-gray-50 hover:bg-gray-100 flex flex-col md:w-[30%] h-auto md:h-[300px] min-w-[275px] hover:cursor-pointer">
          <div>
            <div className="flex gap-5 items-center pb-5">
              {postedJob.companyLogo ? (
                <img
                  src={postedJob.companyLogo.url}
                  className="h-[50px] w-[50px] rounded-[20%]"
                />
              ) : (
               ""
              )}
              <div>
                <p className="font-[500]">{postedJob.title}</p>
                <p className="text-sm"> in <span className="text-sm text-gray-500">{postedJob.companyName}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineLocationOn />
              <p className="text-gray-500 text-sm">{postedJob.location}</p>
            </div>
            <div className="flex items-center gap-1">
              <TbCurrencyRupeeNepalese />
              <p className="text-gray-500 text-sm">{postedJob.salary} per year</p>
            </div>
            <div className="flex gap-1 items-center">
              Posted On:
              <p className="text-gray-500 text-sm">{jobPostedOn}</p>
            </div>
          </div>
          {!isAuthenticated && (
            <button
              className="rounded w-[100px] bg-gray-500 hover:scale-x-125 hover:cursor-pointer text-white px-2 py-1 "
              onClick={() => {
                toast.error("User is not authenticated.");
              }}
            >
              Apply
            </button>
          )}
          {isAuthenticated && user.role === "Employer" && (
            <button
              className=" rounded w-[100px] bg-gray-500 hover:scale-x-125 hover:cursor-pointer text-white px-2 py-1 "
              onClick={() => {
                toast.info("Employer cannot apply for jobs.");
              }}
            >
              Apply
            </button>
          )}
          <form>
            {isAuthenticated && user.role === "Job Seeker" && (
              <button
                className="rounded w-[100px] bg-sky-600 hover:scale-x-125 hover:cursor-pointer text-white px-2 py-1 "
                onClick={handlePostApplication}
                disabled={loading}
              >
                Apply
              </button>
            )}
          </form>
        </div>

        <div className="flex flex-col p-2 w-[95%] min-w-[300px] md:w-[60%] gap-4 md:px-8 md:pb-[100px]">
          <div className="flex flex-col gap-4">
            <label className="text-xl">Job Category</label>
            <p className="text-gray-500">{postedJob.jobCategory}</p>
            <label className="text-xl">Employer Id</label>
            <p className="text-gray-500">{postedJob.postedBy}</p>
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-xl flex gap-2 items-center">Job type</label>
            <p className="text-gray-500">{postedJob.jobType}</p>
          </div>

          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-4">
              <label className="text-xl">Company's Introduction</label>
              <p className="text-gray-500 text-justify">
                {postedJob.introduction}
              </p>
            </div>
            {postedJob.qualifications && (
              <div className="flex flex-col gap-4">
                <label className="text-xl">Qualifications</label>
                <p className="text-gray-500 text-justify">
                  {postedJob.qualifications}
                </p>
              </div>
            )}
            {postedJob.responsibilities && (
              <div className="flex flex-col gap-4">
                <label className="text-xl">Responsibilities</label>
                <p className="text-gray-500 text-justify">
                  {postedJob.responsibilities}
                </p>
              </div>
            )}
            {postedJob.offers && (
              <div className="flex flex-col gap-4">
                <label className="text-xl">Offering</label>
                <p className="text-gray-500 text-justify">{postedJob.offers}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostApplication;
