import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import Spinner from "../components/Spinner";

const MyApplications = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, []);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
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
          You have not applied for any job yet
        </h1>
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {applications.map((element) => {
              return (
                <div
                  className="flex flex-col rounded-lg bg-gray-50 gap-2  p-2 md:w-[500px] "
                  key={element._id}
                >
                  <div>
                    <label className="text-xl">Job Title:</label>
                    <p className="text-gray-500">{element.jobInfo.jobTitle}</p>
                  </div>
                  <div>
                    <label className="text-xl">Job Id:</label>
                    <p className="text-gray-500">{element.jobInfo.jobId}</p>
                  </div>
                  <Link
                    to={`/post/application/${element.jobInfo.jobId}`}
                    className="underline text-sm text-sky-600 hover:"
                  >
                    More details
                  </Link>
                  <div className="flex text-[20px] justify-end gap-4">
                    <Link
                      to={
                        element.jobSeekerInfo &&
                        element.jobSeekerInfo.resume.url
                      }
                      className=" text-sm rounded bg-sky-600 hover:cursor-pointer text-white px-2 py-1  "
                      target="_blank"
                    >
                      View Resume
                    </Link>
                    <button
                      className="bg-red-500 rounded text-sm text-white px-2 py-1   hover:cursor-pointer"
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

export default MyApplications;
