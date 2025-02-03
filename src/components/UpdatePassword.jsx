import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearAllUpdateProfileErrors,
  updatePassword,
} from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
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

  const handleUpdatePassword = () => {
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
    <div className="flex flex-col md:w-[80%] w-full gap-4">
      {/* Old Password */}
      <label className="text-xl">Current Password</label>
      <div className="flex border-2 justify-between bg-white">
        <input
          type={showOldPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="pl-2 w-full border-2 border-black border-r-0"
        />
        {showOldPassword ? (
          <IoEyeOutline
            className="text-3xl p-1 text-white bg-sky-600"
            onClick={() => setShowOldPassword(!showOldPassword)}
          />
        ) : (
          <IoEyeOffOutline
            className="text-3xl p-1 text-white bg-sky-600"
            onClick={() => setShowOldPassword(!showOldPassword)}
          />
        )}
      </div>

      {/* New Password */}
      <label className="text-xl">New Password</label>
      <div className="flex justify-between bg-white">
        <input
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="pl-2 w-full border-2 border-black border-r-0"
        />
        {showNewPassword ? (
          <IoEyeOutline
            className="text-3xl p-1 text-white bg-sky-600"
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        ) : (
          <IoEyeOffOutline
            className="text-3xl p-1 text-white bg-sky-600"
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        )}
      </div>

      {/* Confirm Password */}
      <label className="text-xl">Confirm Password</label>
      <div className="flex justify-between bg-white">
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="pl-2 border-2 w-full border-black border-r-0"
        />
        {showConfirmPassword ? (
          <IoEyeOutline
            className="text-3xl p-1 text-white bg-sky-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        ) : (
          <IoEyeOffOutline
            className="text-3xl p-1 text-white bg-sky-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        )}
      </div>

      <button
        className="bg-sky-600 rounded w-full hover:cursor-pointer text-center text-white py-2"
        onClick={handleUpdatePassword}
        disabled={loading}
      >
        Update Password
      </button>
    </div>
  );
};

export default UpdatePassword;
