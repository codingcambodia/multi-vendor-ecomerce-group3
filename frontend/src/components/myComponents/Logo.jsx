import React from "react";
import { Link } from "react-router-dom";

function Logo({ to }) {
  return <Link to={to}>
    <img className="w-25 h-12 m-2"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Nintendo_eShop_Switch_logo.svg/2560px-Nintendo_eShop_Switch_logo.svg.png"
      alt=""
    />

    {/* <div className="flex -space-y-2 flex-col text-xl font-bold text-orange-600"><h2>GROUP 3  </h2><h2>eShope</h2> </div> */}
  </Link>;
}

export default Logo;
