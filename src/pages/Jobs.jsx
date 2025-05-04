import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import JobsPagination from "../components/JobPagination";
import {
  IoLocationOutline,
  IoBriefcaseOutline,
  IoClose,
  IoFilterOutline,
} from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineRefresh } from "react-icons/hi";
import jobCategoryArray from "../data/jobCategoryArray";
import cities from "../data/cities";
import AutoSuggestion from "../components/AutoSuggestion";

const Jobs = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const [showFilters, setShowFilters] = useState(false);
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const [city, setCity] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch();

  // Lock body scroll when mobile filters are shown
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showFilters]);

  // Fetch jobs with debouncing
  useEffect(() => {
    const debouncer = setTimeout(() => {
      if (error) {
        toast.error(error);
        dispatch(clearAllJobErrors());
      }
      dispatch(fetchJobs(city, jobCategory, jobType, searchKeyword));
    }, 500);
    return () => clearTimeout(debouncer);
  }, [dispatch, error, city, jobCategory, jobType, searchKeyword]);

  const handleCityChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setCity(input);
  };

  const handleJobCategoryChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setJobCategory(input);
  };

  const clearFilters = () => {
    setCity("");
    setJobCategory("");
    setJobType("");
    setSearchKeyword("");
  };

  const hasActiveFilters = city || jobCategory || jobType || searchKeyword;
  const activeFilterCount = [city, jobCategory, jobType, searchKeyword].filter(
    Boolean
  ).length;

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto p-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Find Your Perfect Job
          </h1>
          <p className="text-gray-600 mt-2">
            Search and filter through available positions
          </p>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center bg-white rounded-lg border border-gray-300 shadow-sm px-3 py-1">
            <IoIosSearch className="text-gray-500 text-xl" />
            <input
              type="search"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                );
              }}
              className="w-full h-10 pl-2 bg-transparent focus:outline-none text-sm"
              placeholder="Search for Job Title"
            />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword("")}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <IoClose className="text-xl" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowFilters(true)}
              className="ml-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 relative"
              aria-label="Open filters"
            >
              <IoFilterOutline className="text-xl" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Filters */}
        <div
          className={`fixed inset-0 z-50 bg-white p-5 transition-transform duration-300 ease-in-out lg:hidden ${
            showFilters ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 focus:outline-none"
              aria-label="Close filters"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {/* Search Input (Mobile) */}
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Search
              </label>
              <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                <input
                  type="search"
                  value={searchKeyword}
                  onChange={(e) => {
                    setSearchKeyword(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1)
                    );
                  }}
                  className="w-full h-full focus:outline-none text-base"
                  placeholder="Search for Job Title"
                  required
                />
                <IoIosSearch className="text-gray-500 text-xl" />
              </div>
            </div>

            {/* Location Input (Mobile) */}
            <AutoSuggestion
              value={city}
              onChange={handleCityChange}
              onSelect={(suggestion) => setCity(suggestion)}
              suggestions={cities}
              placeholder="e.g. Kathmandu"
              icon={<IoLocationOutline className="text-gray-500" />}
              label="Location"
              className="mb-0"
            />

            {/* Job Category Input (Mobile) */}
            <AutoSuggestion
              value={jobCategory}
              onChange={handleJobCategoryChange}
              onSelect={(suggestion) => setJobCategory(suggestion)}
              suggestions={jobCategoryArray}
              placeholder="e.g. Engineer"
              icon={<IoBriefcaseOutline className="text-gray-500" />}
              label="Job Category"
              className="mb-0"
            />

            {/* Job Type Selector (Mobile) */}
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Job Type
              </label>
              <div className="relative flex items-center border border-gray-300 bg-white rounded-lg px-3 h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                <GoClock className="text-gray-500 mr-2 flex-shrink-0" />
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-sm appearance-none h-full"
                >
                  <option value="">Any Job Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>
            </div>

            {/* Apply and Clear Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={clearFilters}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                disabled={!hasActiveFilters}
              >
                <HiOutlineRefresh className="mr-2" />
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors"
              >
                Apply Filters{" "}
                {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Search and Filters */}
        <div className="hidden lg:block mb-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Desktop Filters Header */}
            <div className="bg-sky-50 border-b border-sky-100 px-5 py-2 flex justify-between items-center">
              <h3 className="text-xl font-medium">Find jobs by filters</h3>

              {/* Clear Filters Button (Only shown when filters are active) */}
              {hasActiveFilters && (
                <div className="flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="flex text-sm items-center text-sky-600 hover:text-sky-800 font-medium p-2 border border-sky-200 rounded-lg hover:bg-sky-50"
                  >
                    <HiOutlineRefresh className="mr-1" />
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search Input */}
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-medium text-sm">
                    Search Jobs
                  </label>
                  <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                    <input
                      type="search"
                      value={searchKeyword}
                      onChange={(e) => {
                        setSearchKeyword(
                          e.target.value.charAt(0).toUpperCase() +
                            e.target.value.slice(1)
                        );
                      }}
                      className="w-full h-full pl-2 bg-transparent focus:outline-none"
                      placeholder="Search for Job Title"
                    />
                    {searchKeyword ? (
                      <button
                        onClick={() => setSearchKeyword("")}
                        className="text-gray-400 hover:text-gray-600 mr-1"
                      >
                        <IoClose className="text-xl" />
                      </button>
                    ) : (
                      <IoIosSearch className="text-gray-500 text-xl" />
                    )}
                  </div>
                </div>

                {/* Location Input (Desktop) */}
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-medium text-sm">
                    Location
                  </label>
                  <AutoSuggestion
                    value={city}
                    onChange={handleCityChange}
                    onSelect={(suggestion) => setCity(suggestion)}
                    suggestions={cities}
                    placeholder="Filter by Location"
                    icon={<IoLocationOutline className="text-gray-500" />}
                    className="h-12 mb-0"
                    inputClassName="h-full"
                  />
                </div>

                {/* Job Category Input (Desktop) */}
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-medium text-sm">
                    Job Category
                  </label>
                  <AutoSuggestion
                    value={jobCategory}
                    onChange={handleJobCategoryChange}
                    onSelect={(suggestion) => setJobCategory(suggestion)}
                    suggestions={jobCategoryArray}
                    placeholder="Filter by Category"
                    icon={<IoBriefcaseOutline className="text-gray-500" />}
                    className="h-12 mb-0"
                    inputClassName="h-full"
                  />
                </div>

                {/* Job Type Selector (Desktop) */}
                <div className="form-group">
                  <label className="block text-gray-700 mb-2 font-medium text-sm">
                    Job Type
                  </label>
                  <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                    <GoClock className="text-gray-500 text-lg" />
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="w-full h-full mx-2 bg-transparent focus:outline-none"
                    >
                      <option value="">Any Job Type</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="bg-gray-50 border-t border-gray-200 px-5 py-3 flex flex-wrap gap-2">
                <div className="text-sm text-gray-600 mr-2">
                  Active filters:
                </div>
                {searchKeyword && (
                  <div className="bg-sky-50 text-sky-700 text-sm px-3 py-1 rounded-full flex items-center">
                    "{searchKeyword}"
                  </div>
                )}
                {city && (
                  <div className="bg-sky-50 text-sky-700 text-sm px-3 py-1 rounded-full flex items-center">
                    <IoLocationOutline className="mr-1" /> {city}
                  </div>
                )}
                {jobCategory && (
                  <div className="bg-sky-50 text-sky-700 text-sm px-3 py-1 rounded-full flex items-center">
                    <IoBriefcaseOutline className="mr-1" /> {jobCategory}
                  </div>
                )}
                {jobType && (
                  <div className="bg-sky-50 text-sky-700 text-sm px-3 py-1 rounded-full flex items-center">
                    <GoClock className="mr-1" /> {jobType}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Job Results Section */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {loading ? (
                "Finding jobs..."
              ) : (
                <>
                  {jobs?.length || 0} Job{jobs?.length !== 1 ? "s" : ""} Found
                  {hasActiveFilters && (
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      (Filtered results)
                    </span>
                  )}
                </>
              )}
            </h2>
          </div>

          {/* Job Listings */}
          <JobsPagination
            jobs={jobs || []}
            jobCategory={jobCategory}
            jobType={jobType}
            searchKeyword={searchKeyword}
            city={city}
          />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
