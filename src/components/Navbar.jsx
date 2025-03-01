import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import DropdownWithLinks from "./DropdownWithLinks";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose, IoHomeOutline } from "react-icons/io5";
import { LuLetterText } from "react-icons/lu";
import { TfiWrite } from "react-icons/tfi";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdOutlineFindInPage } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import KaamSetu from "../images/KaamSetu.png";
import { IoIosLogIn } from "react-icons/io";

const Navbar = () => {
  const navigateTo = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showSidebar]);
if(!user || !isAuthenticated){
  return;
}
  return (
    <div className="sticky top-0 w-full z-20 h-auto bg-white border-gray-100 flex justify-between items-center">
      <img
        onClick={() => {
          navigateTo("/");
        }}
        src={KaamSetu}
        alt="KaamSetu Logo"
        className="w-[100px] h-[80px] cursor-pointer mix-blend-multiply md:w-[120px] md:h-[100px]"
        loading="lazy"
      />
      {isAuthenticated && (
        <div className="gap-2 hidden xl:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                isActive
                  ? "bg-sky-600 hover:bg-sky-700 text-white"
                  : "hover:bg-sky-700"
              }`
            }
          >
            <IoHomeOutline className="text-xl" />{" "}
            <span className="font-medium">Home</span>
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `flex gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                isActive
                  ? "bg-sky-600 hover:bg-sky-700 text-white"
                  : "hover:bg-sky-700"
              }`
            }
          >
            <MdOutlineFindInPage className="text-2xl" />{" "}
            <span className="font-medium">Find Jobs</span>
          </NavLink>
          <NavLink
            to="/sendmessage"
            className={({ isActive }) =>
              `flex gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                isActive
                  ? "bg-sky-600 hover:bg-sky-700 text-white"
                  : "hover:bg-sky-700"
              }`
            }
          >
            <FaRegMessage className="text-xl" />{" "}
            <span className="font-medium">Send Message</span>
          </NavLink>
          {user?.role === "Employer" && (
            <NavLink
              to="/dashboard/Job Post"
              className={({ isActive }) =>
                `flex gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                  isActive
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "hover:bg-sky-700"
                }`
              }
            >
              <TfiWrite className="text-xl" />{" "}
              <span className="font-medium">Post A New Job</span>
            </NavLink>
          )}

          {user?.role === "Employer" && (
            <NavLink
              to="/dashboard/My Jobs"
              className={({ isActive }) =>
                `flex gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                  isActive
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "hover:bg-sky-700"
                }`
              }
            >
              <IoBriefcaseOutline className="text-xl" />{" "}
              <span className="font-medium">My Posted Jobs</span>
            </NavLink>
          )}

          {user?.role === "Employer" && (
            <NavLink
              to="/dashboard/Applications"
              className={({ isActive }) =>
                `flex gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                  isActive
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "hover:bg-sky-700"
                }`
              }
            >
              <LuLetterText className="text-xl" />{" "}
              <span className="font-medium">Jobs Seeker's Applications</span>
            </NavLink>
          )}

          {user?.role === "Job Seeker" && (
            <NavLink
              to="/dashboard/My Applications"
              className={({ isActive }) =>
                `flex gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                  isActive
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "hover:bg-sky-700"
                }`
              }
            >
              <LuLetterText className="text-xl" />
              <span className="font-medium">My Applications</span>
            </NavLink>
          )}
        </div>
      )}

      <div className="flex items-center gap-10">
        {!isAuthenticated && (
          <NavLink
            to={"/login"}
            className="text-xl gap-2 flex items-center px-2 py-1 text-white bg-sky-600 justify-center rounded-md"
          >
            <IoIosLogIn className="text-xl" />
            Login
          </NavLink>
        )}
        {isAuthenticated && (
          <>
            <DropdownWithLinks user={user} />
            {!showSidebar && (
              <RxHamburgerMenu
                className="text-4xl xl:hidden"
                onClick={() => {
                  setShowSidebar(!showSidebar);
                }}
              />
            )}
          </>
        )}
      </div>

      {/* For Sidebar */}
      {showSidebar && (
        <div className="fixed z-20 top-0 right-0 h-[100vh] overflow-y-auto w-[100%] bg-opacity-50 bg-black">
          <div className="bg-white fixed top-0 right-0 w-full md:w-[40%] lg:w-[30%] xl:w-[25%] min-h-full px-2">
            <div className="flex justify-end">
              <IoClose
                className="text-4xl mr-2 mt-5 mb-5"
                onClick={() => setShowSidebar(!showSidebar)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <NavLink
                onClick={() => setShowSidebar((prev) => !prev)}
                to="/"
                className={({ isActive }) =>
                  `flex font-medium gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                    isActive
                      ? "bg-sky-600 hover:bg-sky-700 text-white"
                      : "hover:bg-sky-700"
                  }`
                }
              >
                <IoHomeOutline className="text-xl" /> Home
              </NavLink>

              <NavLink
                onClick={() => setShowSidebar((prev) => !prev)}
                to="/jobs"
                className={({ isActive }) =>
                  `flex font-medium gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                    isActive
                      ? "bg-sky-600 hover:bg-sky-700 text-white"
                      : "hover:bg-sky-700"
                  }`
                }
              >
                <MdOutlineFindInPage className="text-2xl" /> Find Jobs
              </NavLink>
              {isAuthenticated && (
                <NavLink
                  onClick={() => setShowSidebar((prev) => !prev)}
                  to="/sendmessage"
                  className={({ isActive }) =>
                    `flex font-medium gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                      isActive
                        ? "bg-sky-600 hover:bg-sky-700 text-white"
                        : "hover:bg-sky-700"
                    }`
                  }
                >
                  <FaRegMessage className="text-xl" /> Send Message
                </NavLink>
              )}

              {user?.role === "Employer" && (
                <NavLink
                  onClick={() => setShowSidebar((prev) => !prev)}
                  to="/dashboard/Job Post"
                  className={({ isActive }) =>
                    `flex font-medium gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                      isActive
                        ? "bg-sky-600 hover:bg-sky-700 text-white"
                        : "hover:bg-sky-700"
                    }`
                  }
                >
                  <TfiWrite className="text-xl" /> Post A New Job
                </NavLink>
              )}

              {user?.role === "Employer" && (
                <NavLink
                  onClick={() => setShowSidebar((prev) => !prev)}
                  to="/dashboard/My Jobs"
                  className={({ isActive }) =>
                    `flex font-medium gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                      isActive
                        ? "bg-sky-600 hover:bg-sky-700 text-white"
                        : "hover:bg-sky-700"
                    }`
                  }
                >
                  <IoBriefcaseOutline className="text-xl" /> My Posted Jobs
                </NavLink>
              )}

              {user?.role === "Employer" && (
                <NavLink
                  onClick={() => setShowSidebar((prev) => !prev)}
                  to="/dashboard/Applications"
                  className={({ isActive }) =>
                    `flex font-medium gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                      isActive
                        ? "bg-sky-600 hover:bg-sky-700 text-white"
                        : "hover:bg-sky-700"
                    }`
                  }
                >
                  <LuLetterText className="text-xl" /> Jobs Seeker's
                  Applications
                </NavLink>
              )}

              {user?.role === "Job Seeker" && (
                <NavLink
                  onClick={() => setShowSidebar((prev) => !prev)}
                  to="/dashboard/My Applications"
                  className={({ isActive }) =>
                    `flex font-medium gap-2 items-center p-2 cursor-pointer rounded-md hover:text-white ${
                      isActive
                        ? "bg-sky-600 hover:bg-sky-700 text-white"
                        : "hover:bg-sky-700"
                    }`
                  }
                >
                  <LuLetterText className="text-2xl" /> My Applications
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
