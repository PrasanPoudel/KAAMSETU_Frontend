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

  const { user } = useSelector((state) => state.user);
  const [isDemoAccount, setIsDemoAccount] = useState(false);
  useEffect(() => {
    setIsDemoAccount(
      user?.name === "Demo Employer" || user?.name === "Demo Job Seeker"
    );
  }, [user]);

  if (isDemoAccount) {
    console.log("It is a Demo Account");
  }
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
    <div className="flex flex-col w-full gap-4 md:w-[80%]">
      {/* Current Password */}
      <label className="text-xl ">Current Password</label>
      <div className="flex rounded-md px-2 border-2 border-black items-center justify-between bg-white">
        <input
          type={showOldPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="pl-2 w-full"
        />
        {showOldPassword ? (
          <IoEyeOutline
            className="text-4xl"
            onClick={() => setShowOldPassword(!showOldPassword)}
          />
        ) : (
          <IoEyeOffOutline
            className="text-4xl"
            onClick={() => setShowOldPassword(!showOldPassword)}
          />
        )}
      </div>

      {/* New Password */}
      <label className="text-xl ">New Password</label>
      <div className="flex rounded-md px-2 border-2 border-black items-center justify-between bg-white">
        <input
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="pl-2 w-full"
        />
        {showNewPassword ? (
          <IoEyeOutline
            className="text-4xl"
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        ) : (
          <IoEyeOffOutline
            className="text-4xl"
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        )}
      </div>

      {/* Confirm Password */}
      <label className="text-xl ">Confirm Password</label>
      <div className="flex rounded-md px-2 border-2 border-black items-center justify-between">
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="pl-2 w-full"
        />
        {showConfirmPassword ? (
          <IoEyeOutline
            className="text-4xl"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        ) : (
          <IoEyeOffOutline
            className="text-4xl"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        )}
      </div>

      {!isDemoAccount ? (
        <button
          className=" text-xl rounded-md w-full hover:cursor-pointer text-center bg-sky-600 hover:bg-sky-700 text-white  md:px-2 px-1   py-2"
          onClick={handleUpdatePassword}
          disabled={loading}
        >
          Update Password
        </button>
      ) : (
        <div
          className=" text-xl rounded-md w-full hover:cursor-pointer text-center bg-sky-600 hover:bg-sky-700 text-white  md:px-2 px-1   py-2"
          onClick={() => {
            toast.info("Demo Account Cannot Update Password");
          }}
        >
          Update Password
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
