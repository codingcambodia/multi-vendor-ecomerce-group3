import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";
import { useGetProductById } from "../api/product/use-get-product-by-id";
import Loader from "../components/Layout/Loader";
import { useGetEventById } from "../api/event/use-get-events-by-id";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const { isPending, data: productData } = useGetProductById(id);
  const { isPending: eventPending, data: event } = useGetEventById(id);


  let data = {};

  if (eventData !== null) {
    data = event?.events
  } else {
    data = productData?.product
  }
  console.log(event);

  console.log(data);

  const isLoading = isPending || eventPending

  return (
    <div>
      <Header />
      {isLoading ? <Loader /> :
        <>
          <ProductDetails data={data} />
          {!eventData && (
            <>
              {data && <SuggestedProduct data={data} />}
            </>
          )
          }
        </>

      }

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
