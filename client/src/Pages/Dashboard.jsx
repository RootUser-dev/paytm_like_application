import React, { useEffect, useState } from "react";
import Appbar from "../Components/Appbar";
import Balance from "../Components/Balance";
import User from "../Components/User";
import axios from "axios";
import { message } from "antd";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const getBalance = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        "http://localhost:4000/api/v1/account/getbalance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status >= 200 && res.status < 300) {
        setBalance(res.data.balance);
        setName(res.data.firstname);
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/bulk?filter=" + filter
      );
      if (res.data && res.data.user) {
        setUsers(res.data.user); // Save all users if available
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getBalance();
    handleSearch();
  }, [filter]);

  return (
    <section className="w-full h-[100vh] flex flex-col">
      <Appbar user={name ? name.toUpperCase() : "XYZ"} />
      <Balance bal={balance.toFixed(2)} />
      <input
        type="text"
        placeholder="Search users"
        onChange={(e) => setFilter(e.target.value)}
        className="border-2 border-grey-800 p-2 m-5 mx-12 rounded-lg"
      />
      {users.length > 0 ? (
        users.map((user, index) => (
          <User key={index} name={user.username} id={user.id} />
        ))
      ) : (
        <p>No users found</p>
      )}
    </section>
  );
};

export default Dashboard;
