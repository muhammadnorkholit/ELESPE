import React from "react";

import { TextField } from "@material-ui/core";

import BaseCard from "../../../components/BaseCard/BaseCard";

const FiOutlineInputNumber = () => {
  return (
    <BaseCard title="Outlined Input Number">
      <TextField
        id="outlined-number"
        label="Number"
        type="number"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        variant="elevation"
      />
    </BaseCard>
  );
};

export default FiOutlineInputNumber;
