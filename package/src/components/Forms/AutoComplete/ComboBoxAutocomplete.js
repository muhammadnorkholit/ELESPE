import React from "react";

import { TextField } from "@mui/material";

import Autocomplete from "@mui/material/Autocomplete";

import BaseCard from "../../BaseCard/BaseCard";

const ComboBoxAutocomplete = ({ data, label, placeholder, callback }) => {
  return (
    <BaseCard title={label}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        fullWidth
        getOptionLabel={(s) => s.label}
        onChange={callback} // Handle onChange event
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              onChange={(e) => console.log(e)}
              label={placeholder}
            />
          );
        }}
      />
    </BaseCard>
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994, id: 1 },
  { label: "The Godfather", year: 1972, id: 2 },
];

export { ComboBoxAutocomplete };
