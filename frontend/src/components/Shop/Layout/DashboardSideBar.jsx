import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={20}
            color={`${active === 1 ? "crimson" : "#16A34A"}`}
          />
          <h5
            className={`hidden 800px:block pl-3 text-md font-[400] ${active === 1 ? "" : "text-[#16A34A]"
              }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-orders" className="w-full flex items-center">
          <FiShoppingBag
            size={20}
            color={`${active === 2 ? "crimson" : "#16A34A"}`}
          />
          <h5
            className={`hidden 800px:block pl-3 text-md font-[400] ${active === 2 ? "text-[#16A34A]" : "text-[#16A34A]"
              }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-products" className="w-full flex items-center">
          <FiPackage size={20} color={`${active === 3 ? "crimson" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-3 text-md font-[400] ${active === 3 ? "text-[#16A34A]" : "text-[#16A34A]"
              }`}
          >
            All Products
          </h5>
        </Link>
      </div>



      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={20}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-3 text-md font-[400] ${active === 5 ? "text-[#16A34A]" : "text-[#16A34A]"
              }`}
          >
            All Events
          </h5>
        </Link>
      </div>

  

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-withdraw-money"
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={20}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-3 text-md font-[400] ${active === 7 ? "text-[#16A34A]" : "text-[#16A34A]"
              }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <BiMessageSquareDetail
            size={20}
            color={`${active === 8 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-3 text-md font-[400] ${active === 8 ? "text-[#16A34A]" : "text-[#16A34A]"
              }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-coupouns" className="w-full flex items-center">
          <AiOutlineGift
            size={20}
            color={`${active === 9 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-3 text-md font-[400] ${active === 9 ? "text-[#16A34A]" : "text-[#16A34A]"
              }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={20}
            color={`${active === 10 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-3 text-md font-[400] ${active === 10 ? "text-[#16A34A]" : "text-[#16A34A]"
              }`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4 ">
        <Link to="/settings" className="w-full flex items-center">
          <CiSettings
            size={20}
            color={`${active === 11 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-3 text-md font-[400] ${active === 11 ? "text-[#16A34A]" : "text-[#16A34A]"
              }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;


