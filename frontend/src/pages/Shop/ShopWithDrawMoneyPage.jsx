import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import WithdrawMoney from "../../components/Shop/WithdrawMoney";
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import AllShopWithdraw from '../../components/Shop/AllShopWithdraw';

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashboardSideBar active={5} />
      </div>
       {/* <WithdrawMoney /> */}
       <AllShopWithdraw />
    </div>
  </div>
  )
}

export default ShopWithDrawMoneyPage