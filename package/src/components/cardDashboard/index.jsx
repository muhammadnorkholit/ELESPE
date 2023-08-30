import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Icon, IconButton, Link } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ArrowRight, ArrowRightAltRounded } from "@mui/icons-material";

const countContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 16, // Mengatur jarak antara ikon dan hitungan
  flexDirection: "column",
};

const CardInfoTotalData = ({ title, count, icon, iconColor, url }) => {
  return (
    <Card style={{ overflow: "visible" }} variant="elevation">
      <CardContent sx={{ padding: "10px", paddingBottom: "0 !important" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            borderBottom: "1px solid #a9a9a978",
            marginBottom: "10px",
          }}
        >
          <Box
            sx={{
              width: "80px",
              height: "80px",
              borderRadius: "7px",
              transform: "translateY(-40px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            color={iconColor}
          >
            <IconButton disabled>{icon}</IconButton>
          </Box>
          <Box style={countContainerStyle}>
            <Typography variant="h5" sx={{ opacity: ".5" }}>
              {title}
            </Typography>
            <Typography variant="h2" component="div">
              {count}
            </Typography>
          </Box>
        </Box>
        <Link
          href={url}
          sx={{
            display: "flex",
            cursor: "pointer",
            justifyContent: "space-between",
            color: "black",
            textDecoration: "none", // Menghilangkan underline
            "&:hover": {
              color: "darkblue",
              transition: "color 0.3s ease-in-out",
            },
          }}
        >
          <Typography variant="h5">Selengkapnya</Typography>
          <ArrowRightAltRounded />
        </Link>{" "}
      </CardContent>
    </Card>
  );
};

export default CardInfoTotalData;
