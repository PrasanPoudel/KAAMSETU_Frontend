import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import JobCard from "./JobCard";

const JobsPagination = ({ jobs }) => {
  const [currentPage, setCurrentPage] = useState(0); // react-paginate uses zero-based index
  const [jobsPerPage] = useState(9);

  // Calculate the jobs to display based on currentPage
  const indexOfLastJob = (currentPage + 1) * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="flex flex-col gap-5 py-5">
      <div className="grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-5">
        {currentJobs.map((element) => (
          <JobCard element={element} key={element._id} />
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
            activeClassName="bg-sky-600 text-white"
            previousClassName="px-2 py-1 md:px-4 bg-sky-600 rounded-lg  text-white  disabled:opacity-50"
            nextClassName="px-2 py-1 md:px-4 bg-sky-600 rounded-lg  text-white  disabled:opacity-50"
            disabledClassName="opacity-50"
            pageClassName="py-1 px-2 md:px-4 border-2 rounded-lg shadow-sm hover:bg-sky-600 hover:text-white hover:cursor-pointer"
            className="flex overflow-hidden gap-1"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default JobsPagination;
