import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import JobsPagination from "../components/JobPagination";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigateTo= useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [city, setCity] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, jobCategory, jobType, searchKeyword));
  }, [dispatch, error, city, jobCategory, jobType]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, jobCategory, jobType, searchKeyword));
  };

  const cities = [
    "Butwal",
    "Kathmandu",
    "Pokhara",
    "Lalitpur",
    "Bhaktapur",
    "Hetauda",
    "Dharan",
    "Palpa",
  ];

  const jobCategoryArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "DevOps",
    "Mobile App Development",
    "UI/UX Design",
    "Game Development",
    "Machine Learning",
    "IT Project Management",
    "IT Consulting",
  ];
  const jobTypeArray = ["Full Time", "Part Time"];

  if (!isAuthenticated) {
    navigateTo("/login");
  }
  return (
    <>
      <div className="hero h-auto flex flex-col gap-8 py-5 px-2">
        <div className="text-4xl flex flex-col justify-center items-center gap-5">
          <h1 className="text-4xl text-center">
            Where Careers Meet Opportunities
          </h1>
          <p className="text-center text-gray-500 text-xl">
            "Connecting people with opportunities through{" "}
            <span className="text-sky-600 text-xl font-[500]">KaamSetu</span>,
            Nepal's own job portal"
          </p>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col w-full overflow-hidden rounded gap-1 md:gap-0 md:flex-row items-center justify-between md:w-[700px] shadow-sm">
            <input
              autoFocus
              type="text"
              value={searchKeyword}
              onChange={(e) =>
                setSearchKeyword(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                )
              }
              className="w-full p-1 pl-2 border-b-2 border-black items-center placeholder:text-gray-500"
              placeholder="Search by Job Title or Keywords"
            />
            <button
              className="bg-sky-600 gap-2 flex items-center justify-center md:rounded-l-none md:w-[150px] rounded w-full hover:cursor-pointer text-white px-2 py-1 "
              onClick={handleSearch}
            >
              <IoSearchOutline />
              Search
            </button>
          </div>
        </div>
        <div className="job-filters flex mb-5 justify-between items-center w-full h-full flex-col gap-4 xl:flex-row md:gap-5">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="xl:w-[300px] w-[90%] rounded  pl-2 shadow-sm border-2 border-black"
          >
            <option value="" disabled>
              Location
            </option>
            <option value="">All</option>
            {cities.map((city, index) => (
              <option value={city} key={index}>
                {city}
              </option>
            ))}
          </select>
          <select
            value={jobCategory}
            onChange={(e) => setJobCategory(e.target.value)}
            className="xl:w-[300px] w-[90%] rounded pl-2 shadow-sm border-2 border-black"
          >
            <option value="" disabled>
              Job Category
            </option>
            <option value="">All</option>
            {jobCategoryArray.map((jobCategory, index) => (
              <option value={jobCategory} key={index}>
                {jobCategory}
              </option>
            ))}
          </select>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="xl:w-[300px] w-[90%] rounded pl-2 shadow-sm border-2 border-black"
          >
            <option value="" disabled>
              Job Type
            </option>
            <option value="">All</option>
            {jobTypeArray.map((jobType, index) => (
              <option value={jobType} key={index}>
                {jobType}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setCity("");
              setJobCategory("");
              setJobType("");
              setSearchKeyword("");
            }}
            className="bg-red-500 rounded shadow-sm text-white md:w-[200px] w-[300px]"
          >
            Reset Filters
          </button>
        </div>
      </div>
      <div>
        {jobs && jobs.length > 0 ? (
          <JobsPagination jobs={jobs} />
        ) : (
          <div className="flex text-xl justify-center h-[200px] items-center text-center md:text-justify">
            <h1>
              No {jobType}{" "}
              {searchKeyword.length > 0 ? `"${searchKeyword}"` : ""} Job
              Available {""} {jobCategory ? `for ${jobCategory} ` : ""}
              {""}
              {city ? `in ${city}` : ""} Right Now.
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
