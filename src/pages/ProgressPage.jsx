// pages/ProgressPage.js
import React from "react";
import ladda from "../assets/amico.png";

const ProgressPage = () => {
  return (
    <div className="newgoal my-[48px] mx-[100px] flex items-start gap-5">
      <form className="new-forms text-left">
        <h2 className="font-bold text-4xl text-black m-0">Progress</h2>

        <div className="uper-form mt-6">
          <div className="goal-t mb-4">
            <h4 className="text-base font-normal text-black/70">Goal Title</h4>
            <p className="text-base font-semibold text-black">
              Landing Page Design
            </p>
          </div>

          <div className="goal-d">
            <h4 className="text-base font-normal text-black/70">
              Goal Description
            </h4>
            <p className="text-base font-normal text-black leading-[19.5px]">
              Lorem ipsum dolor sit amet consectetur. Accumsan integer tempor
              ornare lectus eu. Leo amet bibendum consectetur sed ac leo
              rhoncus. Mattis mi iaculis lacus mi vehicula. Nisl nisi eu eu
              suspendisse. Pellentesque convallis egestas purus amet. Massa eget
              proin lorem ultrices nulla quisque. Leo mauris cras mi proin et.
            </p>
          </div>
        </div>

        <div className="lower-form flex flex-col items-start w-[656px] bg-[#0585cd29] p-[60px_50px] gap-[66px]">
          <input
            type="number"
            placeholder="Goal Progress"
            className="w-[329px] px-[10px] py-[15px] rounded-[5px] border border-[#0585cd] bg-[#0585cd05] placeholder:text-black/70"
          />

          <div className="progress w-[368px] flex flex-col items-start gap-3">
            <div className="progress-text flex items-start gap-[265px]">
              <p className="m-0 text-base font-normal text-black/80">
                Progress
              </p>
              <p className="m-0 text-base font-normal text-black/80">30%</p>
            </div>
            <div className="loader-con bg-[#d9d9d9] w-full h-3 rounded-[10px]">
              <div className="loader-bar h-3 rounded-[10px] w-[30%] bg-red-500/80"></div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#0585cd] px-4 py-4 rounded-[10px] text-white font-semibold text-xl cursor-pointer"
          >
            Update Progress
          </button>
        </div>
      </form>

      <span>
        <img src={ladda} alt="" />
      </span>
    </div>
  );
};

export default ProgressPage;
