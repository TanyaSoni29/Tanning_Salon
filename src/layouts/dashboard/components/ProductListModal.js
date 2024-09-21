/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import productListModalData from "./productListModalTableData";
import { useSelector } from "react-redux";

function ProductListModal({ open, setOpen, createProductTransactionOfUser }) {
  const { columns, rows, quantities } = productListModalData(createProductTransactionOfUser);

  const handleBuy = () => {
    Object.keys(quantities).forEach((productId) => {
      const quantity = quantities[productId];
      if (quantity > 0) {
        createProductTransactionOfUser(productId, quantity);
      }
    });
    setOpen(false); // Close the modal after buying
  };

  return (
    <Box
      sx={{
        width: "60vw",
        height: "60vh",
        padding: 2,
        margin: "auto",
        backgroundColor: "#fff",
        borderRadius: 2,
      }}
    >
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
            maxHeight: "40vh", // Set fixed height for Services table
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
      <Box mt={4} display="flex" justifyContent="end" gap="1rem">
        <Button
          variant="contained"
          onClick={handleBuy}
          sx={{
            backgroundColor: "#328BED",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#63A0F5",
              color: "#fff",
            },
            "&:focus": {
              color: "#fff",
            },
            "&:active": {
              color: "#fff",
            },
            "&:disabled": {
              backgroundColor: "#63A0F5",
              color: "#fff",
            },
          }}
        >
          Buy
        </Button>
        <Button variant="contained" color="info" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default ProductListModal;
