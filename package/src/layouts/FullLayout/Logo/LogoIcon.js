import React from "react";
import logoicn from "../../../assets/images/logo-dark.svg";
import { Typography } from "@mui/material";
const LogoIcon = (props) => {
  return <img alt="Logo" src={logoicn} {...props} />;
  // return <Typography variant="h3">APSI</Typography>;
};

export default LogoIcon;
