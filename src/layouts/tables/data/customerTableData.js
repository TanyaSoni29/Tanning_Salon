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

import { getAllUserProfiles } from "service/operations/userProfileApi";
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
        const response = await getAllUserProfiles(token);
        console.log("getAlluserProfile response", response.data);
        setRowsData(response.data.filter((data) => data.role === "customer"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const Author = ({ image, firstName, lastName, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {firstName} {lastName}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
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

  const rows = rowsData.map((customer) => ({
    userName: (
      <Author
        image={customer.avatar}
        firstName={customer.firstName}
        lastName={customer.lastName}
        email={customer.email}
      />
    ),
    Admin: <Job title={customer.role} />,
    location: <Location name={customer.preferred_location.name} />,
    phone_number: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {customer.phone_number}
      </MDTypography>
    ),
    status: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={customer.active ? "Active" : "Inactive"}
          color={customer.active ? "success" : "error"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    lastUpdatedAt: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {new Date(customer.updated_at).toLocaleDateString()}
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
        <RemoveRedEyeIcon onClick={() => handleView(customer._id)} sx={{ cursor: "pointer" }} />
        <EditIcon onClick={() => handleEdit(customer._id)} sx={{ cursor: "pointer" }} />
        <DeleteIcon onClick={() => handleDelete(customer._id)} sx={{ cursor: "pointer" }} />
      </MDBox>
    ),
  }));

  return {
    columns: [
      { Header: "User Name", accessor: "userName", width: "30%", align: "left" },
      { Header: "Location", accessor: "location", align: "left" },
      { Header: "phone number", accessor: "phone_number", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Last service purchase", accessor: "lastUpdatedAt", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows,
  };
}
