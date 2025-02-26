import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import JobCard from "./JobCard";

const JobsPagination = ({ jobs }) => {
  const scrollToTop=()=>{
    window.scrollTo(0, 0); // Scroll to the top of the page
  }
  const [currentPage, setCurrentPage] = useState(0); // react-paginate uses zero-based index
  const [jobsPerPage] = useState(16);

  // Calculate the jobs to display based on currentPage
  const indexOfLastJob = (currentPage + 1) * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
   const [expandedJobId, setExpandedJobId] = useState(null);
  
    const toggleExpand = (jobId) => {
    window.scrollTo(0, 0); // Scroll to top
      setExpandedJobId((prevId) => (prevId === jobId ? null : jobId));
    };

  return (
    <div className="w-full flex flex-col gap-5 pt-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {currentJobs.map((element) => (
          <JobCard element={element} enableDeleteJob={false} key={element._id} toggleExpand={toggleExpand} expandedJobId={expandedJobId} enableApplyApplication={true} />
        ))}
      </div>
      {/* Pagination */}
      {jobs.length > 9 ? (
        <div className="flex justify-center">
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(jobs.length / jobsPerPage)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName="flex items-center"
            pageLinkClassName="text-center"
            activeClassName="bg-sky-600 hover:bg-sky-700 text-white"
            previousClassName="px-2 py-1 bg-sky-600 hover:bg-sky-700 rounded-md  text-white  disabled:opacity-50"
            nextClassName="px-2 py-1 bg-sky-600 hover:bg-sky-700 rounded-md  text-white  disabled:opacity-50"
            disabledClassName="opacity-50"
            pageClassName="py-1 px-3 border-2 border-gray-100 rounded-md hover:cursor-pointer"
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
