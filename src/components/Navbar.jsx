import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GrLogin } from "react-icons/gr";
import DropdownWithLinks from "./DropdownWithLinks";
const Navbar = () => {
  const navigateTo = useNavigate();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  if(loading){
    return;
  }
  return (
    <div className="sticky top-0 z-10 h-auto bg-white flex justify-between items-center mb-5 pb-5 px-1">
      <img
        onClick={() => {
          navigateTo("/");
        }}
        src="/KaamSetu.png"
        alt="JobxNepal.com"
        className="w-[75px] h-[60px] md:w-[120px] md:h-[100px]"
      />
      <div className="flex gap-8 items-center">
        {isAuthenticated ? (
          <DropdownWithLinks user={user} />
        ) : (
          <Link
            to={"/login"}
            className="bg-sky-600 rounded flex items-center gap-2 hover:cursor-pointer text-white px-4 py-2  "
          >
            <GrLogin />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
