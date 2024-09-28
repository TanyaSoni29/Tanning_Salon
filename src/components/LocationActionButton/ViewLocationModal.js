/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import * as React from "react";
import { Card, CardMedia, IconButton, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "utils/formateDate";
export default function BasicCard({ onClose }) {
  const { locations, locationIndex } = useSelector((state) => state.location);
  const activeLocation = locations[locationIndex];
  console.log(activeLocation);
  return (
    <Card
      sx={{
        width: "20vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "text.primary",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
        }}
        onClick={() => onClose()}
      >
        <CloseIcon />
      </IconButton>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" component="div">
          {activeLocation.name}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeLocation.phone_number}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeLocation.address}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeLocation.post_code}
        </Typography>
      </Box>
    </Card>
  );
}
