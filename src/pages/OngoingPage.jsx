import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pen from "../assets/pen.png";
import can from "../assets/can.png";
import { toast, ToastContainer } from "react-toastify";

const Spinner = () => (
  <div className="flex flex-col justify-center items-center h-screen">
    <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-blue-600 text-base md:text-lg font-medium">
      Loading goal...
    </p>
  </div>
);

const OngoingPage = () => {
  const [ongoingGoals, setOngoingGoals] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchOngoingGoals = async () => {
    try {
      const getOngoingGoals = await fetch(
        "https://goal-backend-ip4r.onrender.com/api/goals/ongoing"
      );
      const oGoaalB = await getOngoingGoals.json();
      setOngoingGoals(oGoaalB);
    } catch (error) {
      console.log("I MADE A MISTAKE");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchOngoingGoals();
  }, []);

  if (initialLoading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://goal-backend-ip4r.onrender.com/api/goals/${id}/delete`,
        { method: "DELETE" }
      );
      toast.success("Goal deleted successfully!");
      fetchOngoingGoals();
    } catch (error) {
      toast.error("Failed to delete goal.");
    }
  };

  return (
    <div className="mx-4 md:mx-[100px] my-6 md:my-[32px]">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Title + Create Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="font-montserrat font-bold text-[28px] md:text-[36px] text-black m-0">
          Ongoing
        </h2>

        <Link
          to="/newgoal"
          className="no-underline font-montserrat font-semibold text-[18px] md:text-[20px] text-[#0585cd]"
        >
          + Create New Goals
        </Link>
      </div>

      {/* Goals List */}
      <div className="mt-6 md:mt-[40px] flex flex-col gap-10 md:gap-[60px]">
        {ongoingGoals.map((ongoingGoal) => (
          <div
            className="text-start px-4 md:px-[35px] pt-4 md:pt-[24px] pb-8 md:pb-[50px] shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex flex-col gap-4 md:gap-[35px]"
            key={ongoingGoal._id}
          >
            {/* Title & Description */}
            <div className="flex flex-col gap-2 md:gap-[12px]">
              <h3 className="font-montserrat font-semibold text-[22px] md:text-[28px] text-black m-0 break-words">
                {ongoingGoal.tittle}
              </h3>

              <h4 className="font-montserrat font-semibold text-[16px] md:text-[20px] text-[#0585cd] m-0">
                In Progress
              </h4>

              <p className="font-montserrat font-normal text-[16px] md:text-[20px] leading-[22px] md:leading-[24.38px] text-black/80 m-0 break-words">
                {ongoingGoal.description}
              </p>
            </div>

            {/* Progress + Buttons */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
              {/* Progress Bar */}
              <div className="w-full md:w-[368px] flex flex-col items-start gap-2">
                <div className="flex justify-between w-full">
                  <p className="font-montserrat text-[14px] md:text-[16px] text-black/80">
                    Progress
                  </p>
                  <p className="font-montserrat text-[14px] md:text-[16px] text-black/80">
                    {ongoingGoal.progress}%
                  </p>
                </div>

                <div className="w-full bg-[#d9d9d9] h-[10px] md:h-[12px] rounded-[10px]">
                  <div
                    className="h-full rounded-[10px]"
                    style={{
                      width: `${ongoingGoal.progress}%`,
                      backgroundColor:
                        ongoingGoal.progress < 50 ? "#ff0000cc" : "#339933",
                    }}
                  ></div>
                </div>
              </div>

              {/* Buttons */}
              <div className="w-full md:w-fit flex flex-col md:flex-row gap-4 md:gap-[100px]">
                <Link
                  to={`/progress/${ongoingGoal._id}`}
                  className="flex items-center justify-center gap-2 md:gap-[10px] rounded-[10px] p-3 md:p-[16px] bg-[#0585cd]"
                >
                  <img src={pen} alt="Update icon" className="w-5 md:w-auto" />
                  <p className="font-montserrat font-semibold text-[16px] md:text-[20px] text-white m-0">
                    Update Progress
                  </p>
                </Link>

                <button
                  onClick={() => handleDelete(ongoingGoal._id)}
                  className="flex items-center justify-center gap-2 md:gap-[10px] rounded-[10px] p-3 md:p-[16px] bg-white border border-[#0585cd]"
                >
                  <img src={can} alt="Delete icon" className="w-5 md:w-auto" />
                  <p className="font-montserrat font-semibold text-[16px] md:text-[20px] text-[#0585cd] m-0">
                    Delete
                  </p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingPage;
