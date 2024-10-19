import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../server";

const ShopName = ({ id }) => {
  const [shop, setShop] = useState({})


  useEffect(() => {

    const getShopById = async () => {
      const { data } = await axios.get(`${server}/shop/get-shop-info/${id}`)
      if (data) {
        setShop(data?.shop)
      }
    }
    if (id) {
      getShopById();
    }

  }, [])
  return <p>{shop?.name}</p>;
};

export default ShopName;
