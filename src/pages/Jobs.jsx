import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import JobsPagination from "../components/JobPagination";
import { IoLocationOutline, IoBriefcaseOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
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

  const { jobs, error } = useSelector((state) => state.jobs);
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
  const dispatch = useDispatch();

  useEffect(() => {
    const debouncer = setTimeout(() => {
      if (error) {
        toast.error(error);
        dispatch(clearAllJobErrors());
      }
      dispatch(fetchJobs(city, jobCategory, jobType, searchKeyword));
    }, 500);
    return () => clearTimeout(debouncer);
  }, [error, city, jobCategory, jobType, searchKeyword]);

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

  // Determine if suggestion is active for styling
  const isLocationSuggestionActive =
    filteredSuggestionsForLocation.length > 0 && city.length > 0;
  const isJobCategorySuggestionActive =
    filteredSuggestionsForJobCategory.length > 0 && jobCategory.length > 0;

  return (
    <>
      {/* Mobile Search Bar */}
      <div className="w-full px-4 py-3 lg:hidden">
        <div className="flex items-center bg-white rounded-lg border border-gray-300 shadow-sm px-2">
          <IoIosSearch className="text-gray-500 text-xl" />
          <input
            type="search"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              );
            }}
            className="w-full h-10 pl-2 bg-transparent focus:outline-none text-sm"
            placeholder="Search for Job Title"
          />
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="ml-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            aria-label="Open filters"
          >
            <IoFilterOutline className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Filters */}
      <div
        className={`fixed inset-0 z-50 bg-white p-5 transition-transform duration-300 ease-in-out lg:hidden ${
          showFilters ? "translate-x-0" : "translate-x-full"
        }`} // Use translate for smooth transition
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            type="button"
            onClick={() => setShowFilters(false)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            aria-label="Close filters"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {" "}
          {/* Increased gap */}
          {/* Location Input (Mobile) */}
          <div className="relative flex items-center border border-gray-300 bg-white rounded-md px-3 h-10">
            <IoLocationOutline className="text-gray-500 mr-2 flex-shrink-0" />
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
              className={`w-full bg-transparent focus:outline-none text-sm ${
                isLocationSuggestionActive
                  ? "text-transparent caret-black"
                  : "text-black"
              }`}
            />
            {isLocationSuggestionActive && (
              <span className="absolute left-[calc(0.75rem+16px+0.5rem)] top-1/2 -translate-y-1/2 pointer-events-none text-sm">
                {city}
                <span className="text-gray-400">
                  {filteredSuggestionsForLocation[0].slice(city.length)}
                </span>
              </span>
            )}
          </div>
          {/* Job Category Input (Mobile) */}
          <div className="relative flex items-center border border-gray-300 bg-white rounded-md px-3 h-10">
            <IoBriefcaseOutline className="text-gray-500 mr-2 flex-shrink-0" />
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
              className={`w-full bg-transparent focus:outline-none text-sm ${
                isJobCategorySuggestionActive
                  ? "text-transparent caret-black"
                  : "text-black"
              }`}
            />
            {isJobCategorySuggestionActive && (
              <span className="absolute left-[calc(0.75rem+16px+0.5rem)] top-1/2 -translate-y-1/2 pointer-events-none text-sm">
                {jobCategory}
                <span className="text-gray-400">
                  {filteredSuggestionsForJobCategory[0].slice(
                    jobCategory.length
                  )}
                </span>
              </span>
            )}
          </div>
          {/* Job Type Select (Mobile) */}
          <div className="relative flex items-center border border-gray-300 bg-white rounded-md px-3 h-10">
            <GoClock className="text-gray-500 mr-2" />
            <select
              onChange={(e) => setJobType(e.target.value)}
              value={jobType}
              className="w-full bg-transparent focus:outline-none text-sm appearance-none pr-8" // Added appearance-none and padding right
            >
              <option value="" disabled={jobType !== ""}>
                Job Type
              </option>{" "}
              {/* Make placeholder selectable if value is empty */}
              <option value="">Any</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(false)}
            className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 mt-4"
          >
            Apply Filters
          </button>
        </div>
      </div>
      {/* End Mobile Filters */}

      {/* Container for Desktop Filters and Job Listings */}
      <div
        className={`${
          showFilters ? "hidden" : "flex flex-col gap-5"
        } px-4 md:px-6 lg:px-8`}
      >
        {" "}
        {/* Added padding */}
        {/* Desktop Filters */}
        <div className="job-filters hidden lg:block bg-gray-50 p-4 rounded-lg shadow-sm mt-5">
          {" "}
          {/* Added bg, padding, rounded, shadow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {" "}
            {/* Adjusted grid cols and gap */}
            {/* Search Input (Desktop) */}
            <div className="flex items-center border border-gray-300 bg-white rounded-md px-3 h-10">
              {" "}
              {/* Standardized style */}
              <IoIosSearch className="text-gray-500 mr-2" />{" "}
              {/* Icon styling */}
              <input
                type="search"
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                  );
                }}
                className="w-full bg-transparent focus:outline-none text-sm" // Standardized style
                placeholder="Search for Job Title"
              />
            </div>
            {/* Location Input (Desktop) */}
            <div className="relative flex items-center border border-gray-300 bg-white rounded-md px-3 h-10">
              {" "}
              {/* Standardized style */}
              <IoLocationOutline className="text-gray-500 mr-2 flex-shrink-0" />
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
                className={`w-full bg-transparent focus:outline-none text-sm ${
                  isLocationSuggestionActive
                    ? "text-transparent caret-black"
                    : "text-black"
                }`}
              />
              {isLocationSuggestionActive && (
                <span className="absolute left-[calc(0.75rem+16px+0.5rem)] top-1/2 -translate-y-1/2 pointer-events-none text-sm">
                  {city}
                  <span className="text-gray-400">
                    {filteredSuggestionsForLocation[0].slice(city.length)}
                  </span>
                </span>
              )}
            </div>
            {/* Job Category Input (Desktop) */}
            <div className="relative flex items-center border border-gray-300 bg-white rounded-md px-3 h-10">
              {" "}
              {/* Standardized style */}
              <IoBriefcaseOutline className="text-gray-500 mr-2 flex-shrink-0" />
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
                className={`w-full bg-transparent focus:outline-none text-sm ${
                  isJobCategorySuggestionActive
                    ? "text-transparent caret-black"
                    : "text-black"
                }`}
              />
              {isJobCategorySuggestionActive && (
                <span className="absolute left-[calc(0.75rem+16px+0.5rem)] top-1/2 -translate-y-1/2 pointer-events-none text-sm">
                  {jobCategory}
                  <span className="text-gray-400">
                    {filteredSuggestionsForJobCategory[0].slice(
                      jobCategory.length
                    )}
                  </span>
                </span>
              )}
            </div>
            {/* Job Type Select (Desktop) */}
            <div className="relative flex items-center border border-gray-300 bg-white rounded-md px-3 h-10">
              {" "}
              {/* Standardized style */}
              <GoClock className="text-gray-500 mr-2" />
              <select
                onChange={(e) => setJobType(e.target.value)}
                value={jobType}
                className="w-full bg-transparent focus:outline-none text-sm appearance-none pr-8" // Added appearance-none and padding right
              >
                <option value="" disabled={jobType !== ""}>
                  Job Type
                </option>{" "}
                {/* Make placeholder selectable if value is empty */}
                <option value="">Any</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
              </select>
              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Job Listings Pagination */}
        <JobsPagination
          jobs={jobs}
          searchKeyword={searchKeyword}
          jobType={jobType}
          jobCategory={jobCategory}
          city={city}
        />
      </div>
    </>
  );
};
export default Jobs;
