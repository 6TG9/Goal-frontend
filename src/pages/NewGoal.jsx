import React, { useState } from "react";
import ladda from "../assets/amico.png";
import { useNavigate } from "react-router-dom";

const NewGoal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newGoal = { title, description, progress: Number(progress) };

    try {
      const postNewGoal = await fetch(
        "https://goal-backend-ip4r.onrender.com/api/goals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGoal),
        }
      );

      if (postNewGoal.ok) {
        navigate("/allgoals");
      } else {
        console.error("Failed to post goal");
      }
    } catch (error) {
      console.error("Error creating goal", error);
    }
  };

  return (
    <div
      className="
        flex 
        flex-col 
        lg:flex-row 
        items-start 
        gap-10 
        mx-4 
        sm:mx-10 
        lg:mx-[100px] 
        my-6 
        lg:my-[48px]
      "
    >
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="
          flex 
          flex-col 
          items-start 
          w-full 
          lg:w-[656px] 
          bg-[#0585cd29] 
          p-6 
          sm:p-10 
          lg:p-[60px_50px] 
          gap-10 
          lg:gap-[66px]
        "
      >
        <input
          type="text"
          placeholder="Goal Title"
          className="
            w-full 
            sm:w-[329px] 
            p-3 
            sm:p-[15px_10px] 
            rounded-[5px] 
            border 
            border-[#0585cd] 
            bg-[#0585cd05] 
            placeholder:font-montserrat 
            placeholder:text-sm 
            sm:placeholder:text-[16px] 
            placeholder:text-black/70
          "
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <textarea
          rows="10"
          placeholder="Goal Description"
          className="
            w-full 
            sm:w-[556px] 
            p-3 
            sm:p-[15px_10px] 
            rounded-[5px] 
            border 
            border-[#0585cd] 
            bg-[#0585cd05] 
            placeholder:font-montserrat 
            placeholder:text-sm 
            sm:placeholder:text-[16px] 
            placeholder:text-black/70
          "
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <input
          type="number"
          placeholder="Goal Progress"
          className="
            w-full 
            sm:w-[329px] 
            p-3 
            sm:p-[15px_10px] 
            rounded-[5px] 
            border 
            border-[#0585cd] 
            bg-[#0585cd05] 
            placeholder:font-montserrat 
            placeholder:text-sm 
            sm:placeholder:text-[16px] 
            placeholder:text-black/70
          "
          value={progress}
          onChange={(event) => {
            const num = Number(event.target.value);
            if (num < 0) setProgress(0);
            else if (num > 100) setProgress(100);
            else setProgress(num);
          }}
          min="0"
          max="100"
          required
        />

        <button
          type="submit"
          className="
            bg-[#0585cd] 
            px-6 
            py-3 
            rounded-[10px] 
            font-montserrat 
            font-semibold 
            text-base 
            sm:text-lg 
            lg:text-[20px] 
            text-white 
            cursor-pointer
          "
        >
          Create Goal
        </button>
      </form>

      {/* IMAGE */}
      <div className="flex justify-center w-full lg:w-auto">
        <img
          src={ladda}
          alt="Illustration"
          className="w-[250px] sm:w-[350px] lg:w-auto"
        />
      </div>
    </div>
  );
};

export default NewGoal;
