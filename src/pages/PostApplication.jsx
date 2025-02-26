import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { FaArrowLeft } from "react-icons/fa";
import JobCard from "../components/JobCard";


const PostApplication = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  const navigateTo= useNavigate();
  const { singleJob } = useSelector((state) => state.jobs);
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const postedJob = singleJob;

  const { error, message } = useSelector(
    (state) => state.applications
  );
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
    <FaArrowLeft className="text-4xl mb-5 cursor-pointer rounded-md" onClick={()=>{
      navigateTo('/dashboard/My Applications')
    }}/>
     <JobCard element={postedJob} enableApplyApplication={true} expanded={true} />
    </>
  );
};

export default PostApplication;
