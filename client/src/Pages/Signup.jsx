import React, { useState } from "react";
import Heading from "../Components/Heading";
import SubHeading from "../Components/SubHeading";
import InputBox from "../Components/InputBox";
import Button from "../Components/Button";
import BottomWarning from "../Components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  const onsubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:4000/api/v1/user/signup", {
        firstname,
        lastname,
        username,
        password,
      });
      if (res.status >= 200 && res.status < 300) {
        localStorage.setItem("accessToken", res.data.token);
        message.success(res.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  return (
    <section className="w-full h-[100vh] bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center">
      <div className="w-72 bg-white  rounded-lg md:w-1/4 p-2">
        <Heading label={"Sign-up"} />
        <SubHeading label={"Enter Your Information to an create Account"} />
        <InputBox
          label={"FirstName"}
          onChange={(e) => setfirstname(e.target.value)}
        />
        <InputBox
          label={"LastName"}
          onChange={(e) => setlastname(e.target.value)}
        />
        <InputBox
          label={"Username"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputBox
          label={"Password"}
          onChange={(e) => setpassword(e.target.value)}
        />
        <Button onClick={onsubmit} label={"Signup"} />

        <BottomWarning
          to={"/signin"}
          buttonText={"signin"}
          label={"Already have an Account"}
        />
      </div>
    </section>
  );
};

export default Signup;
