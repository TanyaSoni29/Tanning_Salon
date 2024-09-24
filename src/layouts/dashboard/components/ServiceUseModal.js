/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import { Box, Button, IconButton, MenuItem, Select, Typography } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import serviceListModalData from "./serviceListModalData";
import { useSelector } from "react-redux";

function ServiceUseModal({
  open,
  setOpen,
  createServiceUseTransactionOfUser,
  serviceTransactions,
}) {
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const quantityOptions = serviceTransactions
    .filter((transaction) => transaction.type === "purchase")
    .map((transaction) => transaction.quantity);
  // const { columns, rows } = serviceListModalData(createServiceTransactionOfUser);
  console.log("setServiceTransactions", serviceTransactions);
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
        width: "20vw",
        padding: 2,
        margin: "auto",
        backgroundColor: "#fff",
        borderRadius: 2,
      }}
    >
      <MDBox>
        <MDBox
          mt={2}
          py={1}
          px={2}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" color="white">
            Select Quantity
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
          <select
            id="gender"
            className="border border-border rounded-md p-2 w-[50%] bg-input focus:ring-primary focus:border-primary"
            value={selectedQuantity}
            onChange={handleQuantityChange}
            style={{
              fontSize: "14px", // Matches the font size of the MDInput
              height: "45px",
              width: "100%", // Matches the height of the input
            }}
          >
            <option value="" disabled>
              Select Quantity
            </option>
            {quantityOptions.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
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
