import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoHomeOutline, IoExitOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

const DropdownWithLinks = ({ user }) => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleNavigation = (path) => {
    setIsOpen(false); // Close dropdown after selection
    navigate(path); // Navigate to selected route
  };

  const handleCancel = () => {
    setShowConfirm(false); // Close the confirmation dialog
  };

  return (
    <div ref={dropdownRef} className="relative">
      {showConfirm && (
        <div className="fixed top-0 left-0 z-20 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="p-4 bg-white shadow-lg">
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 px-3 py-1 hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex p-2 w-[200px] md:w-[300px] break-words items-center justify-between border-2 rounded border-gray-100 bg-gray-50"
      >
        {user.name || "Profile"}
        <IoMdArrowDropdown className={isOpen ? "rotate-180" : ""} />
      </button>

      {isOpen && (
        <div 
        onMouseLeave={()=>{
          setIsOpen(false);
        }}
        className="flex flex-col w-[200px] md:w-[300px] absolute z-10 overflow-hidden mt-2 bg-gray-50 border border-gray-100 rounded">
          <div className="flex flex-col p-2 gap-1 border-b-2 border-black">
            <p className="font-[500] break-words">{user.name || "Profile"}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
          <div
            onClick={() => handleNavigation("/")}
            className="flex gap-2 items-center p-2 cursor-pointer hover:bg-sky-600 hover:text-white"
          >
            <IoHomeOutline /> Home
          </div>
          <hr />
          <div
            onClick={() => handleNavigation("/dashboard")}
            className="flex gap-2 items-center p-2 cursor-pointer hover:bg-sky-600 hover:text-white"
          >
            <RxDashboard /> Dashboard
          </div>
          <hr />
          <div
            onClick={() => setShowConfirm(true)}
            className="flex gap-2 items-center p-2 cursor-pointer hover:bg-red-500 hover:text-white"
          >
            <IoExitOutline /> Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownWithLinks;
