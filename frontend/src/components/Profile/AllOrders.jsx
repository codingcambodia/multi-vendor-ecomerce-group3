import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

import { AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllCustomerOrders } from "../../api/order/use-get-customer-orders";
import Loader from "../Layout/Loader";


const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { isPending, data } = useGetAllCustomerOrders(user._id);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight className="text-orange-500" size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  data?.orders &&
    data?.orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });


  return <>
    {isPending ? (
      <Loader />
    ) : (
      <div className="w-full mx-8 mt-10 bg-white p-8">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    )}
  </>

};

export default AllOrders;