import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ num, Icon, route, href, active }) => {
  return <div className="w-full flex items-center p-4">
    <Link to={href} className="w-full flex items-center">
      {Icon}
      <h5
        className={`hidden 800px:block pl-4 text-md font-[400] ${num === active ? "text-orange-500" : ""
          }`}
      >
        {route}
      </h5>
    </Link>
  </div>
};

export default SidebarItem;

