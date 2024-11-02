import React from "react";
const Appbar = ({ user, src }) => {
  const handleClick = () => {
    localStorage.clear();
    location.reload();
  };
  return (
    <div className="bg-slate-50 border-b-2 h-16 w-full flex justify-between px-14 pt-5 text-lg">
      <h1>Payments App</h1>
      <ul className="flex gap-4">
        <li>
          hello, {user} <img src={src} alt="" />
        </li>
        <li
          onClick={handleClick}
          className="cursor-pointer hover:text-blue-900"
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Appbar;
