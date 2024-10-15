
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useActivateUser } from "../api/users/use-activate-user";

const ActivationPage = () => {

  const { mutate: activateUser } = useActivateUser()
  const { activation_token } = useParams();
  const [error, setError] = useState(false);


  console.log(activation_token);

  useEffect(() => {
    if (activation_token) {
      activateUser(activation_token, {
        onSuccess: () => {
          setError(false)
        },
        onError: () => {
          setError(true)
        }
      })
    };

  }, []);



  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <div>

          <p>Your token is expired!</p>
          <Link to="/create-user">
            Registn agaim</Link>
        </div>

      ) : (
        <div><p>Your account has been created suceessfully!</p>
          <Link to="/login-user">Go to Login</Link></div>
      )}
    </div>
  );
};

export default ActivationPage;
