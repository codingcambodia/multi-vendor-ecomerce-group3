import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  }

  return (
    <div>
      {wishlist && wishlist.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <h5>Wishlist Items is empty!</h5>
        </div>
      ) : (
        <>
          {/* Item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart className="text-orange-500" size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {wishlist && wishlist.length} items
            </h5>
          </div>

          {/* cart Single Items */}
          <br />
          <div className="w-full border-t">
            {wishlist &&
              wishlist.map((i, index) => (
                <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
              ))}
          </div>

        </>
      )}
    </div>

  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b py-4">
      <div className="w-full 800px:flex items-center">

        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[100px] h-min mr-2 rounded-sm"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-orange-500 ">
            US${totalPrice}
          </h4>
        </div>
        <div className="ml-auto">

          <div className="flex flex-col items-center space-y-2">
            <RxCross1 title="remove" className="cursor-pointer text-red-600 800px:mb-['unset'] 800px:ml-['unset'] mb-2 m-2"
              onClick={() => removeFromWishlistHandler(data)}
            />
            <BsCartPlus size={30} className="cursor-pointer font-bold hover:text-orange-500 text-green-500" title="Add to cart"
              onClick={() => addToCartHandler(data)}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Wishlist;
