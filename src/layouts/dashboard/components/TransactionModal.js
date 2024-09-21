/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import CloseIcon from "@mui/icons-material/Close";

function TransactionModal({ open, setOpen, scols, srows, columns, rows }) {
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        width: "60vw",
        height: "80vh",
        padding: 2,
        margin: "auto",
        position: "relative",
        backgroundColor: "#fff",
        borderRadius: 2,
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "black",
          zIndex: 2,
        }}
      >
        <CloseIcon />
      </IconButton>
      <MDBox>
        <MDBox
          mx={1}
          mt={4}
          py={1}
          px={2}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" color="white">
            Services
          </MDTypography>
        </MDBox>
        <MDBox
          pt={1}
          sx={{
            maxHeight: "30vh", // Set fixed height for Services table
            overflowY: "auto", // Add scrollbar if content overflows
          }}
        >
          <DataTable
            table={{ columns: scols, rows: srows }}
            isSorted={true}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
        </MDBox>
      </MDBox>
      <MDBox>
        <MDBox
          mx={1}
          mt={2}
          py={1}
          px={2}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" color="white">
            Products
          </MDTypography>
        </MDBox>
        <MDBox
          pt={1}
          sx={{
            maxHeight: "30vh", // Set fixed height for Services table
            overflowY: "auto", // Add scrollbar if content overflows
          }}
        >
          <DataTable
            table={{ columns, rows }}
            isSorted={true}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
        </MDBox>
      </MDBox>
    </Box>
  );
}

export default TransactionModal;
