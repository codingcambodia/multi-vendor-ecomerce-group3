import React from "react";
import { Link } from "react-router-dom";
const ShopDashboardCard = ({ title, action, data, Icon, href}) => {
  return <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
    <div className="flex items-center">
      {Icon}
      <h3
        className="text-lg font-semibold "
      >
        {title}
      </h3>
    </div>
    <h5 className="pt-2 pl-[36px] text-[22px] font-[600] text-orange-600">{data && data.length}</h5>
    <Link to={href}>
      <h5 className="pt-4 pl-2 text-[#077f9c]">{action}</h5>
    </Link>
  </div>;
};

export default ShopDashboardCard;
