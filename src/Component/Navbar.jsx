import React from "react";
import { Link } from "react-router-dom";

export const Navbar = (props) => {
  let location = window.location.pathname;

  const userLogout = () => {
    localStorage.clear('token')
    props.showAlert("Successfully Logged out", "bg-green-500")
    window.location.reload();
    
  }

  return (
    <div className=" ">
      <nav className="flex justify-center items-center h-14  p-2 bg-opacity-10   bg-gray-500  font-bold  w-full md:relative">
        <label htmlFor="" className="mx-3 text-xl">
          iNotebook
        </label>
        <ul className="md:flex ml-auto hidden">
          <Link
            className={`${
              location === "/" ? "border-b-2 border-blue-400" : ""
            }hover:border-b-2 border-blue-400 `}
            to="/"
          >
            {" "}
            <li className="mx-3">Home</li>
          </Link>
          <Link
            className={` ${
              location === "/about" ? "border-b-2 border-blue-400" : ""
            } hover:border-b-2 border-blue-400`}
            to="/about"
          >
            {" "}
            <li className="mx-3">About</li>
          </Link>
        </ul>{" "}

        {localStorage.getItem("token") ? (
          <button onClick={()=> { if (window.confirm('Logout?')) userLogout()}} className=" px-1 text-white rounded-sm bg-purple-500 ">Logout</button>
        ) : (
          <Link to="/login" className="ml-auto md:mx-3">
            <button className=" px-1  text-white rounded-sm  bg-purple-500">
              Login
            </button>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
