import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { IoIosInformationCircleOutline } from "react-icons/io";
import jobCategoryArray from "../data/jobCategoryArray";
import cities from "../data/cities";
import ImageUploader from "./ImageUploader";

const JobPost = () => {
  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("Full Time");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [salary, setSalary] = useState("");
  const [salaryNegotiable, setSalaryNegotiable] = useState(false);
  const [hiringMultipleCandidates, setHiringMultipleCandidates] =
    useState("No");
  const [WebsiteTitle, setWebsiteTitle] = useState("");
  const [WebsiteUrl, setWebsiteUrl] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const companyLogoHandler = (file) => {
    setCompanyLogo(file);
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("title", title);
    formData.append("introduction", introduction);
    formData.append("responsibilities", responsibilities);
    formData.append("qualifications", qualifications);
    offers && formData.append("offers", offers);
    formData.append("jobCategory", jobCategory);
    formData.append("salary", salary);
    hiringMultipleCandidates &&
      formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
    WebsiteTitle && formData.append("WebsiteTitle", WebsiteTitle);
    WebsiteUrl && formData.append("WebsiteUrl", WebsiteUrl);
    formData.append("companyLogo", companyLogo);
    dispatch(postJob(formData));
    setCompanyLogo("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      window.scrollTo(0, 0); // Scroll to the top of the page
      dispatch(resetJobSlice());
      setTitle("");
      setJobType("Full Time");
      setLocation("");
      setCompanyName("");
      setIntroduction("");
      setResponsibilities("");
      setQualifications("");
      setOffers("");
      setJobCategory("");
      setSalary("");
      setHiringMultipleCandidates("No");
      setWebsiteTitle("");
      setWebsiteUrl("");
      setCompanyLogo("");
    }
  }, [dispatch, error, loading, message]);
  const [filteredSuggestionsForLocation, setFilteredSuggestionsForLocation] =
    useState([]);
  const [
    filteredSuggestionsForJobCategory,
    setFilteredSuggestionsForJobCategory,
  ] = useState([]);
  const handleLocationChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setLocation(input);

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
    <form onSubmit={handlePostJob} className="grid gap-4 w-full md:w-[80%]">
      <div className="grid grid-cols-1 items-center md:items-end justify-between gap-4 md:grid-cols-2 w-full">
        <div className="flex flex-col gap-2">
          <label className="text-xl font-medium">Company's Logo</label>
          <ImageUploader onImageUpload={companyLogoHandler} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-medium">Company's Name</label>
          <input
            className="w-full border-2 border-black pl-2 "
            type="text"
            value={companyName}
            onChange={(e) =>
              setCompanyName(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-medium">Job's Title</label>
          <input
            className="w-full border-2 border-black pl-2 "
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-medium">Job Category</label>
          <div className="w-full rounded-md border-2 border-black flex items-center bg-white pl-2">
            <div className="relative w-full">
              <input
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
                className="w-full outline-none bg-transparent text-black placeholder:text-gray-500"
              />
              {filteredSuggestionsForJobCategory.length > 0 &&
                jobCategoryArray.length > 0 && (
                  <span className="absolute left-0 top-[12px]">
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
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-medium">Job's Type</label>
          <select
            className="w-full border-2 border-black px-2 "
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-medium">Location (City)</label>
          <div className="w-full rounded-md border-2 border-black flex items-center bg-white pl-2">
            <div className="relative w-full">
              <input
                onBlur={handleAddressBlur}
                type="text"
                value={location}
                onChange={handleLocationChange}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "Tab") {
                    e.preventDefault();
                    if (filteredSuggestionsForLocation.length > 0) {
                      setLocation(filteredSuggestionsForLocation[0]);
                      setFilteredSuggestionsForLocation([]);
                    }
                  }
                }}
                className="w-full outline-none bg-transparent text-black placeholder:text-gray-500"
              />
              {filteredSuggestionsForLocation.length > 0 &&
                location.length > 0 && (
                  <span className="absolute left-0 top-[12px]">
                    {location}
                    <span className="text-gray-500">
                      {filteredSuggestionsForLocation[0].slice(location.length)}
                    </span>
                  </span>
                )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-medium">Company's Introduction</label>
          <textarea
            className="w-full border-2 border-black pl-2"
            value={introduction}
            onChange={(e) =>
              setIntroduction(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            rows={7}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-medium">Responsibilities</label>
          <textarea
            className="w-full border-2 border-black pl-2 "
            value={responsibilities}
            onChange={(e) =>
              setResponsibilities(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            rows={7}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-medium">Qualifications</label>
          <textarea
            className="w-full border-2 border-black pl-2 "
            value={qualifications}
            onChange={(e) =>
              setQualifications(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            rows={7}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium">What We Offer</label>
            <p className="flex gap-2 items-center">
              <IoIosInformationCircleOutline /> Optional
            </p>
          </div>
          <textarea
            className="w-full border-2 border-black pl-2 "
            value={offers}
            onChange={(e) =>
              setOffers(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            rows={7}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-medium">Salary (Per year)</label>
          <input
            className="w-full border-2 border-black px-2 "
            type={salaryNegotiable ? "text" : "number"}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            disabled={salaryNegotiable}
          />
          <div htmlFor="checkBox" className="text-sm font-medium flex items-center gap-2">
            <input
              type="checkbox"
              checked={salaryNegotiable}
              onChange={() => {
                setSalaryNegotiable(!salaryNegotiable);
                setSalary("Negotiable");
              }}
            />
            Negotiable
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium">
              Hiring Multiple Candidates?
            </label>
            <p className="flex gap-2 items-center">
              <IoIosInformationCircleOutline /> Optional
            </p>
          </div>
          <select
            className="w-full border-2 border-black px-2 "
            value={hiringMultipleCandidates}
            onChange={(e) => setHiringMultipleCandidates(e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium">Website Name</label>
            <p className="flex gap-2 items-center">
              <IoIosInformationCircleOutline /> Optional
            </p>
          </div>
          <input
            className="w-full border-2 border-black pl-2 "
            type="text"
            value={WebsiteTitle}
            onChange={(e) =>
              setWebsiteTitle(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-medium">Website Link (URL)</label>
            <p className="flex gap-2 items-center">
              <IoIosInformationCircleOutline /> Optional
            </p>
          </div>
          <input
            className="w-full border-2 border-black pl-2 "
            type="text"
            value={WebsiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 text-xl w-full rounded-md hover:cursor-pointer text-center text-white md:px-2 px-1 py-2"
        disabled={loading}
      >
        Post Job
      </button>
    </form>
  );
};

export default JobPost;
