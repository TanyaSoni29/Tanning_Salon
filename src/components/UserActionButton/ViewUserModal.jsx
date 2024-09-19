/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import * as React from "react";
import { Card, CardMedia, IconButton, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "utils/formateDate";
export default function BasicCard({ onClose }) {
  const { users, userIndex } = useSelector((state) => state.profile);
  const activeUser = users[userIndex];
  console.log(activeUser);
  return (
    <Card
      sx={{
        width: 360,
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
          {activeUser.firstName + " " + activeUser.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeUser.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeUser.phone_number}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeUser.role}
        </Typography>
        <CardMedia
          component="img"
          sx={{
            height: 200,
            objectFit: "cover",
            marginTop: "6px",
            marginBottom: "6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          image={
            activeUser.avatar ||
            "https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
          }
          alt={activeUser.firstName + " " + activeUser.lastName}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "12px", fontWeight: "bold" }}
        >
          {activeUser.address}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeUser.postCode}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeUser.gender}
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ fontSize: "12px", fontWeight: "bold" }}>
          Preferred Location: {activeUser.preferred_location.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          Created On: {formatDate(activeUser.created_at)}
        </Typography>
      </Box>
    </Card>
  );
}
