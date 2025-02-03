import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { IoIosInformationCircleOutline } from "react-icons/io";

const JobPost = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("Full Time");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobCategory, setJobCategory] = useState("Not Given");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] =
    useState("No");
  const [WebsiteTitle, setWebsiteTitle] = useState("");
  const [WebsiteUrl, setWebsiteUrl] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const companyLogoHandler = (e) => {
    const logo = e.target.files[0];
    setCompanyLogo(logo);
  };
  const jobCategoryArray = [
    "Not Given",
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "DevOps",
    "Mobile App Development",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

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
      dispatch(resetJobSlice());
      setTitle("");
      setJobType("Full Time");
      setLocation("");
      setCompanyName("");
      setIntroduction("");
      setResponsibilities("");
      setQualifications("");
      setOffers("");
      setJobCategory("Not Given");
      setSalary("");
      setHiringMultipleCandidates("No");
      setWebsiteTitle("");
      setWebsiteUrl("");
      setCompanyLogo("");
    }
  }, [dispatch, error, loading, message]);

  return (
    <form onSubmit={handlePostJob} className="flex flex-col gap-4 w-full md:w-[80%]">
      <div className="flex flex-col gap-2">
        <label className="text-xl">Company's Logo</label>
        <input
          type="file"
          accept="image/*"
          className="text-[12px] bg-transparent"
          onChange={companyLogoHandler}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl">Company's Name</label>
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
        <label className="text-xl">Job's Title</label>
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
        <label className="text-xl">Job's Type</label>
        <select
          className="w-full border-2 border-black pl-2 "
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl">Location (City)</label>
        <input
          className="w-full border-2 border-black pl-2 "
          value={location}
          onChange={(e) =>
            setLocation(
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
            )
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl">Company's Introduction</label>
        <textarea
          className="w-full border-2 border-black pl-2 "
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
        <label className="text-xl">Responsibilities</label>
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
        <label className="text-xl">Qualifications</label>
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
          <label className="text-xl">What We Offer</label>
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
        <label className="text-xl">Job Category</label>
        <select
          className="w-full border-2 border-black pl-2 "
          value={jobCategory}
          onChange={(e) => setJobCategory(e.target.value)}
        >
          {jobCategoryArray.map((element) => {
            return (
              <option
                value={element}
                key={Math.random().toString(36).substring(2, 9)}
              >
                {element}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl">Salary (Per year)</label>
        <input
          className="w-full border-2 border-black pl-2 "
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="text-xl">Hiring Multiple Candidates?</label>
          <p className="flex gap-2 items-center">
            <IoIosInformationCircleOutline /> Optional
          </p>
        </div>
        <select
          className="w-full border-2 border-black pl-2 "
          value={hiringMultipleCandidates}
          onChange={(e) => setHiringMultipleCandidates(e.target.value)}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="text-xl">Website Name</label>
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
          <label className="text-xl">Website Link (URL)</label>
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
      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="bg-sky-600 w-full rounded hover:cursor-pointer text-center text-white py-2"
          disabled={loading}
        >
          Post Job
        </button>
      </div>
    </form>
  );
};

export default JobPost;
