import React, { useState, useEffect } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { GoClock } from "react-icons/go";
import { FaChevronUp } from "react-icons/fa";
import { deleteJob } from "../store/slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { TfiWrite } from "react-icons/tfi";

const JobCard = ({
  element,
  enableDeleteJob,
  enableApplyApplication,
  toggleExpand,
  expandedJobId,
  expanded,
}) => {
  const dispatch = useDispatch();
  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );
  const jobId = element._id;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [resume, setResume] = useState((user.resume && user.resume.url) || "");
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

    if (error) {
      toast.info(error);
      dispatch(clearAllApplicationErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
  };

  return (
    <div
      className={` ${
        expanded || expandedJobId === element._id
          ? "px-2 py-5 shadow-[0px_0px_2.5px_rgba(0,0,0,0.35)] md:p-5 border grid col-start-1 row-start-1 row-end-2 sm:col-span-full xl:col-span-full"
          : ""
      } min-w-full rounded-md gap-5 max-w-md`}
      key={element._id}
    >
      <div
        onClick={() => toggleExpand(element._id)}
        className="max-w-[400px] hover:cursor-pointer border hover:shadow-[0px_0px_2.5px_rgba(0,0,0,0.35)] px-3 py-2 rounded-md h-full flex flex-col justify-between"
      >
        <div
          className={`grid ${
            element?.companyLogo ? "grid-cols-[1fr_2fr]" : "grid-cols-1"
          } items-start gap-4`}
        >
          <div className="flex items-start justify-center rounded-md">
            {element?.companyLogo ? (
              <img
                src={element.companyLogo.url}
                className="w-[60px] h-[60px] border-2 border-gray-100 mix-blend-multiply rounded-md"
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <h3 className="text-sky-600 text-sm font-semibold">
              {element.companyName}
            </h3>
            <h2 className="font-medium  md:text-xl">{element.title}</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-5 gap-2 items-center justify-between">
          <div className="flex items-center gap-1 bg-sky-100 text-sky-600 text-sm p-1 rounded-md">
            <GoClock />
            {element.jobType}
          </div>
          <div className="flex items-center gap-1 bg-sky-100 text-sky-600 text-sm p-1 rounded-md">
            <MdOutlineLocationOn />
            {element.location}
          </div>
          <div className="flex items-center gap-1 bg-sky-100 text-sky-600 text-sm p-1 rounded-md">
            <TbCurrencyRupeeNepalese />
            {element.salary.charAt(0) + "." + element.salary.slice(1, 2)} L /
            Year
          </div>
          <div className="flex gap-1 items-center text-sm p-1 rounded-md">
            <TfiWrite />
            {element.jobPostedOn.slice(0, 10)}
          </div>
        </div>
      </div>

      {(expanded || expandedJobId === element._id) && (
        <div className="flex flex-col gap-5 pl-2">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium text-sky-600">
              Job Category
            </label>
            <p className="  text-gray-500">{element.jobCategory}</p>
            <label className="text-xl font-medium text-sky-600">
              Employer Id
            </label>
            <p className="  text-gray-500">{element.postedBy}</p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xl font-medium text-sky-600">
                Company's Introduction
              </label>
              <p className="text-gray-500 text-justify">
                {element.introduction}
              </p>
            </div>
            {element.qualifications && (
              <div className="flex flex-col gap-2">
                <label className="text-xl font-medium text-sky-600">
                  Qualifications
                </label>
                <ul className="list-disc pl-5 text-gray-500">
                  {element.qualifications
                    .split(".") // Split the string into an array
                    .map((qualification) => qualification.trim()) // Remove extra spaces
                    .filter((qualification) => qualification.length > 0) // Remove empty items
                    .map((qualification, index) => (
                      <li key={index} className="text-justify">
                        {qualification}
                      </li> // Display as a list item
                    ))}
                </ul>
              </div>
            )}
            {element.responsibilities && (
              <div className="flex flex-col gap-2">
                <label className="text-xl font-medium text-sky-600">
                  Responsibilities
                </label>
                <ul className="list-disc pl-5 text-gray-500">
                  {element.responsibilities
                    .split(".") // Split the string into an array
                    .map((responsibility) => responsibility.trim()) // Remove extra spaces
                    .filter((responsibility) => responsibility.length > 0) // Remove empty items
                    .map((responsibility, index) => (
                      <li key={index} className="text-justify">
                        {responsibility}
                      </li> // Display as a list item
                    ))}
                </ul>
              </div>
            )}
            {element.offers && (
              <div className="flex flex-col gap-2">
                <label className="text-xl font-medium text-sky-600">
                  Offering
                </label>
                <ul className="list-disc pl-5 text-gray-500">
                  {element.offers
                    .split(".") // Split the string into an array
                    .map((offer) => offer.trim()) // Remove extra spaces
                    .filter((offer) => offer.length > 0) // Remove empty items
                    .map((offer, index) => (
                      <li key={index} className="text-justify">
                        {offer}
                      </li> // Display as a list item
                    ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-5 flex flex-col md:flex-row justify-end gap-2">
            {enableDeleteJob && (
              <button
                className="bg-red-500 hover:bg-red-600 text-xl flex justify-center items-center text-white  md:px-2 px-1   py-2  rounded-md transition-all duration-300"
                onClick={() => handleDeleteJob(element._id)}
              >
                Delete Job
              </button>
            )}
            {enableApplyApplication && (
              <>
                {!isAuthenticated && (
                  <button
                    className="rounded-md text-xl bg-gray-500 hover:cursor-pointer text-white md:px-2 px-1 py-2"
                    onClick={() => {
                      toast.error(
                        "User is not authenticated. Please login or signup and try again."
                      );
                    }}
                  >
                    Apply
                  </button>
                )}
                {isAuthenticated && user.role === "Employer" && (
                  <button
                    className=" rounded-md text-xl bg-gray-500 hover:cursor-pointer text-white md:px-2 px-1 py-2 "
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
                      className="rounded-md text-xl bg-sky-600 hover:bg-sky-700 hover:cursor-pointer text-white md:px-2 px-1 py-2 "
                      onClick={handlePostApplication}
                      disabled={loading}
                    >
                      Apply
                    </button>
                  )}
                </form>
              </>
            )}
            {!expanded && (
              <>
                <button
                  className="flex text-xl items-center border-2 border-black rounded-md gap-2 justify-center transition-all duration-300 md:px-2 px-1 py-2"
                  onClick={() => toggleExpand(element._id)}
                  aria-label={
                    expandedJobId === element._id ? "Hide Details" : ""
                  }
                >
                  {expandedJobId === element._id ? "Hide Details" : ""}
                  {expandedJobId === element._id ? <FaChevronUp /> : ""}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
