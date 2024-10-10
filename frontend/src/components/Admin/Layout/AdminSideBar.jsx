import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag, BsShop } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import SidebarItem from "../../myComponents/SidebarItem";
import { BiDollarCircle, BiTimer, BiUserCircle } from "react-icons/bi";
import { IoTerminalOutline } from "react-icons/io5";

const AdminSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm  sticky top-0 left-0 z-10">
      {/* single item */}

      <SidebarItem
        active={active}
        num={1}
        Icon={<RxDashboard size={24}
          color={`${active === 1 ? "#f97316" : ""}`} />}
        route="Dashboard"
        href="/admin/dashboard"
      />


      <SidebarItem
        active={active}
        num={2}
        Icon={<FiShoppingBag size={24}
          color={`${active === 2 ? "#f97316" : ""}`} />}
        route="All Orders"
        href="/admin-orders"
      />
      <SidebarItem
        active={active}
        num={3}
        Icon={<BsShop size={22}
          color={`${active === 3 ? "#f97316" : ""}`} />}
        route="  All Sellers"
        href="/admin-sellers"
      />

      <SidebarItem
        active={active}
        num={4}
        Icon={<HiOutlineUserGroup size={24}
          color={`${active === 4 ? "#f97316" : ""}`} />}
        route="All Users"
        href="/admin-users"
      />
      <SidebarItem
        active={active}
        num={5}
        Icon={<IoTerminalOutline size={24}
          color={`${active === 5 ? "#f97316" : ""}`} />}
        route="  All Products"
        href="/admin-products"
      />
      <SidebarItem
        active={active}
        num={6}
        Icon={<BiTimer size={24}
          color={`${active === 6 ? "#f97316" : ""}`} />}
        route="All Events"
        href="/admin-events"
      />

      <SidebarItem
        active={active}
        num={7}
        Icon={<BiDollarCircle size={24}
          color={`${active === 7 ? "#f97316" : ""}`} />}
        route="Withdraw Request"
        href="/admin-withdraw-request"
      />

<SidebarItem
        active={active}
        num={8}
        Icon={<AiOutlineSetting size={24}
          color={`${active === 8 ? "#f97316" : ""}`} />}
        route="Profile"
        href="/profile"
      />

  

    </div>
  );
};

export default AdminSideBar;
