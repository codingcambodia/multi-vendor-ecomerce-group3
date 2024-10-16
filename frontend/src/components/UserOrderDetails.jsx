import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { Drawer } from "@material-ui/core";
import { useCreateReview } from "../api/product/use-create-review";
import Loader from "./Layout/Loader";
import BeatLoader from "react-spinners/BeatLoader";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const { id } = useParams();
  const { isPending, mutate: createReview } = useCreateReview();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const data = orders && orders.find((item) => item._id === id);
  const reviewHandler = async (e) => {
    createReview({
      user,
      rating,
      comment,
      productId: selectedItem?._id,
      orderId: id,
    }, {
      onSuccess: (res) => {
        toast.success("Create review successfully");
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      }
    })
  };


  const refundHandler = async () => {
    await axios.put(`${server}/order/order-refund/${id}`, {
      status: "Processing refund"
    }).then((res) => {
      toast.success(res.data.message);
      dispatch(getAllOrdersOfUser(user._id));
    }).catch((error) => {
      toast.error(error.response.data.message);
    })
  };



  return (

    <>
      {isPending ? <Loader /> :
        <div className={`py-4 min-h-screen ${styles.section} max-w-[900px] bg-white shadow-md p-8 rounded-md my-10`}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <BsFillBagFill size={30} color="crimson" />
              <h1 className="pl-2 text-[25px]">Order Details</h1>
            </div>
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
            data?.cart.map((item, index) => {
              return (
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
                  {!item.isReviewed && data?.status === "Delivered" ? <button
                    className={`${styles.button} !bg-white border-2 hover:!bg-orange-500 hover:!text-white !text-green-500 !border-green-500 p-2 !min-w-[200px]`}
                    onClick={() => setOpen(true) || setSelectedItem(item)}
                  >
                    Write a review
                  </button> : (
                    null
                  )}
                </div>
              )
            })}

          {/* review popup */}


          <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <div className="w-[560px] p-8">
              <div className="w-full p-3">
                <div className="w-full flex justify-end p-3">
                  <RxCross1
                    size={30}
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                </div>
                <h2 className="text-[30px] font-[500] font-Poppins text-center">
                  Give a Review
                </h2>
                <br />
                <div className="w-full flex">
                  <img
                    src={`${selectedItem?.images[0]?.url}`}
                    alt=""
                    className="w-[80px] h-[80px] object-cover"
                  />
                  <div>
                    <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                    <h4 className="pl-3 text-[20px]">
                      US${selectedItem?.discountPrice} x {selectedItem?.qty}
                    </h4>
                  </div>
                </div>

                <br />
                <br />

                {/* ratings */}
                <h5 className="pl-3 text-[20px] font-[500]">
                  Give a Rating <span className="text-red-500">*</span>
                </h5>
                <div className="flex w-full ml-2 pt-1">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    )
                  )}
                </div>
                <br />
                <div className="w-full ml-3">
                  <label className="block text-[20px] font-[500]">
                    Write a comment
                    <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    name="comment"
                    id=""
                    cols="20"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How was your product? write your expresion about it!"
                    className="mt-2 w-[95%] border p-2 outline-none"
                  ></textarea>
                </div>
                <div
                  className={`${styles.button} text-white text-[20px] ml-3`}
                  onClick={rating > 1 ? reviewHandler : null}
                >
                  Submit
                </div>
              </div>
            </div>
          </Drawer>

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


          {/* {data?.status === "Delivered" & data?.isPaid ? */}
          {/* // did not get product | get Product
          // isPaid 
          // not yet refunded 
          // with specified date  */}

          <button disabled={isPending}
            type="button"
            onClick={refundHandler}
            className="group relative max-w-[200px] h-[40px] flex gap-x-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16A34A] hover:bg-[#288b4c]"
          > Request Refund
            <BeatLoader color="orange"
              loading={isPending}
              cssOverride={{
                display: "block"
              }}
              // size={150}
              aria-label="Loading Spinner"
              data-testid="loader" />
          </button>
          {/* } */}
        </div>
      }
    </>
  );
};

export default UserOrderDetails;
