import React from "react";
import profile from "../assets/profile.webp";
import { useNavigate } from "react-router-dom";
const User = ({ name, id }) => {
  const navigate = useNavigate();
  const handlesubmit = () => {
    navigate(`/send/:${id}`);
  };
  return (
    <div className="flex justify-between px-14 pt-5">
      <div className="flex gap-2 items-center rounded-full">
        <img src={profile} alt="" className="w-10" />
        <p className="text-xl">{name}</p>
      </div>
      <button
        onClick={handlesubmit}
        className="bg-gray-800 text-white p-1.5 rounded-md"
      >
        Send Money
      </button>
    </div>
  );
};

export default User;
