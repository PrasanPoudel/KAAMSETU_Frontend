import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
  const { isAuthenticated , loading } = useSelector((state) => state.user);
  if(loading){
    return;
  }
  return (
    <>
      <footer className="flex flex-col w-full border-t-2 border-t-black gap-5 justify-between mt-5 py-5 h-auto md:flex-row md:gap-0 ">
        <div className="flex flex-col gap-1">
          <img
            src="/KaamSetu.png"
            className="h-[75px] w-[100px] md:h-[100px] md:w-[125px]"
          />
          <p className="md:w-[300px] w-[250px] text-justify">
            <span className="font-[500] text-xl">KaamSetu</span> is a
            Nepal-based job portal that connects job seekers with employers,
            simplifying the job search and hiring process.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <h4 className="text-xl">Support</h4>
          <ul>
            <li className="flex items-center gap-2">
              <MdOutlineLocationOn />
              <span>Butwal, Nepal</span>
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineMail />
              <span>prasanpoudel***@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MdOutlinePhone />
              <span>+977 98********</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-8">
          <h4 className="text-xl">Quick Links</h4>
          <ul>
            <li>
              <Link to={"/"} className="underline">
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to={"/dashboard"} className="underline">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-8">
          <h4 className="text-xl">Follow Us</h4>
          <ul>
            <li>
              <Link to={"/"} className="flex items-center gap-2">
                <span>
                  <FaSquareXTwitter />
                </span>
                <span>Twitter (X)</span>
              </Link>
            </li>
            <li>
              <Link to={"/"} className="flex items-center gap-2">
                <span>
                  <FaSquareInstagram />
                </span>
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link to={"/"} className="flex items-center gap-2">
                <span>
                  <FaYoutube />
                </span>
                <span>Youtube</span>
              </Link>
            </li>
            <li>
              <Link to={"/"} className="flex items-center gap-2">
                <span>
                  <FaLinkedin />
                </span>
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="flex  pb-5 text-gray-500 justify-center w-100 text-center">
        &copy; CopyRight 2024. All Rights Reserved By Prasan Poudel.
      </div>
    </>
  );
};

export default Footer;
