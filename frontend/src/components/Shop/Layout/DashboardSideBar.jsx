import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiEyeOff, FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard, RxEyeOpen } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiDollarCircle, BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import SidebarItem from "../../myComponents/SidebarItem";


const DashboardSideBar = ({ active }) => {
 
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0  pt-6">
      {/* single item */}

      <SidebarItem
        active={active}
        num={1}
        Icon={<RxDashboard size={24}
          color={`${active === 1 ? "#f97316" : ""}`} />}
        route="Dashboard"
        href="/dashboard"
      />
      <SidebarItem
        active={active}
        num={2}
        Icon={<FiShoppingBag size={24}
          color={`${active === 2 ? "#f97316" : ""}`} />}
        route="All Order"
        href="/dashboard-orders"
      />

      <SidebarItem
        active={active}
        num={3}
        Icon={<FiPackage size={24}
          color={`${active === 3 ? "#f97316" : ""}`} />}
        route="All Products"
        href="/dashboard-products"
      />
      <SidebarItem
        active={active}
        num={4}
        Icon={<MdOutlineLocalOffer size={24}
          color={`${active === 4 ? "#f97316" : ""}`} />}
        route="All Events"
        href="/dashboard-events"
      />
      <SidebarItem
        active={active}
        num={5}
        Icon={<BiDollarCircle size={24}
          color={`${active === 5 ? "#f97316" : ""}`} />}
        route="Withdraw Money"
        href="/dashboard-withdraw-money"
      />
      <SidebarItem
        active={active}
        num={6}
        Icon={<BiMessageSquareDetail size={24}
          color={`${active === 6 ? "#f97316" : ""}`} />}
        route="Shop Inbox"
        href="/dashboard-messages"
      />
      <SidebarItem
        active={active}
        num={7}
        Icon={<AiOutlineGift size={24}
          color={`${active === 7 ? "#f97316" : ""}`} />}
        route="Discount Codes"
        href="/dashboard-coupouns"
      />

      <SidebarItem
        active={active}
        num={8}
        Icon={<HiOutlineReceiptRefund size={24}
          color={`${active === 8 ? "#f97316" : ""}`} />}
        route="Refunds"
        href="/dashboard-refunds"
      />
      
      <SidebarItem
        active={active}
        num={9}
        Icon={<CiSettings size={24}
          color={`${active === 9 ? "#f97316" : ""}`} />}
        route="Shop Setting"
        href="/settings"
      />

    </div>
  );
};

export default DashboardSideBar;


