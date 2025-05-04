import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearAllUpdateProfileErrors,
  updatePassword,
} from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const { user } = useSelector((state) => state.user);
  const [isDemoAccount, setIsDemoAccount] = useState(false);
  useEffect(() => {
    setIsDemoAccount(
      user?.name === "Demo Employer" || user?.name === "Demo Job Seeker"
    );
  }, [user]);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Update Password
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Change your password to keep your account secure
        </p>

        <form onSubmit={handleUpdatePassword} className="space-y-6">
          {/* Current Password */}
          <div className="form-group">
            <label className="block text-gray-700 mb-2 font-medium text-sm">
              Current Password
            </label>
            <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
              <div className="flex items-center w-full">
                <RiLockPasswordLine className="text-lg text-gray-500 mr-2" />
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full h-full focus:outline-none text-base py-3"
                  placeholder="Enter your current password"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="focus:outline-none"
              >
                {showOldPassword ? (
                  <IoEyeOutline className="text-lg text-gray-500 cursor-pointer" />
                ) : (
                  <IoEyeOffOutline className="text-lg text-gray-500 cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="form-group">
            <label className="block text-gray-700 mb-2 font-medium text-sm">
              New Password
            </label>
            <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
              <div className="flex items-center w-full">
                <RiLockPasswordLine className="text-lg text-gray-500 mr-2" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-full focus:outline-none text-base py-3"
                  placeholder="Enter your new password"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="focus:outline-none"
              >
                {showNewPassword ? (
                  <IoEyeOutline className="text-lg text-gray-500 cursor-pointer" />
                ) : (
                  <IoEyeOffOutline className="text-lg text-gray-500 cursor-pointer" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Password should be at least 8 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="block text-gray-700 mb-2 font-medium text-sm">
              Confirm Password
            </label>
            <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
              <div className="flex items-center w-full">
                <RiLockPasswordLine className="text-lg text-gray-500 mr-2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-full focus:outline-none text-base py-3"
                  placeholder="Confirm your new password"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="focus:outline-none"
              >
                {showConfirmPassword ? (
                  <IoEyeOutline className="text-lg text-gray-500 cursor-pointer" />
                ) : (
                  <IoEyeOffOutline className="text-lg text-gray-500 cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            {!isDemoAccount ? (
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 cursor-pointer text-base rounded-lg font-medium w-full text-white py-3"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-600 cursor-not-allowed flex items-center justify-center gap-2 text-base rounded-lg font-medium w-full py-3"
                  onClick={() => {
                    toast.info("Demo Account Cannot Update Password");
                  }}
                >
                  Demo Account (Cannot Update)
                </button>
                <p className="text-xs text-center text-red-500">
                  Password updates are disabled for demo accounts
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
