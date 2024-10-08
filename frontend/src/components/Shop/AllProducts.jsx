import { Button, Drawer } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../Layout/Loader";
import styles from "../../styles/styles";
import CreateProduct from "./CreateProduct";
import DeleteConfirmation from "../myComponents/DeleteConfirmation";
import { useGetProductsByShop } from "../../api/product/use-getproducts-by-shop";
import { useDeleteProduct } from "../../api/product/use-delete-product";
import { toast } from "react-toastify";

const AllProducts = () => {
  const { seller } = useSelector((state) => state.seller);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { isPending: getLoading, data } = useGetProductsByShop(seller._id);
  const { isPending: deletePending, mutate: deleteProduct } = useDeleteProduct();

 
  const handleDelete = (id) => {
    deleteProduct(id, {
      onSuccess: () => {
        toast.success("product deleted!");
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      }
    })
  
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <DeleteConfirmation onDelete={() => handleDelete(params.id)} />
          </>
        );
      },
    },
  ];

  const row = [];

  data?.products &&
    data?.products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });


  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }
  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }

  const isLoading = getLoading || deletePending;

  return (
    <>

      {isLoading ? (
        <Loader />
      ) : (

        <div className="w-full mx-4 mt-8 bg-white p-8 pt-4">
          <div className="flex py-8 justify-between items-center">
            <h2 className="text-xl font-semibold">Product List</h2>
            <button onClick={handleOpenDrawer} className={styles.button}>Create new</button>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
      <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
        <div className="w-[560px] p-8">
          <CreateProduct closeDrawer={handleCloseDrawer} />
        </div>
      </Drawer>
    </>
  );
};

export default AllProducts;
