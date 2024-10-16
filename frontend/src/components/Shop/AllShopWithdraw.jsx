
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { DataGrid } from "@material-ui/data-grid";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import { Drawer } from "@material-ui/core";
import WithdrawMoney from "./WithdrawMoney";

const AllShopWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState('Processing');

  useEffect(() => {
    axios
      .get(`${server}/withdraw/get-all-withdraw-request-shop`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.withdraws);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const columns = [
    {
      field: "createdAt",
      headerName: "Request At",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "shopId",
      headerName: "Shop Id",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "status",
      type: "text",
      minWidth: 80,
      flex: 0.5,
    }

    // {
    //   field: " ",
    //   headerName: "Update Status",
    //   type: "number",
    //   minWidth: 130,
    //   flex: 0.6,
    //   renderCell: (params) => {

    //     return (
    //       <BiEdit
    //         size={20}
    //         className={`${params.row.status !== "Processing" ? 'hidden' : ''} mr-5 cursor-pointer text-green-600`}
    //         onClick={() => setOpen(true) || setWithdrawData(params.row)}
    //       />
    //     );
    //   },
    // },
  ];

  const handleSubmit = async () => {
    await axios
      .put(`${server}/withdraw/update-withdraw-request/${withdrawData.id}`, {
        sellerId: withdrawData.shopId,
      }, { withCredentials: true })
      .then((res) => {
        toast.success("Withdraw request updated successfully!");
        setData(res.data.withdraws);
        setOpen(false);
      });
  };

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        shopId: item.seller._id,
        name: item.seller.name,
        amount: "US$ " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });
  return (
    <div className="w-full flex flex-col m-6 items-center justify-center">
      <WithdrawMoney />
      <div className="w-full bg-white shadow-sm p-6">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>

    </div>
  );
};

export default AllShopWithdraw;
