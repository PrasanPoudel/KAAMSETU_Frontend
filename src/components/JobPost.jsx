import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { HiOutlineBriefcase, HiOutlineOfficeBuilding } from "react-icons/hi";
import {
  MdOutlineTitle,
  MdOutlineAttachMoney,
  MdOutlineLocationOn,
} from "react-icons/md";
import { BiLink } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import jobCategoryArray from "../data/jobCategoryArray";
import cities from "../data/cities";
import ImageUploader from "./ImageUploader";
import AutoSuggestion from "./AutoSuggestion";

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
      window.scrollTo(0, 0);
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

  const handleLocationChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setLocation(input);
  };

  const handleJobCategoryChange = (e) => {
    const input =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setJobCategory(input);
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Post a New Job
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Fill in the details below to create a new job listing
        </p>

        <form onSubmit={handlePostJob} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group md:col-span-1">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Company Logo
              </label>
              <ImageUploader onImageUpload={companyLogoHandler} />
            </div>

            <div className="form-group md:col-span-1">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Company Name
              </label>
              <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) =>
                    setCompanyName(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1)
                    )
                  }
                  className="w-full h-full focus:outline-none text-base"
                  placeholder="Enter company name"
                  required
                />
                <HiOutlineOfficeBuilding className="text-lg text-gray-500" />
              </div>
            </div>

            <div className="form-group md:col-span-1">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Job Title
              </label>
              <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1)
                    )
                  }
                  className="w-full h-full focus:outline-none text-base"
                  placeholder="Enter job title"
                  required
                />
                <MdOutlineTitle className="text-lg text-gray-500" />
              </div>
            </div>

            <div className="form-group md:col-span-1">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Job Category
              </label>
              <AutoSuggestion
                value={jobCategory}
                onChange={handleJobCategoryChange}
                onSelect={(suggestion) => setJobCategory(suggestion)}
                suggestions={jobCategoryArray}
                placeholder="Enter job category"
                icon={<HiOutlineBriefcase className="text-lg text-gray-500" />}
                required={true}
              />
            </div>

            <div className="form-group md:col-span-1">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Job Type
              </label>
              <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full h-full bg-white focus:outline-none text-base"
                  required
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
                <BsBookmark className="text-lg text-gray-500" />
              </div>
            </div>

            <div className="form-group md:col-span-1">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Location (City)
              </label>
              <AutoSuggestion
                value={location}
                onChange={handleLocationChange}
                onSelect={(suggestion) => setLocation(suggestion)}
                suggestions={cities}
                placeholder="Enter location"
                icon={<MdOutlineLocationOn className="text-lg text-gray-500" />}
                required={true}
              />
            </div>

            <div className="form-group md:col-span-1">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Salary (Per year)
              </label>
              <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                <input
                  type={salaryNegotiable ? "text" : "number"}
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  disabled={salaryNegotiable}
                  className="w-full h-full focus:outline-none text-base"
                  placeholder="Enter salary"
                  required
                />
                <MdOutlineAttachMoney className="text-lg text-gray-500" />
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  id="salaryNegotiable"
                  checked={salaryNegotiable}
                  onChange={() => {
                    setSalaryNegotiable(!salaryNegotiable);
                    setSalary("(Negotiable)");
                  }}
                  className="mr-2"
                />
                <label htmlFor="salaryNegotiable">Negotiable</label>
              </div>
            </div>

            <div className="form-group md:col-span-1">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Hiring Multiple Candidates
                <span className="ml-2 text-xs text-gray-500">(Optional)</span>
              </label>
              <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                <select
                  value={hiringMultipleCandidates}
                  onChange={(e) => setHiringMultipleCandidates(e.target.value)}
                  className="w-full h-full bg-white focus:outline-none text-base"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div className="form-group md:col-span-1">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Website Name
                <span className="ml-2 text-xs text-gray-500">(Optional)</span>
              </label>
              <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                <input
                  type="text"
                  value={WebsiteTitle}
                  onChange={(e) =>
                    setWebsiteTitle(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1)
                    )
                  }
                  className="w-full h-full focus:outline-none text-base"
                  placeholder="Enter website name"
                />
                <BiLink className="text-lg text-gray-500" />
              </div>
            </div>

            <div className="form-group md:col-span-1">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Website Link (URL)
                <span className="ml-2 text-xs text-gray-500">(Optional)</span>
              </label>
              <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                <input
                  type="text"
                  value={WebsiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full h-full focus:outline-none text-base"
                  placeholder="Enter website URL"
                />
                <BiLink className="text-lg text-gray-500" />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Company Introduction
              </label>
              <textarea
                value={introduction}
                onChange={(e) =>
                  setIntroduction(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                rows={4}
                placeholder="Provide a brief introduction to your company"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Responsibilities
              </label>
              <textarea
                value={responsibilities}
                onChange={(e) =>
                  setResponsibilities(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                rows={4}
                placeholder="List the key responsibilities for this position"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Qualifications
              </label>
              <textarea
                value={qualifications}
                onChange={(e) =>
                  setQualifications(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                rows={4}
                placeholder="List required qualifications and skills"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                What We Offer
                <span className="ml-2 text-xs text-gray-500">(Optional)</span>
              </label>
              <textarea
                value={offers}
                onChange={(e) =>
                  setOffers(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                rows={4}
                placeholder="Describe benefits, perks, and other offerings"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 cursor-pointer text-base rounded-lg font-medium w-full text-white py-3"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPost;
