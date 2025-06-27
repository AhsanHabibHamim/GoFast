import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom"; // Use react-router-dom

const Logo = ({ className }) => {
  return (
    <Link to="/" className={className}>
      <div className="flex items-center justify-center">
        <img src={logo} alt="" />
        <h1 className="text-3xl -ml-2 font-extrabold">GoFast</h1>
      </div>
    </Link>
  );
};

export default Logo;
