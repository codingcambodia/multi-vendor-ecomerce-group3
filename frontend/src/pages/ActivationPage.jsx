
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useActivateUser } from "../api/users/use-activate-user";

const ActivationPage = () => {

  const { mutate: activateUser } = useActivateUser()
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

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
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
