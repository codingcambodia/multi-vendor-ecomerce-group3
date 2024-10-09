
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import { Drawer } from "@material-ui/core";
import BeatLoader from "react-spinners/BeatLoader";
import { useAddCustomerAddress } from "../../api/users/use-update-customer-address";
import Loader from "../Layout/Loader";
import DeleteConfirmation from "../myComponents/DeleteConfirmation";
import { useDeleteCustomerAddress } from "../../api/users/use-delete-customer-address";
import { useGetUser } from "../../api/users/use-get-user";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  // const { user } = useSelector((state) => state.user);

  const { isPending: getUserPending, data } = useGetUser();
  const { isPending, mutate: addAddCustomerAddress } = useAddCustomerAddress();
  const { isPending: deletePending, mutate: deleteCustomerAddress } = useDeleteCustomerAddress();
  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      addAddCustomerAddress({
        country,
        city,
        address1,
        address2,
        zipCode,
        addressType
      }, {
        onSuccess: () => {
          toast.success("Adding address successfully.")
          setOpen(false);
          setCountry("");
          setCity("");
          setAddress1("");
          setAddress2("");
          setZipCode(null);
          setAddressType("");
        },
        onError: (err) => {
          toast.error(err.response.data.message)
        }
      })

    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    deleteCustomerAddress(id, {
      onSuccess: () => {
        toast.success("Address deleted successfully!")
      },
      onError: (err) => {
        toast.error(err.response.data.message)
      }
    });
  };


  const isLoading = isPending | deletePending | getUserPending;
  return (
    <>
      {
        isLoading ? <Loader /> :
          <div className="w-full p-8 bg-white shadow-md rounded-lg">

            <div className="flex w-full items-center justify-between">
              <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
                My Addresses
              </h1>
              <div
                className={`${styles.button} !rounded-md`}
                onClick={() => setOpen(true)}
              >
                <span className="text-[#fff]">Add New</span>
              </div>
            </div>
            <br />
            {data?.user &&
              data?.user.addresses.map((item, index) => (
                <div
                  className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
                  key={index}
                >
                  <div className="flex items-center">
                    <h5 className="pl-5 font-[600]">{item.addressType}</h5>
                  </div>
                  <div className="pl-8 flex items-center">
                    <h6 className="text-[12px] 800px:text-[unset]">
                      {item.address1} {item.address2}
                    </h6>
                  </div>
                  <div className="pl-8 flex items-center">
                    <h6 className="text-[12px] 800px:text-[unset]">
                      {data?.user && data?.user.phoneNumber}
                    </h6>
                  </div>
                  {/* <div className="min-w-[10%] flex items-center justify-between pl-8">
                    <AiOutlineDelete
                      size={20}
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDelete(item)}
                    />
                  </div> */}

                  <DeleteConfirmation onDelete={() => handleDelete(item)} />
                </div>
              ))}

            {data?.user && data?.user.addresses.length === 0 && (
              <h5 className="text-center pt-8 text-[18px]">
                You do not have any saved address!
              </h5>
            )}

            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
              <div className="w-[500px] p-8">


                <h1 className="text-center text-[25px] font-Poppins">
                  Add New Address
                </h1>
                <div className="w-full">
                  <form onSubmit={handleSubmit} className="w-full">
                    <div className="w-full block p-4">
                      <div className="w-full pb-2">
                        <label className="block pb-2">Country</label>
                        <select
                          name=""
                          id=""
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full border h-[40px] rounded-[5px]"
                        >
                          <option value="" className="block border pb-2">
                            country
                          </option>
                          {Country &&
                            Country.getAllCountries().map((item) => (
                              <option
                                className="block pb-2"
                                key={item.isoCode}
                                value={item.isoCode}
                              >
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="w-full pb-2">
                        <label className="block pb-2">City</label>
                        <select
                          name=""
                          id=""
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full border h-[40px] rounded-[5px]"
                        >
                          <option value="" className="block border pb-2">
                            choose your city
                          </option>
                          {State &&
                            State.getStatesOfCountry(country).map((item) => (
                              <option
                                className="block pb-2"
                                key={item.isoCode}
                                value={item.isoCode}
                              >
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="w-full pb-2">
                        <label className="block pb-2">Address 1</label>
                        <input
                          type="address"
                          className={`${styles.input}`}
                          required
                          value={address1}
                          onChange={(e) => setAddress1(e.target.value)}
                        />
                      </div>
                      <div className="w-full pb-2">
                        <label className="block pb-2">Address 2</label>
                        <input
                          type="address"
                          className={`${styles.input}`}
                          required
                          value={address2}
                          onChange={(e) => setAddress2(e.target.value)}
                        />
                      </div>

                      <div className="w-full pb-2">
                        <label className="block pb-2">Zip Code</label>
                        <input
                          type="number"
                          className={`${styles.input}`}
                          required
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                        />
                      </div>

                      <div className="w-full pb-2">
                        <label className="block pb-2">Address Type</label>
                        <select
                          name=""
                          id=""
                          value={addressType}
                          onChange={(e) => setAddressType(e.target.value)}
                          className="w-[95%] border h-[40px] rounded-[5px]"
                        >
                          <option value="" className="block border pb-2">
                            Choose your Address Type
                          </option>
                          {addressTypeData &&
                            addressTypeData.map((item) => (
                              <option
                                className="block pb-2"
                                key={item.name}
                                value={item.name}
                              >
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className=" w-full py-4">
                        <button disabled={isPending}
                          type="submit"
                          className="group relative w-full h-[40px] flex gap-x-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16A34A] hover:bg-[#288b4c]"
                        > Save Address
                          <BeatLoader color="orange"
                            loading={isPending}
                            cssOverride={{
                              display: "block"
                            }}
                            // size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>


              </div>
            </Drawer>
          </div>
      }</>
  );
};


export default Address;