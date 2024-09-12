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
  const handleView = (userId) => {
    console.log(`Viewing user with id: ${userId}`);
    // Implement view logic here
  };

  const handleEdit = (userId) => {
    console.log(`Editing user with id: ${userId}`);
    // Implement edit logic here
  };

  const handleDelete = (userId) => {
    console.log(`Deleting user with id: ${userId}`);
    // Implement delete logic here
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUserProfiles(token);
        console.log("getAlluserProfile response", response.data);
        setRowsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
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
      {/* <MDTypography variant="caption">{description}</MDTypography> */}
    </MDBox>
  );

  const Location = ({ name }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );

  const rows = rowsData.map((user) => ({
    userName: <Author image={user.avatar} name={user.firstName} email={user.email} />,
    Admin: <Job title={user.role} />,
    location: <Location name={user.preferred_location.name} />,
    status: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={user.active === "online" ? "online" : "offline"}
          color={user.active === "online" ? "success" : "dark"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    lastUpdatedAt: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {new Date(user.updated_at).toLocaleDateString()}
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
        <RemoveRedEyeIcon onClick={() => handleView(user.id)} sx={{ cursor: "pointer" }} />
        <EditIcon onClick={() => handleEdit(user.id)} sx={{ cursor: "pointer" }} />
        <DeleteIcon onClick={() => handleDelete(user.id)} sx={{ cursor: "pointer" }} />
      </MDBox>
    ),
  }));

  return {
    columns: [
      { Header: "User Name", accessor: "userName", width: "30%", align: "left" },
      { Header: "Admin", accessor: "Admin", align: "left" },
      { Header: "Location", accessor: "location", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "last updated at", accessor: "lastUpdatedAt", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows,
  };
}
