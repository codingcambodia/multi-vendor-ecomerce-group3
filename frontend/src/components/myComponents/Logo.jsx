import React from "react";
import { Link } from "react-router-dom";

function Logo({ to }) {
  return <Link to={to}>
    <img className="w-28 h-16 m-2 drop-shadow-md"
      src="https://res.cloudinary.com/dzmihjwnb/image/upload/v1728574123/n88oagcv5uvpmahnwboe.png"
      alt=""
    />
  </Link>;
}

export default Logo;
