import React from "react";
import {
  FaCheck,
  FaBolt,
  FaShieldAlt,
  FaChartLine,
  FaUserCheck,
  FaBriefcase,
} from "react-icons/fa";
import { LuCrown } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const features = [
  {
    icon: <FaCheck className="text-sky-600" />,
    title: "Job Notification",
    description:
      "Premium user can get instant job notification whenever a job from preferred job choice category is posted",
  },
  {
    icon: <FaBolt className="text-sky-600" />,
    title: "One-Click Apply",
    description: "Apply to jobs instantly",
  },
  {
    icon: <FaShieldAlt className="text-sky-600" />,
    title: "Verified Employers",
    description: "All companies are properly verified thoroughly",
  },
  {
    icon: <FaChartLine className="text-sky-600" />,
    title: "Career Growth",
    description: "Resources to advance your career",
  },
];

const jobCategories = [
  "Web Developer",
  "Data Analyst",
  "Product Manager",
  "UI/UX Designer",
  "Software Engineer",
];

const Hero = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <header className="py-10 md:py-5 overflow-hidden bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-5 lg:px-8 relative">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100 rounded-full opacity-30 blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="flex flex-col xl:flex-row items-center gap-5 md:gap-10">
          {/* Left Section */}
          <div className="xl:w-1/2 z-10">
            <div className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6">
              #KAAMSETU
            </div>

            <h1 className="text-4xl md:text-3xl lg:text-4xl font-medium mb-5 leading-tight">
              Where Careers Meet Oppertunities
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              "Connecting people with opportunities through Nepal's own job
              portal"
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                to={"/jobs"}
                className="bg-sky-600 text-xl text-white  px-5 py-2 rounded-md font-medium text-center hover:bg-sky-700 transition-all shadow-lg hover:shadow-sky-200 hover:-translate-y-1 duration-300"
              >
                Explore Jobs
              </Link>
              {user?.premiumUser ? (
                <div className="text-2xl font-[500] flex gap-2 items-center justify-center">
                  <LuCrown  className="text-4xl"/>
                  Premium User
                  <IoMdCheckmarkCircleOutline className="text-xl text-green-500" />
                </div>
              ) : (
                <Link
                  to={"/subscribe"}
                  className="bg-white text-sky-600 border-2 border-sky-600 px-5 py-2 rounded-md font-medium text-center hover:bg-sky-50 transition-all hover:-translate-y-1 duration-300"
                >
                  <div className="text-xl flex gap-2 items-center">
                    <LuCrown />
                    Subscribe
                  </div>
                </Link>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-sky-100 p-2 rounded-lg mr-3">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium ">{feature.title}</h3>
                    <p className="text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="xl:w-1/2 relative">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-sky-200 to-sky-300 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full opacity-50 blur-xl"></div>

            {/* Main Image */}
            <div className="relative bg-white p-3 rounded-2xl shadow-xl">
              <img
                src="https://img.freepik.com/free-vector/recruitment-agency-searching-job-candidates_1262-19873.jpg"
                alt="Job search illustration"
                className="w-full h-auto rounded-xl"
              />

              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                    <FaUserCheck />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">
                      Hired Job Seekers
                    </div>
                    <div className="font-medium ">250+</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 mr-3">
                    <FaBriefcase />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Jobs Available</div>
                    <div className="font-medium ">1k+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-10 text-center">
          <p className="mb-5">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {jobCategories.map((category, index) => (
              <p
                key={index}
                className="inline-block bg-white border border-gray-200  rounded-full px-4 py-2 text-sm font-medium hover:bg-sky-50 hover:border-sky-200 transition-colors shadow-sm"
              >
                {category}
              </p>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
