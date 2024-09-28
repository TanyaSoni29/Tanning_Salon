/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import * as React from "react";
import { Card, CardMedia, IconButton, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "utils/formateDate";
export default function BasicCard({ onClose }) {
  const { users, userIndex } = useSelector((state) => state.profile);
  const { locations } = useSelector((state) => state.location);
  const activeUser = users[userIndex];

  const preferredLocation = locations.find(
    (location) => location.id === activeUser.profile?.preferred_location
  );
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
          {activeUser.profile?.firstName + " " + activeUser.profile?.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeUser.user?.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeUser.profile?.phone_number}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeUser.user?.role}
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
          alt={activeUser.profile?.firstName + " " + activeUser.profile?.lastName}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "12px", fontWeight: "bold" }}
        >
          {activeUser.profile?.address}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeUser.profile?.post_code}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          {activeUser.profile?.gender}
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ fontSize: "12px", fontWeight: "bold" }}>
          Preferred Location: {preferredLocation?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          Created On: {formatDate(activeUser.user.created_at)}
        </Typography>
      </Box>
    </Card>
  );
}
