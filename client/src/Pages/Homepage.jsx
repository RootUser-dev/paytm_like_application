import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-full h-screen flex justify-center items-center flex-col">
      <h1 className="text-6xl font-bold text-white mb-4 animate-pulse drop-shadow-lg">
        Paytm
      </h1>
      <p className="text-white text-2xl md:text-3xl lg:text-4xl mb-6 text-center drop-shadow-md">
        Transfer Money Easily
      </p>

      <Link
        to="/signin"
        className="bg-gradient-to-r from-green-400 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-2xl"
      >
        Login
      </Link>

      <div className="absolute bottom-10 text-sm text-white opacity-70">
        <p>Fast & Secure Payment Platform</p>
      </div>
    </div>
  );
};

export default Homepage;
