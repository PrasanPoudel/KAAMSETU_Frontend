import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div className="flex justify-center h-[300px]">
      <div className="flex flex-col gap-4 justify-center items-center">
        <p className="text-xl">404 Not Found</p>
        <p className="text-xl text-center">Your Visited Page Not Found.</p>
        <Link
          to={"/"}
          className=" bg-sky-600 hover:bg-sky-700 hover:cursor-pointer text-xl text-center text-white md:px-2 px-1 py-2 w-[300px]"
        >
          Back to home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
