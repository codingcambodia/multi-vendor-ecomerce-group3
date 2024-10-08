import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const BackToHomeButton = ({to}) => {
  return <Link className="inline-flex gap-2 hover:gap-4 text-lg hover:underline items-center text-orange-500 hover:text-orange-300 fixed top-10 duration-700" to={to}><BiArrowBack /> Back to homepage</Link>;
};

export default BackToHomeButton;
