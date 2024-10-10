import React from "react";

function CartData({orderData}) {
  
    const shipping = orderData?.shipping?.toFixed(2);
    return (
      <div className="w-full bg-[#fff] rounded-md p-5 pb-8 shadow-sm">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
          <h5 className="text-[18px] font-[600] text-orange-500">${orderData?.subTotalPrice}</h5>
        </div>
        <br />
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
          <h5 className="text-[18px] font-[600] text-orange-500">${shipping}</h5>
        </div>
        <br />
        <div className="flex justify-between border-b pb-3">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
          <h5 className="text-[18px] font-[600] text-orange-500">{orderData?.discountPrice? "$" + orderData.discountPrice : "-"}</h5>
        </div>
        <h5 className="text-[18px] font-[600] text-end pt-3 text-orange-500">
          ${orderData?.totalPrice}
        </h5>
        <br />
      </div>
    );
  };


export default CartData;
