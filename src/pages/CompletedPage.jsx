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

const CompletedPage = () => {
  const [completedgoals, setCompletedGoals] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchCompletedGoals = async () => {
    try {
      const getCompletedGoals = await fetch(
        "https://goal-backend-ip4r.onrender.com/api/goals/completed"
      );
      const cGoaalB = await getCompletedGoals.json();
      setCompletedGoals(cGoaalB);
    } catch (error) {
      console.log("I MADE A MISTAKE");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedGoals();
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
      fetchCompletedGoals();
    } catch (error) {
      console.error(`Failed to delete`, error);
      toast.error("Failed to delete goal.");
    }
  };

  return (
    <div className="mx-4 sm:mx-10 lg:mx-[100px] my-6">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-[36px] text-black m-0">
          Completed
        </h2>

        <Link
          to="/newgoal"
          className="no-underline font-montserrat font-semibold text-base sm:text-lg lg:text-[20px] text-[#0585cd]"
        >
          + Create New Goals
        </Link>
      </div>

      {/* GOAL CARDS */}
      <div className="mt-[40px] flex flex-col gap-[60px]">
        {completedgoals.map((completedgoal) => {
          return (
            <div
              className="text-start px-4 sm:px-6 lg:px-[35px] pt-5 pb-10 shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex flex-col gap-5"
              key={completedgoal._id}
            >
              <div className="flex flex-col gap-3">
                <h4 className="font-montserrat font-semibold text-lg sm:text-xl lg:text-[20px] text-[#0585cd] m-0">
                  Congratulations 🎉
                </h4>

                <h3 className="font-montserrat font-semibold text-xl sm:text-2xl lg:text-[28px] text-black m-0 break-words">
                  {completedgoal.tittle}
                </h3>

                <p className="font-montserrat font-normal text-base sm:text-lg lg:text-[20px] leading-relaxed text-black/80 m-0 break-words">
                  {completedgoal.description}
                </p>
              </div>

              {/* PROGRESS BAR + ACTION BUTTONS */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="w-full sm:w-[368px] flex flex-col items-start gap-3">
                  <div className="flex justify-between w-full items-start">
                    <p className="font-montserrat font-normal text-sm sm:text-base text-black/80 m-0">
                      Progress
                    </p>
                    <p className="font-montserrat font-normal text-sm sm:text-base text-black/80 m-0">
                      {completedgoal.progress}%
                    </p>
                  </div>

                  <div className="w-full bg-[#d9d9d9] h-[12px] rounded-[10px]">
                    <div
                      className="h-[12px] rounded-[10px]"
                      style={{
                        width: `${completedgoal.progress}%`,
                        backgroundColor:
                          completedgoal.progress < 50 ? "#ff0000cc" : "#339933",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="w-full sm:w-[60%] lg:w-[30%] flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between cursor-pointer">
                  <Link
                    to={`/progress/${completedgoal._id}`}
                    className="no-underline flex items-center justify-center gap-2 sm:gap-[10px] rounded-[10px] p-3 sm:p-[16px] bg-[#0585cd]"
                  >
                    <img src={pen} alt="Edit icon" className="w-4 sm:w-auto" />
                    <p className="font-montserrat font-semibold text-sm sm:text-base lg:text-[20px] text-white m-0">
                      Edit
                    </p>
                  </Link>

                  <button
                    onClick={() => handleDelete(completedgoal._id)}
                    className="no-underline flex items-center justify-center gap-2 sm:gap-[10px] rounded-[10px] p-3 sm:p-[16px] bg-white border border-[#0585cd]"
                  >
                    <img
                      src={can}
                      alt="Delete icon"
                      className="w-4 sm:w-auto"
                    />
                    <p className="font-montserrat font-semibold text-sm sm:text-base lg:text-[20px] text-[#0585cd] m-0">
                      Delete
                    </p>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompletedPage;
