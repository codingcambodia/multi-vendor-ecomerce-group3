import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";
import { AiOutlineDelete } from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader";
import { useRequestWithdraw } from "../../api/withdraw/use-request-withdraw";
import { Drawer } from "@material-ui/core";
import { useDeleteWithdrawMethod } from "../../api/shop/use-delete-withdraw-method";
import { useUpdatePaymentMethod } from "../../api/shop/use-update-payment-method";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(20);

  const { isPending: requestWithdrawPending, mutate: requestWithdraw } = useRequestWithdraw();
  const { isPending: deletePending, mutate: deleteWithdrawMethod } = useDeleteWithdrawMethod();
  const { isPending: createPending, mutate: updatePaymentMethod } = useUpdatePaymentMethod();

  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: "",
    bankAddress: "",
  });

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };

    setPaymentMethod(false);

    updatePaymentMethod({ withdrawMethod }, {
      onSuccess: () => {
        toast.success("Withdraw method added successfully!");
        dispatch(loadSeller());
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: null,
          bankAccountNumber: null,
          bankHolderName: "",
          bankAddress: "",
        });

      },
      onError: (error) => {
        console.log(error.response.data.message);
      }

    })
  };

  const deleteHandler = async () => {
    deleteWithdrawMethod({}, {
      onSuccess: () => {
        toast.success("Withdraw method deleted successfully!");
        dispatch(loadSeller());
      }, onError: (err) => {
        toast.success(err.response.data.message);
      }
    })
  };

  const error = () => {
    toast.error("You not have enough balance to withdraw!");
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 20 || withdrawAmount > availableBalance) {
      toast.error("You can't withdraw this amount!");
    } else {
      const amount = withdrawAmount;
      requestWithdraw({ amount }, {
        onSuccess: () => {
          toast.success("Withdraw money request is successful!");
        },
        onError: (err) => {
          toast.success(err.response.data.message);
        }
      })
    }
  };

  const availableBalance = seller?.availableBalance.toFixed(2);

  return (
    <div className="w-fit p-6">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <div className="min-w-[500px] min-h-[140px] p-8  flex flex-col items-center shadow-md">
          <h5 className="text-[20px] pb-4">
            Available Balance:<span className="font-[500] text-orange-600"> ${availableBalance}</span>
          </h5>
          <div
            className={`${styles.button} text-white !h-[45px] !rounded`}
            onClick={() => (availableBalance < 20 ? error() : setOpen(true))}
          >
            Withdraw
          </div>
        </div>
      </div>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="w-[500px] p-8">
          <div className="w-full flex justify-end">
            <RxCross1
              size={20}
              onClick={() => setOpen(false) || setPaymentMethod(false)}
              className="cursor-pointer text-orange-500"
            />
          </div>
          {paymentMethod ? (
            <div>
              <h3 className="text-[20px] font-[500] py-4">
                Add new Withdraw Method:
              </h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    required
                    value={bankInfo.bankName}
                    onChange={(e) =>
                      setBankInfo({ ...bankInfo, bankName: e.target.value })
                    }
                    id=""
                    placeholder="Enter your Bank name!"
                    className={`${styles.input} mt-2`}
                  />
                </div>
                <div className="pt-2">
                  <label className="text-sm">
                    Bank Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    value={bankInfo.bankCountry}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankCountry: e.target.value,
                      })
                    }
                    id=""
                    required
                    placeholder="Enter your bank Country!"
                    className={`${styles.input} mt-2`}
                  />
                </div>
                <div className="pt-2">
                  <label className="text-sm">
                    Bank Swift Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    required
                    value={bankInfo.bankSwiftCode}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankSwiftCode: e.target.value,
                      })
                    }
                    placeholder="Enter your Bank Swift Code!"
                    className={`${styles.input} mt-2`}
                  />
                </div>

                <div className="pt-2">
                  <label className="text-sm">
                    Bank Account Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name=""
                    id=""
                    value={bankInfo.bankAccountNumber}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankAccountNumber: e.target.value,
                      })
                    }
                    required
                    placeholder="Enter your bank account number!"
                    className={`${styles.input} mt-2`}
                  />
                </div>
                <div className="pt-2">
                  <label className="text-sm">
                    Bank Holder Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    required
                    value={bankInfo.bankHolderName}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankHolderName: e.target.value,
                      })
                    }
                    id=""
                    placeholder="Enter your bank Holder name!"
                    className={`${styles.input} mt-2`}
                  />
                </div>

                <div className="pt-2">
                  <label className="text-sm">
                    Bank Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    required
                    id=""
                    value={bankInfo.bankAddress}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        bankAddress: e.target.value,
                      })
                    }
                    placeholder="Enter your bank address!"
                    className={`${styles.input} mt-2`}
                  />
                </div>

                <button disabled={createPending}
                  onClick={handleSubmit}
                  type="button"
                  className="group mt-3 relative w-full h-[40px] flex gap-x-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16A34A] hover:bg-[#288b4c]"
                > Create Payment Method
                  <BeatLoader color="orange"
                    loading={createPending}
                    cssOverride={{
                      display: "block"
                    }}
                    // size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader" />
                </button>
              </form>
            </div>
          ) : (
            <>
              <h3 className="text-[22px] font-[500]">
                Available Withdraw Methods
              </h3>

              {seller && seller?.withdrawMethod ? (
                <div>
                  <div className="flex w-full border border-green-600 p-4 justify-between items-center my-4 rounded-sm">
                    <div className="">
                      <h5>
                        Account Number:{" "}
                        {"*".repeat(
                          seller?.withdrawMethod.bankAccountNumber.length - 3
                        ) +
                          seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                      </h5>
                      <h5>Bank Name: {seller?.withdrawMethod.bankName}</h5>
                    </div>


                    <button disabled={deletePending}
                      onClick={() => deleteHandler()}
                      type="button"
                      className=""
                    >   <AiOutlineDelete
                        size={20}
                        className="cursor-pointer text-red-600"

                      />
                      <BeatLoader color="orange"
                        loading={deletePending}
                        cssOverride={{
                          display: "block"
                        }}
                        // size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader" />
                    </button>
                  </div>
                  <br />
                  <h4>Available Balance: <span className="font-[500] text-orange-500">{availableBalance}$</span></h4>
                  <br />
                  <div className=" w-full flex flex-col gap-y-4">
                    <label className="text-slate-500 text-sm">Enter Amount you want to withdraw below (It must be equal or above 20 dollars but less than available amount.)</label>
                    <input
                      type="number"
                      placeholder="Amount..."
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="border border-green-600  p-2 rounded text-orange-500"
                    />
                    <button disabled={requestWithdrawPending}
                      onClick={withdrawHandler}
                      type="button"
                      className="group relative w-full h-[40px] flex gap-x-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16A34A] hover:bg-[#288b4c]"
                    > Withdraw Money
                      <BeatLoader color="orange"
                        loading={requestWithdrawPending}
                        cssOverride={{
                          display: "block"
                        }}
                        // size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-[18px] py-4">
                    No Withdraw Methods available!
                  </p>
                  <div className="w-full flex items-center">
                    <div
                      className={`${styles.button} text-[#fff] text-[16px] mt-4`}
                      onClick={() => setPaymentMethod(true)}
                    >
                      Add new
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </Drawer>
    </div>
  );
};

export default WithdrawMoney;
