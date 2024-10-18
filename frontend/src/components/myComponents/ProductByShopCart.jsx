import React from "react";

const ProductByShopCart = ({ cart }) => {

  const shopItemsMap = new Map();

  for (const item of cart) {
    const shopId = item.shopId;
    if (!shopItemsMap.has(shopId)) {
      shopItemsMap.set(shopId, []);
    }
    shopItemsMap.get(shopId).push(item);
  }



  for (const [shopId, items] of shopItemsMap) {
    // let total = items.reduce((accumulator, item) => {
    //   return (accumulator += item.discountPrice * item.qty);
    // }, 0);

  }
  return <div>ProductByShopCart</div>;
};

export default ProductByShopCart;
