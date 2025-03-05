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
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  if (loading) {
    return;
  }
  return (
    <div className="bg-img pt-10">
      <div className="flex flex-col w-full border-t-2 border-gray-100 gap-5 py-5 justify-between h-auto md:flex-row md:gap-0 ">
        <div className="flex flex-col gap-8">
          <h4 className="text-xl ">Support</h4>
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

        {isAuthenticated && (
          <div className="flex flex-col gap-8">
            <h4 className="text-xl ">Quick Links</h4>
            <ul>
              <li>
                <Link to={"/"} className="underline">
                  Home
                </Link>
              </li>

              <li>
                <Link to={"/jobs"} className="underline">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to={"/sendmessage"} className="underline">
                  Send Message
                </Link>
              </li>
            </ul>
          </div>
        )}
        <div className="flex flex-col gap-8">
          <h4 className="text-xl ">Follow Us</h4>
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
      </div>
      <div className="flex  pb-5 text-gray-500 justify-center w-full text-center">
        &copy; CopyRight 2024. All Rights Reserved By Prasan Poudel.
      </div>
    </div>
  );
};

export default Footer;
