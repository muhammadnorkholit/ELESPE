import React from "react";

import { Box, Button } from "@mui/material";

import BaseCard from "../../BaseCard/BaseCard";

const OutlinedColorButtons = () => {
  return (
    <BaseCard
      title="Color Buttons"
      chiptitle="Outlined Buttons"
      variant="elevation"
      sx={{
        p: 0,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: {
            xs: "inline",
            sm: "flex",
            lg: "flex",
          },
          justifyContent: "center",
        }}
      >
        <Button
          variant="elevation"
          color="primary"
          sx={{
            mr: 1,
            mb: {
              xs: 1,
              sm: 0,
              lg: 0,
            },
          }}
        >
          Primary
        </Button>
        <Button
          variant="elevation"
          color="secondary"
          sx={{
            mr: 1,
            mb: {
              xs: 1,
              sm: 0,
              lg: 0,
            },
          }}
        >
          Secondary
        </Button>
        <Button
          variant="elevation"
          color="error"
          sx={{
            mr: 1,
            mb: {
              xs: 1,
              sm: 0,
              lg: 0,
            },
          }}
        >
          Error
        </Button>
        <Button
          variant="elevation"
          color="warning"
          sx={{
            mr: 1,
            mb: {
              xs: 1,
              sm: 0,
              lg: 0,
            },
          }}
        >
          Warning
        </Button>
        <Button
          variant="elevation"
          color="success"
          sx={{
            mr: 1,
            mb: {
              xs: 1,
              sm: 0,
              lg: 0,
            },
          }}
        >
          Success
        </Button>
      </Box>
    </BaseCard>
  );
};

export { OutlinedColorButtons };
