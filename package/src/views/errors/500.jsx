import React from "react";
import { Box, Typography } from "@mui/material";

function ServerErrorPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          500 - Terjadi Kesalahan Server
        </Typography>
        <Typography variant="subtitle1" component="p">
          Mohon maaf, terjadi kesalahan pada server. Silakan coba lagi nanti.
        </Typography>
      </Box>
    </Box>
  );
}

export default ServerErrorPage;
