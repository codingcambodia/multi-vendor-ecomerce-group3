import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { DataGrid } from "@material-ui/data-grid";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import { Drawer } from "@material-ui/core";
import BeatLoader from "react-spinners/BeatLoader";

const AllWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState('Processing');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/withdraw/get-all-withdraw-request`, {
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
    { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 100,
      flex: 1,
    },
    // {
    //   field: "shopId",
    //   headerName: "Shop Id",
    //   minWidth: 180,
    //   flex: 1.4,
    // },
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
    },
    {
      field: "createdAt",
      headerName: "Request given at",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: " ",
      headerName: "Update Status",
      type: "number",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {

        return (
          <BiEdit
            size={20}
            className={`${params.row.status !== "Processing" ? 'hidden' : ''} mr-5 cursor-pointer text-green-600`}
            onClick={() => setOpen(true) || setWithdrawData(params.row)}
          />
        );
      },
    },
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
        // shopId: item.seller._id,
        name: item.seller.name,
        amount: "US$ " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });
  return (
    <div className="w-full flex m-6 bg-white shadow-sm items-center justify-center p-8">
      <div className="w-full">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>


      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="w-[500px] p-8">


          <div className="flex justify-end w-full">
            <RxCross1 size={25} onClick={() => setOpen(false)} />
          </div>
          <h1 className="text-[25px] text-center py-4">
            Update Withdraw status
          </h1>
          <br />
          <select
            name=""
            id=""
            onChange={(e) => setWithdrawStatus(e.target.value)}
            className="w-full h-[40px] border rounded"
          >
            <option value={withdrawStatus}>{withdrawData?.status}</option>
            <option value={withdrawStatus}>Succeed</option>
          </select>
          <button disabled={isLoading}
            onClick={handleSubmit}
            type="button"
            className="group relative w-full h-[40px] flex gap-x-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16A34A] hover:bg-[#288b4c]"
          > Approve Withdraw
            <BeatLoader color="orange"
              loading={isLoading}
              cssOverride={{
                display: "block"
              }}
              // size={150}
              aria-label="Loading Spinner"
              data-testid="loader" />
          </button>
        </div>


      </Drawer>
    </div>
  );
};

export default AllWithdraw;
