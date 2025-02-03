import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";
import { RiMenu2Fill } from "react-icons/ri";
import { IoMdCloseCircleOutline } from "react-icons/io";
const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const [componentName, setComponentName] = useState("My Profile");
  const [showConfirm, setShowConfirm] = useState(false);
  const handleCancel = () => {
    setShowConfirm(false); // Close the confirmation dialog
  };
  const [showMenu, setShowMenu] = useState(false);
  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  const componentsMap = {
    "My Profile": <MyProfile />,
    "Update Profile": <UpdateProfile />,
    "Update Password": <UpdatePassword />,
    "Job Post": <JobPost />,
    "My Jobs": <MyJobs />,
    Applications: <Applications />,
    "My Applications": <MyApplications />,
  };

  return (
    <>
      {showConfirm && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className=" p-4  bg-white shadow-lg">
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1  hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 px-3 py-1  hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between h-12 border-b-[2px] items-center border-black">
        <p className="text-xl">Dashboard</p>
        {!showMenu ? (
          <RiMenu2Fill
            className="animated-box text-3xl md:hidden"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          />
        ) : (
          <IoMdCloseCircleOutline
            className="animated-box text-3xl md:hidden"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          />
        )}
      </div>

      <div className="flex flex-col justify-between gap-10 md:flex-row">
        {/* Start desktop screen */}
        <div className="hidden flex-col md:w-[20%] md:flex">
          <ul className="sidebar-links md:sticky md:top-[150px] flex flex-col gap-4 border-r-[2px] border-b-2  border-black">
            <li
              onClick={() => {
                setComponentName("My Profile");
              }}
              className={
                componentName == "My Profile"
                  ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600 hover:text-white p-1 "
                  : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
              }
            >
              My Profile
            </li>
            <li
              onClick={() => {
                setComponentName("Update Profile");
              }}
              className={
                componentName == "Update Profile"
                  ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600 hover:text-white p-1 "
                  : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
              }
            >
              Update Profile
            </li>
            <li
              onClick={() => {
                setComponentName("Update Password");
              }}
              className={
                componentName == "Update Password"
                  ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600 hover:text-white p-1 "
                  : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
              }
            >
              Update Password
            </li>

            {user && user.role === "Employer" && (
              <li
                onClick={() => {
                  setComponentName("Job Post");
                }}
                className={
                  componentName == "Job Post"
                    ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600  hover:text-white p-1 "
                    : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
                }
              >
                Post New Job
              </li>
            )}
            {user && user.role === "Employer" && (
              <li
                onClick={() => {
                  setComponentName("My Jobs");
                }}
                className={
                  componentName == "My Jobs"
                    ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600 hover:text-white p-1 "
                    : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
                }
              >
                My Jobs
              </li>
            )}
            {user && user.role === "Employer" && (
              <li
                onClick={() => {
                  setComponentName("Applications");
                }}
                className={
                  componentName == "Applications"
                    ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600 hover:text-white p-1 "
                    : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
                }
              >
                Applications
              </li>
            )}
            {user && user.role === "Job Seeker" && (
              <li
                onClick={() => {
                  setComponentName("My Applications");
                }}
                className={
                  componentName == "My Applications"
                    ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600  hover:text-white p-1 "
                    : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
                }
              >
                My Applications
              </li>
            )}
            <li
              onClick={() => setShowConfirm(true)}
              className="hover:text-white hover:bg-red-500 p-1 hover:cursor-pointer "
            >
              Logout
            </li>
          </ul>
        </div>
        {/* End desktop Screen */}

        <div className={showMenu ? "flex flex-col md:hidden" : "hidden"}>
          <ul className="sidebar-links flex flex-col gap-4">
            <li
              onClick={() => {
                setShowMenu(!showMenu);
                setComponentName("My Profile");
              }}
              className={
                componentName == "My Profile"
                  ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600 hover:text-white p-1 "
                  : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
              }
            >
              My Profile
            </li>
            <li
              onClick={() => {
                setShowMenu(!showMenu);
                setComponentName("Update Profile");
              }}
              className={
                componentName == "Update Profile"
                  ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600 hover:text-white p-1 "
                  : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
              }
            >
              Update Profile
            </li>
            <li
              onClick={() => {
                setShowMenu(!showMenu);
                setComponentName("Update Password");
              }}
              className={
                componentName == "Update Password"
                  ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600 hover:text-white p-1 "
                  : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
              }
            >
              Update Password
            </li>

            {user && user.role === "Employer" && (
              <li
                onClick={() => {
                  setShowMenu(!showMenu);
                  setComponentName("Job Post");
                }}
                className={
                  componentName == "Job Post"
                    ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600  hover:text-white p-1 "
                    : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
                }
              >
                Post New Job
              </li>
            )}
            {user && user.role === "Employer" && (
              <li
                onClick={() => {
                  setShowMenu(!showMenu);
                  setComponentName("My Jobs");
                }}
                className={
                  componentName == "My Jobs"
                    ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600 hover:text-white p-1 "
                    : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
                }
              >
                My Jobs
              </li>
            )}
            {user && user.role === "Employer" && (
              <li
                onClick={() => {
                  setShowMenu(!showMenu);
                  setComponentName("Applications");
                }}
                className={
                  componentName == "Applications"
                    ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600 hover:text-white p-1 "
                    : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
                }
              >
                Applications
              </li>
            )}
            {user && user.role === "Job Seeker" && (
              <li
                onClick={() => {
                  setShowMenu(!showMenu);
                  setComponentName("My Applications");
                }}
                className={
                  componentName == "My Applications"
                    ? "text-white bg-sky-600 hover:cursor-pointer hover:bg-sky-600  hover:text-white p-1 "
                    : " hover:bg-sky-600 hover:cursor-pointer hover:text-white p-1 "
                }
              >
                My Applications
              </li>
            )}
            <li
              onClick={() => setShowConfirm(true)}
              className="hover:text-white hover:bg-red-500 p-1 hover:cursor-pointer"
            >
              Log Out
            </li>
          </ul>
        </div>
        <div
          className={
            showMenu
              ? "hidden md:flex"
              : "flex h-auto py-5 w-full sm:w-[600px] md:w-[70%]"
          }
        >
          {componentsMap[componentName] || <MyProfile />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
