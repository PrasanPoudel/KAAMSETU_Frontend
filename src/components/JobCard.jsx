import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const JobCard = ({ element }) => {
  const navigateTo = useNavigate();
  return (
    <div
      className="p-4 rounded-lg bg-gray-50 hover:bg-sky-100 outline-none flex flex-col h-auto hover:cursor-pointer"
      onClick={() => {
        navigateTo(`/post/application/${element._id}`);
      }}
    >
      <div className="flex gap-5 items-center pb-5">
        {element.companyLogo ? (
          <img
            src={element.companyLogo.url}
            className="h-[50px] w-[50px] rounded-[20%]"
          />
        ) : (
         ""
        )}
        <div>
          <p className="font-[500]">{element.title}</p>
          <p className="text-sm">in <span className="text-sm text-gray-500">{element.companyName}</span></p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <MdOutlineLocationOn />
        <p className="text-gray-500 text-sm">{element.location}</p>
      </div>
      <div className="flex items-center gap-1">
        <TbCurrencyRupeeNepalese />
        <p className="text-gray-500 text-sm">{element.salary} per year</p>
      </div>
      <div className="flex gap-1 items-center">
        Posted On:
        <p className="text-gray-500 text-sm">
          {element.jobPostedOn.substring(0, 10)}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
