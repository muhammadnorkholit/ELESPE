import React from "react";
import { Button } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";

const Download = ({ link }) => {
  const handleDownload = () => {
    const fileUrl = `/template${link}`;
    window.open(fileUrl, "_self");
  };

  return (
    <div>
      <Button
        sx={{ whiteSpace: "nowrap" }}
        variant="contained"
        onClick={handleDownload}
        startIcon={<GetAppIcon />}
      >
        Download Template
      </Button>
    </div>
  );
};

export default Download;
