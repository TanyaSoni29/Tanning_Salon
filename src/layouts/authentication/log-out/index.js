/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from "react";
import { Box, Button, Typography } from "@mui/material";
function LogoutModal({ open, setOpen, handleLogout }) {
  const handleClose = () => setOpen(false);

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
        Are you sure you want to log out?
      </Typography>
      <Box mt={2} display="flex" justifyContent="end" gap="1rem">
        <Button
          variant="contained"
          onClick={handleLogout}
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
        <Button variant="contained" color="info" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default LogoutModal;
