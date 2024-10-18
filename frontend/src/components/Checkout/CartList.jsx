import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";

import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const CartList = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };


  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  const shopItemsMap = new Map();

  for (const item of cart) {
    const shopId = item.shopId;
    if (!shopItemsMap.has(shopId)) {
      shopItemsMap.set(shopId, []);
    }
    shopItemsMap.get(shopId).push(item);
  }

  let array = Array.from(shopItemsMap, ([shopId, items]) => ({ shopId, items }));


  return (

    <div className="w-full bg-white shadow-sm rounded-md p-4">
      {cart && cart.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center ">
          <h5>Cart Items is empty!</h5>
        </div>
      ) : (
        <>
          <div className="w-full ">

            <div className={`${styles.noramlFlex} p-4`}>
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {cart && cart.length} items
              </h5>
            </div>

            <div className="w-full">

              {array?.map((item) => <>

                <div className="py-4 mt-2" key={item.shopId}>
                  <p className="bg-orange-100 p-2 font-[500] ">Shop: {item?.shopId?.slice(-6)} Store</p>
                </div>


                {item?.items?.map((i, index) => (
                  <CartSingle
                    key={index}
                    data={i}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}

              </>)}


            </div>
          </div>

        </>
      )}
    </div>

  );
};



const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b py-4">
      <div className="w-full flex items-center gap-x-4">


        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[60px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-orange-500 ">
            US${totalPrice}
          </h4>
        </div>



        <div>
          <button
            className="bg-gradient-to-r from-orange-300 to-orange-600 text-white font-bold rounded-l px-2 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
            onClick={() => decrement(data)}
          >
            -
          </button>
          <span className="bg-gray-200 text-gray-800 font-medium px-2 py-[6px]">
            {data.qty}
          </span>
          <button
            className="bg-gradient-to-r from-orange-300 to-orange-600 text-white font-bold rounded-l px-2 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
            onClick={() => increment(data)}
          >
            +
          </button>
        </div>
        <RxCross1
          className="cursor-pointer ml-auto text-red-600" title="remove from cart"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default CartList;
