import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import Spinner from "../components/Spinner";

const MyApplications = () => {
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 className="text-xl text-center md:text-start">
          You have not applied for any job yet
        </h1>
      ) : (
        <div className="w-full">
          <p className="text-xl mb-5">
            <span className="text-3xl text-sky-600">{applications.length}</span>{" "}
            jobs applied by you
          </p>
          <div className="overflow-auto p-2 max-w-full">
            <table className="w-full border-collapse overflow-hidden rounded-md">
              <thead className="bg-sky-600 hover:bg-sky-700 text-white">
                <tr>
                  <th className="p-2 text-left border-2 border-white  text-sm font-medium">
                    S/N
                  </th>
                  <th className="p-2 text-left border-2 border-white text-sm font-medium">
                    Job's Title
                  </th>
                  <th className="p-2 text-left border-2 border-white text-sm font-medium">
                    Job's Id
                  </th>
                  <th className="p-2 text-left border-2 border-white text-sm font-medium">
                    Also
                  </th>
                  <th className="p-2 text-left border-2 border-white text-sm font-medium">
                    Resume Sent
                  </th>
                  <th className="p-2 text-left border-2 border-white text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((element, index) => {
                  return (
                    <tr
                      key={element._id}
                      className="border-b-2 border-white text-sm bg-gray-200"
                    >
                      <td className="p-2 border-2 border-white text-sm">
                        {index + 1}
                      </td>
                      <td className="p-2 border-2 border-white text-sm">
                        {element.jobInfo.jobTitle}
                      </td>
                      <td className="p-2 border-2 border-white text-sm">
                        {element.jobInfo.jobId}
                      </td>
                      <td className="p-2 border-2 border-white">
                      <Link to={`/post/Application/${element.jobInfo.jobId}`} className="text-sm underline">
                        More Details
                      </Link>
                      </td>
                      <td className="p-2 border bg-sky-600 hover:bg-sky-700">
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
                      <td className="p-2 border bg-red-500 hover:bg-red-600">
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

export default MyApplications;
