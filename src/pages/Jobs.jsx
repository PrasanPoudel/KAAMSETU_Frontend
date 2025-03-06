import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import JobsPagination from "../components/JobPagination";
import { MdOutlineFindInPage } from "react-icons/md";
import { IoLocationOutline, IoBriefcaseOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { CiFilter } from "react-icons/ci";
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
  return (
    <>
      <div className="flex w-full md:px-5">
        <div className="flex border-2 bg-white border-l-0 border-r-0 border-t-0 border-black px-2 w-full items-center lg:hidden ">
          <MdOutlineFindInPage className="text-xl w-[30px] text-black" />
          <input
            type="search"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              );
            }}
            className="w-full pl-2 bg-transparent p-2"
            placeholder="Search for Jobs"
          />
          <CiFilter
            className="text-3xl rounded-md border border-black shadow-[0px_0px_2.5px_rgba(0,0,0,0.35)]  lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          />
        </div>
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

        <div className="flex border-2 bg-white border-l-0 border-r-0 border-t-0 border-black pl-2 w-full items-center ">
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
              className="w-full pl-2 bg-transparent  text-black "
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
        <div className="flex border-2 bg-white border-l-0 border-r-0 border-t-0 border-black pl-2 w-full items-center ">
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
              className="w-full pl-2 bg-transparent  text-black "
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
        <div className="relative flex  bg-white border-2 border-black justify-between items-center rounded-md">
          <GoClock className="absolute left-2 text-black w-[30px] text-xl" />
          <select
            onChange={(e) => setJobType(e.target.value)}
            value={jobType}
            className="pl-10 w-full bg-transparent pr-4"
          >
            <option value="" disabled>
              Job Type
            </option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
        </div>
      </div>
      {/* End */}
      <div className={`${showFilters ? "hidden" : "flex flex-col gap-5"}`}>
        <div className="job-filters  px-2 hidden lg:flex lg:flex-col gap-2 py-10">
          <div className="grid grid-cols-4 gap-2">
            <div className="flex border-2 bg-white border-l-0 border-r-0 border-t-0 border-black pl-2 w-full items-center ">
              <MdOutlineFindInPage className="text-xl w-[30px] text-black" />
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
            <div className="flex border-2 bg-white border-l-0 border-r-0 border-t-0 border-black pl-2 w-full items-center ">
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
                  className="w-full pl-2 bg-transparent text-black "
                />
                {filteredSuggestionsForLocation.length > 0 &&
                  city.length > 0 && (
                    <span className="absolute left-2 top-[13px]">
                      {city}
                      <span className="text-gray-500">
                        {filteredSuggestionsForLocation[0].slice(city.length)}
                      </span>
                    </span>
                  )}
              </div>
            </div>
            <div className="flex border-2 bg-white border-l-0 border-r-0 border-t-0 border-black pl-2 w-full items-center ">
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
                  className="w-full pl-2 bg-transparent  text-black "
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
            <div className="relative flex  bg-white border-2 border-black justify-between items-center rounded-md">
              <GoClock className="absolute left-2 text-black w-[30px] text-xl" />
              <select
                onChange={(e) => setJobType(e.target.value)}
                value={jobType}
                className="pl-10 w-full bg-transparent pr-4"
              >
                <option value="" disabled>
                  Job Type
                </option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
              </select>
            </div>
          </div>
        </div>
        {jobs.length > 0 &&
          (searchKeyword || jobCategory || city || jobType) != "" && (
            <h1 className="w-full mt-2 pl-1">
              Searching For {jobType}{" "}
              {searchKeyword.length > 0 ? `"${searchKeyword}"` : ""}
              {""} {jobCategory ? `for ${jobCategory} ` : ""}
              {""}
              {city ? `in ${city}` : ""}
            </h1>
          )}
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
