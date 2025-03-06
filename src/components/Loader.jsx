import React from "react";

const Loader = ({ size = 40 }) => {
  return (
    <>
    <div className="flex justify-center w-full items-center min-h-[525px]">
    <div
      className="animate-spin rounded-full  border-4 border-gray-200 border-r-transparent"
      style={{
        width: size,
        height: size,
        borderRightColor: "transparent",
      }}
      role="status"
    />
    </div>
    </>
  );
};

export default Loader;
