import React from "react";

const InputBox = ({ label, onChange }) => {
  return (
    <div className="flex flex-col p-2">
      <label htmlFor="firstname">{label}</label>
      <input
        type="text"
        placeholder={label}
        className="border border-slate-200 py-2 px-1 w-full"
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
