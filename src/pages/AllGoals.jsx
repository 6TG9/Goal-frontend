import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pen from "../assets/pen.png";
import can from "../assets/can.png";
import { toast, ToastContainer } from "react-toastify";

const Spinner = () => (
  <div className="flex flex-col justify-center items-center h-screen">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-blue-600 text-lg font-medium">Loading goal...</p>
  </div>
);

const AllGoals = () => {
  const [goals, setGoals] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const getGoalApi = await fetch(
        "https://goal-backend-ip4r.onrender.com/api/goals/all"
      );
      const goaalB = await getGoalApi.json();
      setGoals(goaalB);
    } catch (error) {
      console.log("I MADE A MISTAKE");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  if (initialLoading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://goal-backend-ip4r.onrender.com/api/goals/${id}/delete`,
        {
          method: "DELETE",
        }
      );
      toast.success("Goal deleted successfully!");
      fetchGoals();
    } catch (error) {
      toast.error("Failed to delete goal.");
    }
  };

  return (
    <div className="mx-[100px] my-[32px] max-sm:mx-4 max-sm:my-6">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />

      {/* Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-2">
        <h2 className="font-montserrat font-bold text-[36px] max-sm:text-[26px] text-black m-0">
          All Goals
        </h2>

        <Link
          to="/newgoal"
          className="no-underline font-montserrat font-semibold text-[20px] max-sm:text-[16px] text-[#0585cd]"
        >
          + Create New Goals
        </Link>
      </div>

      {/* Goals List */}
      <div className="mt-[40px] max-sm:mt-[20px] flex flex-col gap-[60px] max-sm:gap-[30px]">
        {goals.map((goal) => (
          <div
            className="text-start px-[35px] pt-[24px] pb-[50px] max-sm:px-4 max-sm:pt-5 max-sm:pb-6 shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex flex-col gap-[35px] max-sm:gap-4"
            key={goal._id}
          >
            {/* Text Area */}
            <div className="flex flex-col gap-[12px]">
              {goal.progress === 100 && (
                <h4 className="font-montserrat font-semibold text-[20px] max-sm:text-[16px] text-[#0585cd] m-0">
                  🎉 Congratulations
                </h4>
              )}

              <h3 className="font-montserrat font-semibold text-[28px] max-sm:text-[20px] text-black m-0 break-words">
                {goal.title}
              </h3>

              <p className="font-montserrat font-normal text-[20px] max-sm:text-[15px] leading-[24.38px] text-black/80 m-0 break-words">
                {goal.description}
              </p>
            </div>

            {/* Progress + Buttons */}
            <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-5">
              {/* Progress Bar */}
              <div className="w-[368px] max-sm:w-full flex flex-col items-start gap-[12px]">
                <div className="flex justify-between w-full">
                  <p className="text-[16px] max-sm:text-[14px] text-black/80 m-0">
                    Progress
                  </p>
                  <p className="text-[16px] max-sm:text-[14px] text-black/80 m-0">
                    {goal.progress}%
                  </p>
                </div>

                <div className="w-full bg-[#d9d9d9] h-[12px] rounded-[10px]">
                  <div
                    className="h-[12px] rounded-[10px]"
                    style={{
                      width: `${goal.progress}%`,
                      backgroundColor:
                        goal.progress < 50 ? "#ff0000cc" : "#339933",
                    }}
                  ></div>
                </div>
              </div>

              {/* Buttons */}
              <div className="w-[30%] max-sm:w-full max-sm:flex-col max-sm:gap-3 flex justify-between mt-0">
                <Link
                  to={`/progress/${goal._id}`}
                  className="no-underline flex items-center justify-center gap-[10px] rounded-[10px] p-[16px] max-sm:py-3 max-sm:text-[16px] bg-[#0585cd] text-white"
                >
                  <img src={pen} alt="Edit" />
                  <p className="font-montserrat font-semibold text-[20px] max-sm:text-[16px] m-0">
                    Edit
                  </p>
                </Link>

                <button
                  onClick={() => handleDelete(goal._id)}
                  className="flex items-center justify-center gap-[10px] rounded-[10px] p-[16px] max-sm:py-3 border border-[#0585cd]"
                >
                  <img src={can} alt="Delete" />
                  <p className="font-montserrat font-semibold text-[20px] max-sm:text-[16px] text-[#0585cd] m-0">
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

export default AllGoals;
