import React from "react";
import { MdSearch, MdBusiness, MdLaptop } from "react-icons/md";

const reasons = [
  {
    title: "Many Jobs",
    description:
      "Let you choose your perfect career opportunities from a lot of posted jobs.",
    icon: <MdSearch className="h-8 w-8" />,
  },
  {
    title: "Top Companies",
    description:
      "Access job openings from verified employers and leading organizations across industries.",
    icon: <MdBusiness className="h-8 w-8" />,
  },
  {
    title: "Remote Application",
    description: "Apply to jobs through our platform remotely from your place.",
    icon: <MdLaptop className="h-8 w-8" />,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-5 mt-5 bg-gray-50 rounded-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium text-gray-900 mb-4">
            Why Choose KAAMSETU
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We connect talented professionals with leading companies to create
            meaningful career opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
                {reason.icon}
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
