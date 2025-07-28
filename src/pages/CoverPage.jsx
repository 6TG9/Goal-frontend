import React from "react";
import { Link } from "react-router-dom";
import girl from "../assets/bro.png";

const CoverPage = () => {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-[146px] mx-[100px] my-[58px]">
      <img src={girl} alt="Illustration" />

      <div className="text-start flex flex-col gap-[25px] items-start">
        <h1 className="font-montserrat font-semibold text-[36px] leading-[43.88px] text-black m-0">
          Improve Productivity By Managing{" "}
          <span className="text-[#0585cd]">Your Goals</span>
        </h1>

        <p className="font-montserrat font-normal text-[20px] leading-[24.38px] tracking-[2%] text-black/80 m-0">
          Lorem ipsum dolor sit amet consectetur. Ut nisl nisl cursus massa sed.
          Turpis ac aliquet lacinia justo turpis amet at arcu. Diam vulputate
          suspendisse aliquam enim sagittis cursiodio ultrices. Condimentum
          lacus nunc rhoncus massa. Tortorstiu ultricies neque aliquam sit non.
          Diam vehicula dignissimepei pellentesque eros vitae. Viverra in vitae
          nunc lorem eget lciou imperdiet tortor. Ac mauris vel non amet eget
          egestas inoriou pellentesque commodo amet. Facilisi sed ut nisi
          pellentesque diam egestas et turpis donor amet.
        </p>

        <Link
          to="/allgoals"
          className="no-underline p-[16px] rounded-[10px] bg-[#0585cd] font-montserrat font-semibold text-[20px] text-white cursor-pointer"
        >
          Manage Goals
        </Link>
      </div>
    </div>
  );
};

export default CoverPage;
