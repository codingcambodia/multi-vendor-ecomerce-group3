import React, { useState } from "react";
import {
  AiOutlineCamera,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { useUpdateUserInfo } from "../../api/users/use-update-user-info";
import BeatLoader from "react-spinners/BeatLoader";
import { useUpdateUserAvatar } from "../../api/users/use-update-user-avatar";
import { useGetUser } from "../../api/users/use-get-user";
import Loader from "../Layout/Loader";


const Profile = ({ active }) => {
  const { isPending: updateInforPending, mutate: updateInfo } = useUpdateUserInfo();
  const { isPending: updateAvatarPending, mutate: updateAvatar } = useUpdateUserAvatar();
  const { isPending: getUserPending, data } = useGetUser();

  console.log(data)
  // const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(data && data?.user?.name);
  const [email, setEmail] = useState(data && data?.user?.email);
  const [phoneNumber, setPhoneNumber] = useState(data && data?.user?.phoneNumber);
  const [password, setPassword] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    updateInfo({ name, email, phoneNumber, password }, {
      onSuccess: () => {
        toast.success("User Info updated succeffully")
      },
      onError: (err) => {
        toast.error(err.response.data.message)
      }
    })
  };

  const handleImage = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {

        updateAvatar({ avatar: reader.result }, {
          onSuccess: () => {

            toast.success("avatar updated successfully!");
          },
          onError: (err) => {
            toast.error(err.response.data.message)
          }
        })

      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const isLoading = getUserPending || updateAvatarPending || updateInforPending


  return <>
    {isLoading ? <Loader /> : <>
      <div className="flex justify-center w-full ">
        {updateAvatarPending ? <BeatLoader color="orange"
          cssOverride={{
            display: "block"
          }}
          aria-label="Loading Spinner"
          data-testid="loader" /> : <div className="relative">
          <img
            src={`${data?.user?.avatar?.url}`}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
            alt=""
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
            <label htmlFor="image">
              <AiOutlineCamera />
            </label>
          </div>
        </div>}
      </div>
      <br />
      <br />
      <div className="w-full px-5">
        <form onSubmit={handleSubmit} >
          <div className="w-full 800px:flex block pb-3">
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full 800px:flex block pb-3">
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <input
                type="number"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Enter your password</label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button disabled={updateInforPending}
            type="submit"
            className="group relative min-w-[400px] h-[40px] flex gap-x-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16A34A] hover:bg-[#288b4c]"
          > Update Info
            <BeatLoader color="orange"
              loading={updateInforPending}
              cssOverride={{
                display: "block"
              }}

              aria-label="Loading Spinner"
              data-testid="loader" />
          </button>

        </form>
      </div>
    </>}
  </>
}

export default Profile;
