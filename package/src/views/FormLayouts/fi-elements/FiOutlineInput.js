import React from "react";

import { TextField } from "@material-ui/core";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiOutlineInput = () => {
  return (
    <BaseCard title="Outlined Input">
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="elevation"
        fullWidth
      />
    </BaseCard>
  );
};

export default FiOutlineInput;
