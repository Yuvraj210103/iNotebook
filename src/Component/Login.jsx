import React, { useEffect, useState } from "react";
import loginImg from "./Assets/login.svg";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Login = (props) => {
  useEffect(() => {
    props.showNotes(false);
  }, []);

  const [loading, setloading] = useState(false);
  const [cred, setCred] = useState({ email: "", password: "" });
  let history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setloading(true);
    const response = await fetch(
      `https://bored-cod-fez.cyclic.app/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cred.email, password: cred.password }),
      }
    );
    const json = await response.json();

    if (json.success) {
      //redirect
      localStorage.setItem("token", json.authtoken);
      history("/");
      props.showAlert("Login successful", "bg-green-500");
    } else {
      props.showAlert("Invalid Credentials", "bg-red-500");
    }
    setloading(true);
  };
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {loading ? <Loading /> : 
      <div className="grid md:grid-cols-2 my-16 gap-x-24">
        <div className="img mx-4 order-2">
          <img src={loginImg} alt="" className="" />
        </div>
        <div className="flex-col justify-center items-center mx-8 md:mx-20 order-1">
          <Link to="/">
            {" "}
            <button className="text-purple-500 mr-auto my-6 flex items-center">
              <AiOutlineArrowLeft className="mx-1" /> Home
            </button>
          </Link>

          <h1 className="text-3xl font-extrabold ">Login</h1>
          <h3 className="my-1">Sign in on the internal platform</h3>

          <input
            className="w-full border border-black my-3 py-2 px-3"
            name="email"
            value={cred.email}
            onChange={onChange}
            type="email"
            placeholder="Email ID *"
          />
          <input
            className="w-full border border-black my-3 py-2 px-3"
            name="password"
            value={cred.password}
            onChange={onChange}
            type="password"
            placeholder="Password *"
          />

          <button
            className="w-full p-2 bg-purple-500 text-white font-bold my-3"
            onClick={handleClick}
          >
            Login
          </button>

          <h3>
            Don't have an account?{" "}
            <Link to="/register">
              {" "}
              <span className="underline text-blue-500">register</span>
            </Link>
          </h3>
        </div>
      </div>
}
    </div>
  );
};

export default Login;
