import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../store/slices/userSlice";
import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import unknownProfile from "../images/unknown.png";

const DropdownWithLinks = ({ user }) => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);
  // Ref for the dropdown container
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Attach event listener to detect outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };
  const handleCancel = () => {
    setShowConfirm(false); // Close the confirmation dialog
  };

  return (
    <>
      {showConfirm && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 mx-2 bg-white  rounded-md">
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 rounded-md cursor-pointer text-white px-3 py-2"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-100 rounded-md cursor-pointer px-3 py-2 hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center p-1 hover:bg-sky-100 mr-[-5px] rounded-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white rounded-full w-[40px] h-[40px]"
        >
          {user.profilePicture ? (
            <img
              src={user.profilePicture.url}
              alt="user image"
              className="rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <img
              src={unknownProfile}
              alt="user image"
              className="rounded-full object-cover"
              loading="lazy"
            />
          )}
        </button>
        {isOpen && (
          <div className="fixed z-30 top-0 right-0 h-[100vh] overflow-y-auto w-[100%] bg-opacity-50 bg-black">
            <div
              ref={dropdownRef}
              className="flex flex-col pb-5 fixed md:top-[110px]  md:right-[100px] h-full md:h-auto w-full md:w-[400px] bg-white rounded-md  px-2  border-2"
            >
              <div className="flex justify-end">
                <IoClose
                  className="text-4xl mr-2 mt-5 mb-5"
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
              <div className="flex flex-col justify-center items-center py-1 gap-1">
                <div className="w-[75px] h-[75px]">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture.url}
                      alt="user image"
                      className="rounded-full object-cover hover:bg-sky-100"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={unknownProfile}
                      alt="user image"
                      className="rounded-full object-cover hover:bg-sky-100"
                      loading="lazy"
                    />
                  )}
                </div>
                <p className="break-words font-medium text-xl">
                  <span>Hi,</span> {user.name} !
                </p>
                <p className="break-words underline text-sm text-center">
                  {user.email}
                </p>
                <p className="text-sm">{user.role}</p>
              </div>
              <div className="flex flex-col pt-5 gap-2">
                <Link
                  to={"/dashboard/Update Profile"}
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex gap-2 items-center p-2 cursor-pointer hover:bg-sky-700 rounded-md  hover:text-white"
                >
                  <FaRegUser className="text-xl" /> Update Profile
                </Link>
                <Link
                  to={"/dashboard/Update Password"}
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex gap-2 items-center p-2 cursor-pointer hover:bg-sky-700 rounded-md  hover:text-white"
                >
                  <TbLockPassword className="text-xl" /> Update Password
                </Link>
                <div
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setShowConfirm(true);
                  }}
                  className="flex gap-2 items-center p-2 cursor-pointer hover:bg-red-600 rounded-md  hover:text-white"
                >
                  <IoMdExit className="text-xl" /> Logout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownWithLinks;
