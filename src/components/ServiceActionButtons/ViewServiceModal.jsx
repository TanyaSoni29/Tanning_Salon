/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import * as React from "react";
import { Card, CardContent, CardMedia, IconButton, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "utils/formateDate";
export default function BasicCard({ onClose }) {
  const { services, serviceIndex } = useSelector((state) => state.service);
  const activeService = services[serviceIndex];

  return (
    <Card sx={{ width: 320, display: "flex", flexDirection: "column" }}>
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
      <Box sx={{ paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 1 }}>
        <Typography variant="h6" component="div">
          Service Name: {activeService.serviceName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          Minutes Available: {activeService.minutesAvailable}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          Listed On: {formatDate(activeService.created_at)}
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ fontSize: "12px", fontWeight: "bold" }}>
          Total price: {activeService.price}
        </Typography>
      </Box>
      {/* <CardMedia
        component="img"
        sx={{ height: 200, objectFit: "cover", marginTop: "-1px" }}
        image={
          activeProduct.image ||
          "https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
        }
        alt={activeProduct.name}
      /> */}
    </Card>
  );
}
