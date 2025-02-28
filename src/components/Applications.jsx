import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : applications && applications.length <= 0 ? (
        <h1 className="text-xl text-center md:text-start">
          You have not received any application from job seekers
        </h1>
      ) : (
        <div className="w-full">
          <p className="text-xl mb-5">
            <span className="text-3xl text-sky-600">
              {" "}
              {applications.length}{" "}
            </span>
            {applications.length > 1 ? "peoples" : "person"} have applied for
            jobs posted by you
          </p>
          <div className="overflow-auto p-2 max-w-full">
            <table className="w-full border-collapse overflow-hidden rounded-md">
              <thead className="bg-sky-600 hover:bg-sky-700 text-white">
                <tr>
                  <th className="p-2 text-left border-2 border-white text-sm font-medium">
                    S/N
                  </th>
                  <th className="p-2 text-left border-2 border-white text-sm font-medium">
                    Job's Title
                  </th>
                  <th className="p-2 text-left border-2 border-white text-sm font-medium">
                    Applicant's Name
                  </th>
                  <th className="p-2 text-left border-2 border-white text-sm font-medium">
                    Applicant's Email
                  </th>
                  <th className="p-2 text-left border-2 border-white text-sm font-medium">
                    Applicant's Phone Number
                  </th>
                  <th className="p-2 text-left border-2 border-white text-sm font-medium">
                    Applicant's Address
                  </th>
                  <th className="p-2 text-left border-2 border-white text-sm font-medium">
                    Applicant's Resume
                  </th>
                  <th className="p-2 text-left border-2 border-white text-sm font-medium">
                    Click To Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((element, index) => {
                  return (
                    <tr
                      key={element._id}
                      className="border-b-2 border-white bg-gray-200"
                    >
                      <td className="p-2 border-2 border-white">{index + 1}</td>
                      <td className="p-2 border-2 border-white text-sm">
                        {element.jobInfo.jobTitle}
                      </td>
                      <td className="p-2 border-2 border-white text-sm">
                        {element.jobSeekerInfo.name}
                      </td>
                      <td className="p-2 border-2 border-white text-sm">
                        {element.jobSeekerInfo.email}
                      </td>
                      <td className="p-2 border-2 border-white text-sm">
                        {element.jobSeekerInfo.phone}
                      </td>
                      <td className="p-2 border-2 border-white text-sm">
                        {element.jobSeekerInfo.address}
                      </td>
                      <td className="p-2 border  bg-sky-600 hover:bg-sky-700">
                        <Link
                          to={
                            element.jobSeekerInfo &&
                            element.jobSeekerInfo.resume.url
                          }
                          className="text-white text-sm underline"
                          target="_blank"
                        >
                          View Resume
                        </Link>
                      </td>
                      <td className="p-2 border  bg-red-500 hover:bg-red-600">
                        <button
                          className="text-white text-sm"
                          onClick={() => handleDeleteApplication(element._id)}
                        >
                          Delete Application
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Applications;
