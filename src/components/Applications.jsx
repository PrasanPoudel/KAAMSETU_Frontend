import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Applications = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 className="text-xl text-center md:text-start">
          You have not received any application from job seekers
        </h1>
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {applications.map((element) => {
              return (
                <div
                  className="flex flex-col gap-4 rounded-lg bg-gray-50 p-2 w-full md:w-[500px] "
                  key={element._id}
                >
                  <div>
                    <label className="text-xl">Job Title: </label>
                    <p className="text-gray-500">{element.jobInfo.jobTitle}</p>
                  </div>
                  <div>
                    <label className="text-xl">Applicant's Name: </label>
                    <p className="text-gray-500">
                      {element.jobSeekerInfo.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xl">Applicant's Email:</label>
                    <p className="text-gray-500">
                      {element.jobSeekerInfo.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-xl">Applicant's Phone: </label>
                    <p className="text-gray-500">
                      {element.jobSeekerInfo.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-xl">Applicant's Address: </label>
                    <p className="text-gray-500">
                      {element.jobSeekerInfo.address}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link
                      to={
                        element.jobSeekerInfo &&
                        element.jobSeekerInfo.resume.url
                      }
                      className=" bg-sky-600 rounded hover:cursor-pointer text-white px-2 py-1  "
                      target="_blank"
                    >
                      View Resume
                    </Link>
                    <button
                      className="bg-red-500 rounded text-white px-2 py-1 hover:cursor-pointer  "
                      onClick={() => handleDeleteApplication(element._id)}
                    >
                      Delete Application
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Applications;
