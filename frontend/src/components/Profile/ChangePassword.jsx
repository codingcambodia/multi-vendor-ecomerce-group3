
import { toast } from "react-toastify";
import { useUpdatePassword } from "../../api/users/use-update-password";
import styles from "../../styles/styles";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isPending: updatePending, mutate: updatePassword } = useUpdatePassword();

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
  

    updatePassword({ oldPassword, newPassword, confirmPassword }, {
      onSuccess: (res) => {
        toast.success("Updated password success");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      }

    })


  };
  return (
    <div className="max-w-[400px] p-8 bg-white shadow-md rounded-lg mx-auto">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center "
        >
          <div className=" w-[100%] mt-8">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[100%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          
          
            <button disabled={updatePending}
              type="submit"
              className="group mt-3 relative max-w-[600px] h-[40px] flex gap-x-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16A34A] hover:bg-[#288b4c]"
            > Update Password
              <BeatLoader color="orange"
                loading={updatePending}
                cssOverride={{
                  display: "block"
                }}

                aria-label="Loading Spinner"
                data-testid="loader" />
            </button> 
          </div>
        </form>
      </div>
    </div>
  );
};


export default ChangePassword;