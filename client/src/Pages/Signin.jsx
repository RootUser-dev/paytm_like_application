import React, { useState } from "react";
import Heading from "../Components/Heading";
import SubHeading from "../Components/SubHeading";
import InputBox from "../Components/InputBox";
import Button from "../Components/Button";
import BottomWarning from "../Components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
const Signin = () => {
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();
  const onsubmit = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/signin", {
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
        <Heading label={"Sing-in"} />
        <SubHeading label={"Enter Your Creditional to an create Account"} />
        <InputBox
          label={"Username"}
          onChange={(e) => setusername(e.target.value)}
        />
        <InputBox
          label={"Password"}
          onChange={(e) => setpassword(e.target.value)}
        />
        <Button onClick={onsubmit} label={"Sign-in"} />

        <BottomWarning
          to={"/signup"}
          buttonText={"SignUp"}
          label={"Don't have an Account"}
        />
      </div>
    </section>
  );
};

export default Signin;
