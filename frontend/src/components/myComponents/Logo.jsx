import React from "react";
import { Link } from "react-router-dom";

function Logo({ to }) {
  return <Link to={to}>
    <img className="w-25 h-12 m-2"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Nintendo_eShop_Switch_logo.svg/2560px-Nintendo_eShop_Switch_logo.svg.png"
      alt=""
    />
  </Link>;
}

export default Logo;
