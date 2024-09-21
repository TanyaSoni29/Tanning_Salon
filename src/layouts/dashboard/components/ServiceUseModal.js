/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import { Box, Button, IconButton, MenuItem, Select, Typography } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import serviceListModalData from "./serviceListModalData";
import { useSelector } from "react-redux";

function ServiceUseModal({ open, setOpen, createServiceUseTransactionOfUser }) {
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const quantityOptions = [3, 6, 9, 12, 18, 30, 60, 90, 120];
  // const { columns, rows } = serviceListModalData(createServiceTransactionOfUser);

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value); // Update quantity state
  };
  const handleBuyService = () => {
    if (selectedQuantity) {
      createServiceUseTransactionOfUser(selectedQuantity); // Assuming this function accepts the service ID
      setOpen(false); // Close modal after buying
    } else {
      alert("Please select a service before buying."); // Alert if no service is selected
    }
  };
  return (
    <Box
      sx={{
        width: "40vw",
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
            Select a Service
          </MDTypography>
        </MDBox>
        <MDBox pt={1}>
          {/* <DataTable
            table={{ columns, rows }}
            isSorted={true}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          /> */}
          <Select value={selectedQuantity} onChange={handleQuantityChange} fullWidth sx={{ mb: 2 }}>
            <MenuItem value="" disabled>
              Select Quantity
            </MenuItem>
            {quantityOptions.map((quantity) => (
              <MenuItem key={quantity} value={quantity}>
                {quantity}
              </MenuItem>
            ))}
          </Select>
        </MDBox>
      </MDBox>
      <Box mt={4} display="flex" justifyContent="end" gap="1rem">
        <Button variant="contained" onClick={handleBuyService} color="success">
          Use Service
        </Button>
        <Button variant="contained" color="info" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default ServiceUseModal;
