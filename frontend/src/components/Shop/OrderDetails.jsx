import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useUpdateOrderStatus } from "../../api/order/use-update-order-status";
import BeatLoader from "react-spinners/BeatLoader";
import { useGetOrderById } from "../../api/order/use-get-order-by-id";
import Loader from "../Layout/Loader";
const statuses = [
  "Processing",
  "Transferred to delivery partner",
  "Shipping",
  "Received",
  "On the way",
  "Delivered",
]

const OrderDetails = () => {
  // const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const { isPending, mutate: updateOrderStatus } = useUpdateOrderStatus(id);
  const { isPending: getDataLoading, data: orderData } = useGetOrderById(id);
  const data = orderData?.order
  const orderUpdateHandler = async (e) => {
    if (status !== "") {

      updateOrderStatus({ status }, {
        onSuccess: () => {
          toast.success("Order updated!");
          // navigate("/dashboard-orders");
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        }
      })
    } else {
      toast.error("Please select an status again");
    }
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        dispatch(getAllOrdersOfShop(seller._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }


  const handleSelectStatus = (e) => {
    let current_index = statuses.indexOf(e.target.value);
    let index = statuses.indexOf(data?.status);

    if (current_index > index + 1) {
      toast.error(`It must be in order. After", ${data?.status}, It must be, ${statuses[index + 1]}`);
    } else {
      setStatus(e.target.value)
    }


  }



  return (
    <>
      {getDataLoading ? <Loader /> : <div className={`py-4 min-h-screen ${styles.section} max-w-[900px] bg-white shadow-md p-8 rounded-md my-10`}>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <BsFillBagFill size={30} color="crimson" />
            <h1 className="pl-2 text-[25px] font-semibold">Order Details</h1>
          </div>
          <Link to="/dashboard-orders">
            <div
              className={`${styles.button} !rounded-[4px] !h-[45px] text-[18px] !flex !gap-x-2 px-1`}
            >  <BiLeftArrow className="ml-2" />
              Order List

            </div>
          </Link>
        </div>

        <div className="w-full flex items-center justify-between pt-6">
          <h5 className="text-[#00000084]">
            Order ID: <span className="text-orange-500">#{data?._id?.slice(0, 8)}</span>
          </h5>
          <h5 className="text-[#00000084]">
            Placed on: <span className="text-orange-500">{data?.createdAt?.slice(0, 10)}</span>
          </h5>
        </div>

        {/* order items */}
        <br />
        <br />
        {data &&
          data?.cart?.map((item, index) => (
            <div className="w-full flex items-start mb-5">
              <img
                src={`${item.images[0]?.url}`}
                alt=""
                className="w-[80x] h-[80px]"
              />
              <div className="w-full">
                <h5 className="pl-3 text-[20px]">{item.name}</h5>
                <h5 className="pl-3 text-[20px] text-[#00000091]">
                  US${item.discountPrice} x {item.qty}
                </h5>
              </div>
            </div>
          ))}

        <div className="border-t w-full text-right">
          <h5 className="pt-3 text-[18px]">
            Total Price: <span className="text-orange-500 text-xl font-semibold">US${data?.totalPrice}</span>
          </h5>
        </div>
        <br />
        <br />
        <div className="w-full 800px:flex items-center">
          <div className="w-full 800px:w-[60%]">
            <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
            <h4 className="pt-3 text-[20px] italic">
              {data?.shippingAddress.address1 +
                " " +
                data?.shippingAddress.address2}
            </h4>
            <h4 className=" text-[20px] italic">{data?.shippingAddress.country}</h4>
            <h4 className=" text-[20px] italic">{data?.shippingAddress.city}</h4>
            <h4 className=" text-[20px] italic">{data?.user?.phoneNumber}</h4>
          </div>
          <div className="w-full 800px:w-[40%]">
            <h4 className="pt-3 text-[20px]">Payment Info:</h4>
            <h4>
              Status:{" "}
              <span className="font-semibold text-lg text-blue-600"> {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}</span>
            </h4>
          </div>
        </div>
        <br />

        <br />
        <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
        {data?.status !== "Processing refund" && data?.status !== "Refund Success" && (
          <select
            value={status}
            onChange={(e) => handleSelectStatus(e)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {statuses.slice(statuses.indexOf(data?.status)).map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
        )}
        {
          data?.status === "Processing refund" || data?.status === "Refund Success" ? (
            <select value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
            >
              {[
                "Processing refund",
                "Refund Success",
              ]
                .slice(
                  [
                    "Processing refund",
                    "Refund Success",
                  ].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          ) : null
        }


        {/* <button disabled={data?.status === statuses[statuses.length - 1]}
        className={`${styles.button} `}
        onClick={data?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}
      >
        Update Status
      </button> */}

        <button disabled={isPending | data?.status === statuses[statuses.length - 1]}
          onClick={data?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}
          type="button"
          className="group mt-2 relative min-w-[200px] h-[40px] flex gap-x-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16A34A] hover:bg-[#288b4c]"
        > Update Status
          <BeatLoader color="orange"
            loading={isPending}
            cssOverride={{
              display: "block"
            }}
            // size={150}
            aria-label="Loading Spinner"
            data-testid="loader" />
        </button>

      </div>}
    </>
  );
};

export default OrderDetails;
