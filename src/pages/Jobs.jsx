import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import JobsPagination from "../components/JobPagination";
import { IoSearchOutline } from "react-icons/io5";
import { IoLocationOutline, IoBriefcaseOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { IoFilterOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import jobCategoryArray from "../data/jobCategoryArray";
import cities from "../data/cities";

const Jobs = () => {
   useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      }, []);
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showFilters]);
  const [filteredSuggestionsForLocation, setFilteredSuggestionsForLocation] =
  useState([]);
  const [
    filteredSuggestionsForJobCategory,
    setFilteredSuggestionsForJobCategory,
  ] = useState([]);
  const [city, setCity] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [clearFilters, setClearFilters] = useState(false);
  const { jobs, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  // Debounce API Call when typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (error) {
        toast.error(error);
        dispatch(clearAllJobErrors());
      }
      dispatch(fetchJobs(city, jobCategory, jobType, searchKeyword));
      console.log("From Debounce Api Calling Technique");
    }, 500); // 1000ms delay before calling API

    return () => clearTimeout(timer); // Clear timeout if user types again
  }, [
    error,
    city,
    jobCategory,
    jobType,
    clearFilters,
    searchKeyword,
  ]);

  const handlecityChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setCity(input);

    if (input.length > 0) {
      const filtered = cities.filter(
        (city) => city.toLowerCase().startsWith(input.toLowerCase()) // Ensure it starts with input
      );
      setFilteredSuggestionsForLocation(filtered);
    } else {
      setFilteredSuggestionsForLocation([]); // Hide suggestions when input is empty
    }
  };
  const handleJobCategoryChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setJobCategory(input);

    if (input.length > 0) {
      const filtered = jobCategoryArray.filter(
        (jobCategory) =>
          jobCategory.toLowerCase().startsWith(input.toLowerCase()) // Ensure it starts with input
      );
      setFilteredSuggestionsForJobCategory(filtered);
    } else {
      setFilteredSuggestionsForJobCategory([]); // Hide suggestions when input is empty
    }
  };
  const handleAddressBlur = () => {
    setTimeout(() => setFilteredSuggestionsForLocation([]), 200);
  };
  const handleJobCategoryBlur = () => {
    setTimeout(() => setFilteredSuggestionsForJobCategory([]), 200);
  };
  return (
    <>
      <div className="flex w-full justify-end">
        <IoSearchOutline
          className="text-3xl animated-box lg:hidden"
          onClick={() => setShowFilters(!showFilters)}
        />
      </div>
      {/* Mobile Responsive Filters */}
      <div
        className={`${
          showFilters
            ? "bg-img flex flex-col gap-2 bg-white fixed top-0 pt-5 px-1 left-0 w-full min-h-[100vh] z-50"
            : "hidden"
        }`}
      >
        <div className="flex w-full justify-end">
          <IoClose
            className="text-4xl"
            onClick={() => setShowFilters(!showFilters)}
          />
        </div>
        <div className="flex justify-between items-center" >
          <div className="flex items-center gap-1 text-sm">
            <IoFilterOutline className="text-4xl" /> Apply Filters
          </div>
          <button
            onClick={() => {
              setClearFilters(!clearFilters);
              console.log(clearFilters);
              setCity("");
              setJobCategory("");
              setJobType("");
              setSearchKeyword("");
            }}
            className="flex items-center gap-1 p-2 text-black bg-white hover:text-white hover:border-white hover:bg-black border-2 border-black rounded-md"
          >
            Clear Filters
          </button>
        </div>
        <hr className="min-h-[1px] w-full bg-black" />
        <div className="flex border-2 bg-white border-black px-2 w-full items-center rounded-md">
          <IoSearchOutline className="text-xl w-[30px] text-black" />
          <input
            type="search"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              );
            }}
            className="w-full pl-2 bg-transparent"
            placeholder="Search for Jobs"
          />
        </div>
        <div className="flex border-2 bg-white border-black pl-2 w-full items-center rounded-md">
          <IoLocationOutline className="text-xl w-[30px] text-black" />
          <div className="relative w-full">
            <input
              placeholder="e.g. Kathmandu"
              onBlur={handleAddressBlur}
              type="text"
              value={city}
              onChange={handlecityChange}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "Tab") {
                  e.preventDefault();
                  if (filteredSuggestionsForLocation.length > 0) {
                    setCity(filteredSuggestionsForLocation[0]);
                    setFilteredSuggestionsForLocation([]);
                  }
                }
              }}
              className="w-full pl-2 bg-transparent  text-black placeholder:text-gray-500"
            />
            {filteredSuggestionsForLocation.length > 0 && city.length > 0 && (
              <span className="absolute left-2 top-[13px]">
                {city}
                <span className="text-gray-500">
                  {filteredSuggestionsForLocation[0].slice(city.length)}
                </span>
              </span>
            )}
          </div>
        </div>
        <div className="flex border-2 bg-white border-black pl-2 w-full items-center rounded-md">
          <IoBriefcaseOutline className="text-xl w-[30px] text-black" />
          <div className="relative w-full">
            <input
              placeholder="e.g. Engineer"
              onBlur={handleJobCategoryBlur}
              type="text"
              value={jobCategory}
              onChange={handleJobCategoryChange}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "Tab") {
                  e.preventDefault();
                  if (filteredSuggestionsForJobCategory.length > 0) {
                    setJobCategory(filteredSuggestionsForJobCategory[0]);
                    setFilteredSuggestionsForJobCategory([]);
                  }
                }
              }}
              className="w-full pl-2 bg-transparent  text-black placeholder:text-gray-500"
            />
            {filteredSuggestionsForJobCategory.length > 0 &&
              jobCategoryArray.length > 0 && (
                <span className="absolute left-2 top-[13px]">
                  {jobCategory}
                  <span className="text-gray-500">
                    {filteredSuggestionsForJobCategory[0].slice(
                      jobCategory.length
                    )}
                  </span>
                </span>
              )}
          </div>
        </div>
        <div className="relative flex rounded-md bg-white border-2 border-black justify-between items-center">
          <GoClock className="absolute left-2 text-black w-[30px] text-xl" />
            <select onChange={(e)=>setJobType(e.target.value)} value={jobType} className="pl-10 w-full bg-transparent pr-4">
            <option value="" disabled>Job Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            </select>
          </div>
      </div>
      {/* End */}
      <div
        className={`${
          showFilters
            ? "hidden"
            : "flex flex-col gap-5"
        }`}
      >
        <fieldset className="job-filters bg-img hidden lg:grid  lg:grid-cols-2 gap-2 border-2 border-black p-10 rounded-md">
          <legend className="text-sm flex items-center gap-2"><IoFilterOutline className="text-4xl"/> Apply Filters</legend>
          <div className="flex border-2 bg-white border-black pl-2 w-full items-center rounded-md">
            <IoSearchOutline className="text-xl w-[30px] text-black" />
            <input
              type="search"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                );
              }}
              className="w-full pl-2 bg-transparent p-2"
              placeholder="Search for Jobs"
            />
          </div>
          <div className="flex border-2 bg-white border-black pl-2 w-full items-center rounded-md">
            <IoLocationOutline className="text-xl w-[30px] text-black" />
            <div className="relative w-full">
              <input
                placeholder="e.g. Kathmandu"
                onBlur={handleAddressBlur}
                type="text"
                value={city}
                onChange={handlecityChange}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "Tab") {
                    e.preventDefault();
                    if (filteredSuggestionsForLocation.length > 0) {
                      setCity(filteredSuggestionsForLocation[0]);
                      setFilteredSuggestionsForLocation([]);
                    }
                  }
                }}
                className="w-full pl-2 bg-transparent text-black placeholder:text-gray-500"
              />
              {filteredSuggestionsForLocation.length > 0 && city.length > 0 && (
                <span className="absolute left-2 top-[13px]">
                  {city}
                  <span className="text-gray-500">
                    {filteredSuggestionsForLocation[0].slice(city.length)}
                  </span>
                </span>
              )}
            </div>
          </div>
          <div className="flex border-2 bg-white border-black pl-2 w-full items-center rounded-md">
            <IoBriefcaseOutline className="text-xl w-[30px] text-black" />
            <div className="relative w-full">
              <input
                placeholder="e.g. Engineer"
                onBlur={handleJobCategoryBlur}
                type="text"
                value={jobCategory}
                onChange={handleJobCategoryChange}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "Tab") {
                    e.preventDefault();
                    if (filteredSuggestionsForJobCategory.length > 0) {
                      setJobCategory(filteredSuggestionsForJobCategory[0]);
                      setFilteredSuggestionsForJobCategory([]);
                    }
                  }
                }}
                className="w-full pl-2 bg-transparent  text-black placeholder:text-gray-500"
              />
              {filteredSuggestionsForJobCategory.length > 0 &&
                jobCategoryArray.length > 0 && (
                  <span className="absolute left-2 top-[13px]">
                    {jobCategory}
                    <span className="text-gray-500">
                      {filteredSuggestionsForJobCategory[0].slice(
                        jobCategory.length
                      )}
                    </span>
                  </span>
                )}
            </div>
          </div>
          <div className="relative flex rounded-md bg-white border-2 border-black justify-between items-center">
          <GoClock className="absolute left-2 text-black w-[30px] text-xl" />
            <select onChange={(e)=>setJobType(e.target.value)} value={jobType} className="pl-10 w-full bg-transparent pr-4">
            <option value="" disabled>Job Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            </select>
          </div>
        </fieldset>
        <div>
          {jobs && jobs.length > 0 ? (
            <>
              <p className="text-xl">
                <span className="text-3xl text-sky-600"> {jobs.length} </span>
                {jobType}{" "}
                {searchKeyword.length > 0 ? `"${searchKeyword}"` : ""} {jobs.length > 1 ? "Jobs " : "Job "} 
                Found {""} {jobCategory ? `For ${jobCategory} ` : ""}
                {""}
                {city ? `In ${city}` : ""} Right Now
              </p>
              <JobsPagination jobs={jobs} />
            </>
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
      </div>
    </>
  );
};

export default Jobs;
