/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import { Box, Button, IconButton, MenuItem, Select, Typography } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import serviceListModalData from "./ServiceUseModal";
import { useSelector } from "react-redux";

function ServiceListModal({ open, setOpen, createServiceTransactionOfUser }) {
  const [selectedService, setSelectedService] = useState("");
  const [selectedServiceDetails, setSelectedServiceDetails] = useState(null);
  const { services } = useSelector((state) => state.service);
  //   const { columns, rows } = serviceListModalData(createServiceTransactionOfUser);
  const handleServiceChange = (event) => {
    const serviceId = event.target.value;
    setSelectedService(serviceId);
    const service = services.find((s) => s._id === serviceId);
    setSelectedServiceDetails(service);
  };

  const handleBuyService = () => {
    if (selectedService) {
      createServiceTransactionOfUser(selectedService); // Assuming this function accepts the service ID
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
          <Select value={selectedService} onChange={handleServiceChange} fullWidth sx={{ mb: 2 }}>
            <MenuItem value="" disabled>
              Select a Service
            </MenuItem>
            {services.map((service) => (
              <MenuItem key={service._id} value={service._id}>
                {service.serviceName} {/* Adjust based on your service object structure */}
              </MenuItem>
            ))}
          </Select>
        </MDBox>
        {selectedServiceDetails && (
          <MDBox mt={1}>
            <MDTypography variant="h6" fontWeight="bold">
              Service Details:
            </MDTypography>
            <Typography variant="h6" fontWeight="medium">
              Name: {selectedServiceDetails?.serviceName}
            </Typography>
            <MDTypography variant="h6" fontWeight="medium">
              Available Minutes: {selectedServiceDetails.minutesAvailable}
            </MDTypography>
            <MDTypography variant="h6" fontWeight="medium">
              Price: {selectedServiceDetails.price}
            </MDTypography>
            {/* Add more details as needed */}
          </MDBox>
        )}
      </MDBox>
      <Box mt={4} display="flex" justifyContent="end" gap="1rem">
        <Button variant="contained" onClick={handleBuyService} color="success">
          Buy Service
        </Button>
        <Button variant="contained" color="info" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default ServiceListModal;
