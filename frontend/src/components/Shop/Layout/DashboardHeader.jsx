import React from "react";

import { useSelector } from "react-redux";
import { Link, useRoutes } from "react-router-dom";
import { BiBell } from "react-icons/bi";
import Logo from "../../myComponents/Logo";
import { CiShop } from "react-icons/ci";
import axios from "axios";
import { server } from "../../../server";
import { VscSignOut } from "react-icons/vsc";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  // const route = useRoutes()

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    // route.push("/")
    window.location.reload();

  };
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-600 flex items-center justify-between px-4">
      <div>
        <Logo to="/dashboard" />
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-6 space-x-4">

          <p className="text-lg font-[500]">{seller.name}</p>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${seller.avatar?.url}`}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
          </Link>
          <Link to={`/shop/${seller._id}`}>
            <CiShop size={35} className="text-orange-600 font-bold border rounded-full p-1 bg-purple-200 shadow-sm" />
          </Link>
          {/* <BiBell size={25} className="text-orange-500" /> */}
          <VscSignOut onClick={logoutHandler} size={25} className="text-red-500 hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
