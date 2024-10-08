import { Drawer } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, {  useState } from "react";

import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import { useCreateCoupon } from "../../api/coupon/use-create-coupon";
import { useGetCoupons } from "../../api/coupon/user-get-coupons";
import { useDeleteCoupon } from "../../api/coupon/use-delete-coupon";
import DeleteConfirmation from "../myComponents/DeleteConfirmation";
import { useGetProductsByShop } from "../../api/product/use-getproducts-by-shop";

const AllCoupons = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [name, setName] = useState("");
  const [minAmount, setMinAmout] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [value, setValue] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  // const { products } = useSelector((state) => state.products);
  const { isPending: createPending, mutate: createCoupon } = useCreateCoupon();
  const { isPending: getPending, data: coupouns } = useGetCoupons(seller._id);
  const { isPending: getProductPending, data: products } = useGetProductsByShop(seller._id);
  const { isPending: deletePending, mutate: deleteCoupon } = useDeleteCoupon()
  const handleDelete = async (id) => {

    deleteCoupon(
      id
      , {
        onSuccess: () => {
          toast.success("deleted!");
        },
        onError: (err) => {
          toast.error(err.response.data.message);
        }
      }
    )
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createCoupon({
      name,
      minAmount,
      maxAmount,
      selectedProducts,
      value,
      shopId: seller._id,
    }, {
      onSuccess: () => {
        toast.success("Coupon code created successfully!");
        setOpenDrawer(false);

      },
      onError: (err) => {
        toast.error(err.response.data.message);
      }

    }

    )

  }



  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
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
            <DeleteConfirmation onDelete={() => handleDelete(params.id)
            } />
          </>
        );
      },
    },
  ];

  const row = [];

  coupouns?.couponCodes &&
    coupouns?.couponCodes?.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });

  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }
  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }

  const isLoading = getPending || createPending || deletePending || getProductPending

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 mt-10 bg-white p-8">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={handleOpenDrawer}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />

          <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
            <div className="w-[500px] p-8">
              <h5 className="text-[30px] font-Poppins text-center">
                Create Coupon code
              </h5>
              {/* create coupoun code */}
              <form onSubmit={handleSubmit} >
                <br />
                <div>
                  <label className="pb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your coupon code name..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Discount Percentenge{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="value"
                    value={value}
                    required
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter your coupon code value..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">Min Amount</label>
                  <input
                    type="number"
                    name="value"
                    value={minAmount}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setMinAmout(e.target.value)}
                    placeholder="Enter your coupon code min amount..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">Max Amount</label>
                  <input
                    type="number"
                    name="value"
                    value={maxAmount}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setMaxAmount(e.target.value)}
                    placeholder="Enter your coupon code max amount..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">Selected Product</label>
                  <select
                    className="w-full mt-2 border h-[35px] rounded-[5px]"
                    value={selectedProducts}
                    onChange={(e) => setSelectedProducts(e.target.value)}
                  >
                    <option value="Choose your selected products">
                      Choose a selected product
                    </option>
                    {products?.products &&
                      products?.products.map((i) => (
                        <option value={i.name} key={i.name}>
                          {i.name}
                        </option>
                      ))}
                  </select>
                </div>
                <br />
                <div>
               
                  <button disabled={createPending}
                    type="submit"
                    className="group relative w-full h-[40px] flex gap-x-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16A34A] hover:bg-[#288b4c]"
                  > Create Coupon
                    <BeatLoader color="orange"
                      loading={createPending}
                      cssOverride={{
                        display: "block"
                      }}
                      // size={150}
                      aria-label="Loading Spinner"
                      data-testid="loader" />
                  </button>
                </div>
              </form>
            </div>
          </Drawer>
        </div>
      )}
    </>

  )
}


export default AllCoupons;
