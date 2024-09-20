/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import * as React from "react";
import { Card, CardMedia, IconButton, Typography, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "utils/formateDate";
export default function BasicCard({ onClose, handleSelectedProfileModal }) {
  return (
    <Box
      sx={{
        width: 300,
        padding: 2,
        margin: "auto",
        marginTop: "15%",
        backgroundColor: "#fff",
        borderRadius: 2,
      }}
    >
      <Typography id="logout-modal-title" variant="h6">
        Have you used a tanning salon in the last 24 hours?
      </Typography>
      <Box mt={2} display="flex" justifyContent="end" gap="1rem">
        <Button
          variant="contained"
          onClick={handleSelectedProfileModal}
          sx={{
            backgroundColor: "#328BED",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "#63A0F5",
            },
          }}
        >
          Yes
        </Button>
        <Button variant="contained" color="info" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
