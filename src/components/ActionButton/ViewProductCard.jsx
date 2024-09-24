/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import * as React from "react";
import { Card, CardContent, CardMedia, IconButton, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "utils/formateDate";
export default function BasicCard({ onClose }) {
  const { products, productIndex } = useSelector((state) => state.product);
  const activeProduct = products[productIndex];

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
          {activeProduct.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ fontSize: "12px", fontWeight: "bold" }}
        >
          Price: {activeProduct.price}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeProduct.brand}
        </Typography> */}
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          {formatDate(activeProduct.created_at)}
        </Typography>
      </Box>
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: "cover", marginTop: "-1px" }}
        image={
          activeProduct.image ||
          "https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
        }
        alt={activeProduct.name}
      />
      <CardContent>
        {/* <Typography variant="body2" color="text.secondary" paragraph sx={{ fontSize: "12px" }}>
          {activeProduct.description}
        </Typography> */}
      </CardContent>
    </Card>
  );
}
