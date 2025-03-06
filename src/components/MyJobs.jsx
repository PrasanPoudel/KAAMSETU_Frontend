import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import Loader from "../components/Loader";
import JobCard from "./JobCard";

const MyJobs = () => {
  const dispatch = useDispatch();
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  );
  // Fetch jobs on component mount
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

  const [expandedJobId, setExpandedJobId] = useState(null);

  const toggleExpand = (jobId) => {
    window.scrollTo(0, 0); // Scroll to top
    setExpandedJobId((prevId) => (prevId === jobId ? null : jobId));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : myJobs?.length === 0 ? (
        <h1 className="text-xl text-center md:text-start">
          You have not posted any jobs yet.
        </h1>
      ) : (
        <div className="w-full">
          <p className="text-xl mb-5">
            <span className="text-3xl text-sky-600">{myJobs.length}</span> jobs{" "}
            {myJobs.length > 1 ? "are" : "is"} posted by you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 w-full">
            {myJobs.map((element) => (
              <JobCard
                key={element._id}
                element={element}
                enableDeleteJob={true}
                toggleExpand={toggleExpand}
                expandedJobId={expandedJobId}
                />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyJobs;
