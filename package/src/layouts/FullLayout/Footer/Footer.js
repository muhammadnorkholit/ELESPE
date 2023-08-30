import React from "react";
import { Box, Typography } from "@mui/material";
const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography>© {new Date().getFullYear()} ELESPE </Typography>
    </Box>
  );
};

export default Footer;
