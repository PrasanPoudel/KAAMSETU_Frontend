import React from "react";
import {
  MdComputer,
  MdShowChart,
  MdPalette,
  MdCampaign,
  MdBusinessCenter,
  MdMoreHoriz,
} from "react-icons/md";

const categories = [
  {
    name: "Technology",
    jobs: "500+ Jobs",
    icon: <MdComputer className="h-6 w-6" />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Finance",
    jobs: "150+ Jobs",
    icon: <MdShowChart className="h-6 w-6" />,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Design",
    jobs: "50+ Jobs",
    icon: <MdPalette className="h-6 w-6" />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Marketing",
    jobs: "100+ Jobs",
    icon: <MdCampaign className="h-6 w-6" />,
    color: "bg-red-100 text-red-600",
  },
  {
    name: "HR",
    jobs: "100+ Jobs",
    icon: <MdBusinessCenter className="h-6 w-6" />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "More",
    jobs: "1k+ Jobs",
    icon: <MdMoreHoriz className="h-6 w-6" />,
    color: "bg-gray-100 text-gray-600",
  },
];

const JobCategories = () => {
  return (
    <section className="py-5 bg-gradient-to-b from-sky-50 to-white rounded-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium  mb-4">Explore Job Categories</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find opportunities across various industries that match your
            expertise and career goals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 ${category.color} rounded-full mb-4`}
              >
                {category.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">{category.jobs}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
