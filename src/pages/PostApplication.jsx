import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import JobCard from "../components/JobCard";
import { useParams } from "react-router-dom";

const PostApplication = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { singleJob } = useSelector((state) => state.jobs);
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const postedJob = singleJob;

  const { error, message } = useSelector((state) => state.applications);
  useEffect(() => {
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
  }, [dispatch, error, message, jobId]);

  return (
    <>
      <p className="text-xl my-5 ">
        Job Id<span>:</span>
        <span className="text-sm text-gray-500"> {postedJob._id}</span>
      </p>
      <JobCard
        element={postedJob}
        enableApplyApplication={true}
        expanded={true}
      />
    </>
  );
};

export default PostApplication;
