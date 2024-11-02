import React, { useEffect, useState } from "react";
import profile from "../assets/profile.webp";
import { useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const Send = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [amount, setAmount] = useState("");
  const token = localStorage.getItem("accessToken");

  const getSingleUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/singleUser/${id.split(":")[1]}`
      );
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const transferMoney = async () => {
    if (!amount || isNaN(amount)) {
      message.error("Please enter a valid amount.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/account/transfer",
        {
          amount: parseFloat(amount),
          to: id.split(":")[1],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success(res.data.message);
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-slate-200">
      <div className="bg-white w-72 h-64 rounded-lg shadow-lg p-4 flex flex-col justify-around items-center">
        <h1 className="text-black text-xl font-bold mb-4">Send Money</h1>

        <div className="flex items-center gap-3">
          <img
            src={profile}
            alt="User Avatar"
            className="mb-2 rounded-full w-10"
          />
          <p className="text-black">{user.firstname}</p>
        </div>

        <div className="flex flex-col w-full items-center mt-4">
          <label htmlFor="amount" className="text-black mb-2">
            Amount (in Rs)
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 rounded-lg w-full text-black mb-4"
          />
          <button
            onClick={transferMoney}
            className="text-white bg-green-600 w-full py-2 px-4 rounded-lg font-bold"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default Send;
