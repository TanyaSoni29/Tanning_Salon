/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { getAllService } from "service/operations/serviceAndServiceTransaction";
import { useSelector } from "react-redux";

export default function data() {
  const [rowsData, setRowsData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const handleView = (customerId) => {
    console.log(`Viewing user with id: ${customerId}`);
    // Implement view logic here
  };

  const handleEdit = (customerId) => {
    console.log(`Editing user with id: ${customerId}`);
    // Implement edit logic here
  };

  const handleDelete = (customerId) => {
    console.log(`Deleting user with id: ${customerId}`);
    // Implement delete logic here
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllService(token);
        console.log("getAllService response", response.data);
        setRowsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

  const Location = ({ name }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );

  const rows = rowsData.map((service) => ({
    serviceName: <Author name={service.serviceName} />,
    price: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {service.price}
      </MDTypography>
    ),
    minutesAvailable: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {service.minutesAvailable}
      </MDTypography>
    ),
    action: (
      <MDBox
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="8px"
      >
        <RemoveRedEyeIcon onClick={() => handleView(service._id)} sx={{ cursor: "pointer" }} />
        <EditIcon onClick={() => handleEdit(service._id)} sx={{ cursor: "pointer" }} />
        <DeleteIcon onClick={() => handleDelete(service._id)} sx={{ cursor: "pointer" }} />
      </MDBox>
    ),
  }));

  return {
    columns: [
      { Header: "Service Name", accessor: "serviceName", width: "30%", align: "left" },
      { Header: "price", accessor: "price", align: "center" },
      { Header: "Minutes Available", accessor: "minutesAvailable", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows,
  };
}
