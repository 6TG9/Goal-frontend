import React from "react";
import ladda from "../assets/amico.png";

const NewGoal = () => {
  return (
    <div className="flex items-start gap-[20px] mx-[100px] my-[48px]">
      <form className="flex flex-col items-start w-[656px] bg-[#0585cd29] p-[60px_50px] gap-[66px]">
        <input
          type="text"
          placeholder="Goal Title"
          className="w-[329px] p-[15px_10px] rounded-[5px] border border-[#0585cd] bg-[#0585cd05] placeholder:font-montserrat placeholder:font-normal placeholder:text-[16px] placeholder:text-black/70"
        />
        <textarea
          rows="15"
          placeholder="Goal Description"
          className="w-[556px] p-[15px_10px] rounded-[5px] border border-[#0585cd] bg-[#0585cd05] placeholder:font-montserrat placeholder:font-normal placeholder:text-[16px] placeholder:text-black/70"
        />
        <input
          type="number"
          placeholder="Goal Progress"
          className="w-[329px] p-[15px_10px] rounded-[5px] border border-[#0585cd] bg-[#0585cd05] placeholder:font-montserrat placeholder:font-normal placeholder:text-[16px] placeholder:text-black/70"
        />
        <button
          type="submit"
          className="bg-[#0585cd] p-[16px] rounded-[10px] font-montserrat font-semibold text-[20px] text-white cursor-pointer"
        >
          Create Goal
        </button>
      </form>
      <span>
        <img src={ladda} alt="Illustration" />
      </span>
    </div>
  );
};

export default NewGoal;
