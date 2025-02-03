import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";

const MyJobs = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs.length <= 0 ? (
        <h1 className="text-xl text-center md:text-start">
          You have not posted any job yet
        </h1>
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {myJobs.map((element) => (
              <div
                className="flex flex-col rounded-lg gap-4 bg-gray-50 p-2 md:w-[500px] "
                key={element._id}
              >
                <div>
                  <label className="text-xl">Job Title: </label>
                  <p className="text-gray-500">{element.title}</p>
                </div>
                <div>
                  <label className="text-xl">Job jobCategory:</label>
                  <p className="text-gray-500">{element.jobCategory}</p>
                </div>
                <div>
                  <label className="text-xl">Salary: </label>
                  <p className="text-gray-500">{element.salary}</p>
                </div>
                <div>
                  <label className="text-xl">Location:</label>
                  <p className="text-gray-500">{element.location}</p>
                </div>
                <div>
                  <label className="text-xl">Job Type:</label>
                  <p className="text-gray-500">{element.jobType}</p>
                </div>
                <div>
                  <label className="text-xl">Company Name:</label>
                  <p className="text-gray-500">{element.companyName}</p>
                </div>
                <div>
                  <label className="text-xl">Introduction:</label>
                  <p className="text-gray-500 text-justify">
                    {element.introduction}
                  </p>
                </div>
                <div>
                  <label className="text-xl">Qualifications:</label>
                  <p className="text-gray-500 text-justify">
                    {element.qualifications}
                  </p>
                </div>
                <div>
                  <label className="text-xl">Responsibilities:</label>
                  <p className="text-gray-500 text-justify">
                    {element.responsibilities}
                  </p>
                </div>
                {element.offers && (
                  <div>
                    <label className="text-xl">What Are We Offering:</label>
                    <p className="text-gray-500 text-justify">
                      {element.offers}
                    </p>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 rounded text-white px-2 py-1  "
                    onClick={() => handleDeleteJob(element._id)}
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MyJobs;
