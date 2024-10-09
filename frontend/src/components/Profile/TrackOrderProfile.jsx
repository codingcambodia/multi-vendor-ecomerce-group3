import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { MdTrackChanges } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetAllCustomerOrders } from "../../api/order/use-get-customer-orders";
import { useSelector } from "react-redux";
import Loader from "../Layout/Loader";

const TrackOrderProfile = () => {
  const { user } = useSelector((state) => state.user);
  // const { orders } = useSelector((state) => state.order);
  const { isPending, data: orderData } = useGetAllCustomerOrders(user?._id);



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
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges className="text-orange-500" size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orderData?.orders &&
    orderData?.orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      {isPending ? <Loader /> : <div className="p-8 bg-white shadow-md rounded-lg">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>}
    </>
  );
};


export default TrackOrderProfile;