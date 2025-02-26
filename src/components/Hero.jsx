import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="bg-img flex flex-col gap-5 pt-10 pb-10">
      <p className="text-4xl font-medium text-center">
        Where Careers Meet Opportunities
      </p>
      <p className="text-gray-500 text-xl text-center">
        "Connecting people with opportunities through{" "}
        <span className="text-sky-600 text-xl">Kaamsetu</span>, Nepal's own job
        portal"
      </p>
      <div className="flex flex-col md:flex-row w-full items-center justify-center gap-5">
        <Link
          to={"/jobs"}
          className="flex justify-center items-center text-white w-[300px] bg-sky-600 hover:bg-sky-700 p-2 rounded-md text-xl"
        >
          Explore Jobs
        </Link>
        <Link
          to={"/contact"}
          className="flex justify-center items-center text-sky-600 border-2 w-[300px] border-sky-600 p-2 rounded-md text-xl"
        >
          Talk To Us
        </Link>
      </div>
    </div>
  );
};

export default Hero;
