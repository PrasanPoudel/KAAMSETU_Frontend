import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import JobCard from "./JobCard";
import SkeletonUiForJobs from "./SkeletonUiForJobs";
import { useNavigate } from "react-router-dom";

const FeaturedJobs = () => {
  const navigateTo = useNavigate();
  const { jobs } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobs());
  }, []);
  return (
    <div className="w-full pt-10">
      <h2 className="text-3xl text-center mb-10 font-medium">Featured Jobs</h2>
      {jobs.length < 1 ? (
        <SkeletonUiForJobs />
      ) : (
        <div className="w-full gap-2 px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobs.slice(0, 4).map((job, index) => (
            <JobCard
              element={job}
              key={index}
              onclick={() => {
                navigateTo(`/post/application/${job_id}`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedJobs;
