import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import JobCard from "./JobCard";
import SkeletonUiForJobs from "./SkeletonUiForJobs";

const JobsPagination = ({
  jobs = [],
  jobCategory,
  jobType,
  searchKeyword,
  city,
}) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  const [currentPage, setCurrentPage] = useState(0); // react-paginate uses zero-based index
  const [jobsPerPage] = useState(16);

  // Calculate the jobs to display based on currentPage
  const indexOfLastJob = (currentPage + 1) * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs?.slice(indexOfFirstJob, indexOfLastJob) || [];

  // Handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const [expandedJobId, setExpandedJobId] = useState(null);

  const toggleExpand = (jobId) => {
    window.scrollTo(0, 0); // Scroll to top
    setExpandedJobId((prevId) => (prevId === jobId ? null : jobId));
  };
  const [marginPagesDisplayed, setMarginPagesDisplayed] = useState(1);
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 750) {
        setMarginPagesDisplayed(1);
        setPageRangeDisplayed(2);
      } else {
        setMarginPagesDisplayed(1);
        setPageRangeDisplayed(1);
      }
    };

    // Set the initial values
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // Clear timeout if user types again
  }, []);

  return (
    <div className="w-full flex flex-col gap-5 pt-2">
      <div className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {currentJobs.map((element) => (
          <JobCard
            element={element}
            enableDeleteJob={false}
            key={element._id}
            toggleExpand={toggleExpand}
            expandedJobId={expandedJobId}
            enableApplyApplication={true}
          />
        ))}
      </div>
      {!(jobs?.length > 0) && (
        <div className="w-full">
          {isLoading ? (
            <SkeletonUiForJobs />
          ) : (
            <h1 className="text-center w-full">
              No {jobType}{" "}
              {searchKeyword?.length > 0 ? `"${searchKeyword}"` : ""} Job
              Available {""} {jobCategory ? `on ${jobCategory} ` : ""}
              {""}
              {city ? `in ${city}` : ""} Right Now.
            </h1>
          )}
        </div>
      )}
      {/* Pagination */}
      {jobs?.length > 16 ? (
        <div className="flex justify-center">
          <ReactPaginate
            previousLabel={
              <span className="text-sm text-center sm:text-xl">Prev</span>
            }
            nextLabel={
              <span className="text-sm text-center sm:text-xl">Next</span>
            }
            breakLabel={"..."}
            pageCount={Math.ceil(jobs?.length / jobsPerPage) || 0}
            marginPagesDisplayed={marginPagesDisplayed}
            pageRangeDisplayed={pageRangeDisplayed}
            onPageChange={handlePageChange}
            containerClassName="flex items-center"
            pageLinkClassName="text-center text-sm sm:text-xl"
            activeClassName="bg-sky-600 hover:bg-sky-700 text-white"
            previousClassName="text-sm sm:text-xl px-2 py-1 bg-sky-600 hover:bg-sky-700 rounded-md  text-white  disabled:opacity-50"
            nextClassName="text-sm sm:text-xl px-2 py-1 bg-sky-600 hover:bg-sky-700 rounded-md  text-white  disabled:opacity-50"
            disabledClassName="opacity-50 text-sm sm:text-xl"
            pageClassName="py-1 px-3 text-sm sm:text-xl border-2 border-gray-100 rounded-md hover:cursor-pointer"
            className="flex overflow-hidden gap-1"
            onClick={scrollToTop}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default JobsPagination;
