import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (

    <div>
      {cart && cart.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <h5>Cart Items is empty!</h5>
        </div>
      ) : (
        <>
          <div>
            {/* Item length */}
            <div className={`${styles.noramlFlex} p-4`}>
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {cart && cart.length} items
              </h5>
            </div>

            {/* cart Single Items */}
            <br />
            <div className="w-full border-t">
              {cart &&
                cart.map((i, index) => (
                  <CartSingle
                    key={index}
                    data={i}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
            </div>
          </div>

          <div className="px-5 mb-3 mt-4">
            {/* checkout buttons */}
            <Link to="/checkout">
              <div
                className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
              >
                <h1 className="text-[#fff] text-[18px] font-[600]">
                  Checkout Now (USD${totalPrice})
                </h1>
              </div>
            </Link>
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
      <div className="w-full flex items-center">

        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[100px] h-min ml-2 mr-2 rounded-[5px]"
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
        <div className="flex items-center ml-4">
         
          <div
            className="bg-blue-500 rounded-full w-[25px] h-[25px] flex items-center justify-center  cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="white" />
          </div>
          <span className="p-[10px]">{data.qty}</span>
          <div
            className={`bg-orange-500 border border-orange-600 rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
        </div>
        <RxCross1
          className="cursor-pointer ml-auto text-red-600" title="remove from cart"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
