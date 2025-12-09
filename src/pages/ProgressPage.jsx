import React, { useEffect, useState } from "react";
import ladda from "../assets/amico.png";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Spinner = () => (
  <div className="flex flex-col justify-center items-center h-screen">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-blue-600 text-lg font-medium">Loading goal...</p>
  </div>
);

const ProgressPage = () => {
  const { id } = useParams();
  const [goal, setGoal] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [newProgress, setNewProgress] = useState("");

  const navigate = useNavigate();

  const fetchThatParticularGoalById = async () => {
    try {
      const fetchEachGoal = await fetch(
        `https://goal-backend-ip4r.onrender.com/api/goals/${id}`
      );
      if (fetchEachGoal.ok) {
        const fetchedGoal = await fetchEachGoal.json();
        setGoal(fetchedGoal);
        setNewProgress(fetchedGoal.progress);
      }
    } catch (error) {
      console.error("Error fetching goal", error);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchThatParticularGoalById();
  }, [id]);

  if (initialLoading) {
    return <Spinner />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const patchedGoal = await fetch(
        `https://goal-backend-ip4r.onrender.com/api/goals/${id}/progress`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ progress: Number(newProgress) }),
        }
      );
      if (patchedGoal.ok) {
        toast.success("Progress updated successfully!");
        setTimeout(() => navigate("/allgoals"), 2000);
      } else {
        toast.error("Failed to update progress.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="newgoal my-10 mx-4 md:mx-[100px] flex flex-col md:flex-row items-start gap-8 md:gap-5">
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />

      {/* FORM */}
      <form onSubmit={handleSubmit} className="new-forms text-left flex-1">
        <h2 className="font-bold text-3xl md:text-4xl text-black m-0">
          Progress
        </h2>

        <div className="uper-form mt-6">
          <div className="goal-t mb-4">
            <h4 className="text-sm md:text-base font-normal text-black/70">
              Goal Title
            </h4>
            <p className="text-base font-semibold text-black">{goal.title}</p>
          </div>

          <div className="goal-d">
            <h4 className="text-sm md:text-base font-normal text-black/70">
              Goal Description
            </h4>
            <p className="text-sm md:text-base font-normal text-black leading-tight md:leading-[19.5px]">
              {goal.description}
            </p>
          </div>
        </div>

        {/* LOWER FORM */}
        <div
          className="lower-form flex flex-col items-start w-full md:w-[656px] bg-[#0585cd29] 
                        p-6 md:p-[60px_50px] gap-10 mt-6 rounded-md"
        >
          <input
            type="number"
            placeholder="Goal Progress"
            className="w-full md:w-[329px] px-3 py-3 rounded-[5px] border border-[#0585cd] bg-[#0585cd05] placeholder:text-black/70"
            value={newProgress}
            onChange={(event) => {
              const num = Number(event.target.value);
              if (num < 0) setNewProgress(0);
              else if (num > 100) setNewProgress(100);
              else setNewProgress(num);
            }}
            min="0"
            max="100"
            required
          />

          {/* PROGRESS BAR */}
          <div className="progress w-full md:w-[368px] flex flex-col items-start gap-3">
            <div className="progress-text flex items-start justify-between w-full">
              <p className="m-0 text-sm md:text-base font-normal text-black/80">
                Progress
              </p>
              <p className="m-0 text-sm md:text-base font-normal text-black/80">
                {newProgress}%
              </p>
            </div>

            <div className="loader-con bg-[#d9d9d9] w-full h-3 rounded-[10px]">
              <div
                className="loader-bar h-3 rounded-[10px]"
                style={{
                  width: `${newProgress}%`,
                  backgroundColor: newProgress < 50 ? "#ff0000cc" : "#339933",
                }}
              ></div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#0585cd] px-4 py-4 rounded-[10px] text-white font-semibold text-lg md:text-xl w-full md:w-auto"
          >
            Update Progress
          </button>
        </div>
      </form>

      {/* IMAGE */}
      <span className="flex justify-center w-full md:w-auto">
        <img
          src={ladda}
          alt="Goal illustration"
          className="w-64 md:w-auto mx-auto"
        />
      </span>
    </div>
  );
};

export default ProgressPage;
