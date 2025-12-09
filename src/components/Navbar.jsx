import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Frame 1.png";
import profile from "../assets/Ellipse 2.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex items-center justify-between px-[100px] py-[7px] border-b border-black/20 
      max-md:px-4"
    >
      {/* LEFT — Hamburger + Logo (mobile) */}
      <div className="flex items-center gap-4 md:hidden">

        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-[120px]" />
        </Link>
      </div>

      {/* LEFT — Logo (desktop) */}
      <Link to="/" className="hidden md:block">
        <img src={logo} alt="Logo" />
      </Link>

      {/* CENTER NAV LINKS — visible only on desktop */}
      <div className="w-[391px] hidden md:flex items-center justify-between">
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

      {/* RIGHT — Profile Image */}
      <div className="relative">
        <img
          src={profile}
          alt="Profile"
          className="cursor-pointer w-[45px]"
          onClick={() => setOpen(!open)}
        />

        {/* MOBILE DROPDOWN LINKS */}
        {open && (
          <div
            className="absolute right-0 mt-2 bg-white border border-black/20 rounded-lg w-[160px] 
            shadow-md flex flex-col p-2 md:hidden"
          >
            <Link
              to="/ongoing"
              className="py-2 px-3 text-black font-montserrat font-semibold"
              onClick={() => setOpen(false)}
            >
              Ongoing
            </Link>
            <Link
              to="/complete"
              className="py-2 px-3 text-black font-montserrat font-semibold"
              onClick={() => setOpen(false)}
            >
              Completed
            </Link>
            <Link
              to="/allgoals"
              className="py-2 px-3 text-black font-montserrat font-semibold"
              onClick={() => setOpen(false)}
            >
              All Goals
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
