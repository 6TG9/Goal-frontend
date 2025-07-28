import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Frame 1.png";
import profile from "../assets/Ellipse 2.png";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-[100px] py-[7px] border-b border-black/20">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>

      <div className="w-[391px] flex items-center justify-between">
        <Link
          to="/ongoing"
          className="no-underline font-montserrat font-semibold text-[20px] text-black cursor-pointer"
        >
          Ongoing
        </Link>
        <Link
          to="/complete"
          className="no-underline font-montserrat font-semibold text-[20px] text-black cursor-pointer"
        >
          Completed
        </Link>
        <Link
          to="/allgoals"
          className="no-underline font-montserrat font-semibold text-[20px] text-black cursor-pointer"
        >
          All Goals
        </Link>
      </div>

      <img src={profile} alt="Profile" />
    </div>
  );
};

export default Navbar;
