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
import { useDispatch, useSelector } from "react-redux";
import { setUserIndex } from "slices/profileSlice";
import { setUsers } from "slices/profileSlice";

export default function data(
  handleEdit,
  setIsDeleteOpen,
  setViewModal,
  createModalOpen,
  isDeleteOpen,
  isEditOpen
) {
  const [rowsData, setRowsData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  // const { services } = useSelector((state) => state.service);
  // console.log(services);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUserProfiles(token);
        console.log("getAlluserProfile response", response.data);
        dispatch(setUsers(response.data.filter((data) => data.role === "customer" && data.active)));
        setRowsData(response.data.filter((data) => data.role === "customer" && data.active));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [createModalOpen, isDeleteOpen, isEditOpen]);

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

  const rows = rowsData.map((customer, i) => ({
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
    minutesAvailable: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {/* {service.minutesAvailable} */}
      </MDTypography>
    ),
    totalSpend: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {/* {service.minutesAvailable} */}
      </MDTypography>
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
        <RemoveRedEyeIcon
          onClick={() => {
            dispatch(setUserIndex(i));
            setViewModal(true);
          }}
          sx={{ cursor: "pointer" }}
        />
        <EditIcon
          onClick={() => {
            dispatch(setUserIndex(i));
            handleEdit();
          }}
          sx={{ cursor: "pointer" }}
        />
        <DeleteIcon
          onClick={() => {
            dispatch(setUserIndex(i));
            setIsDeleteOpen(true);
          }}
          sx={{ cursor: "pointer" }}
        />
      </MDBox>
    ),
  }));

  return {
    columns: [
      { Header: "User Name", accessor: "userName", align: "left" },
      { Header: "Location", accessor: "location", align: "center" },
      { Header: "phone number", accessor: "phone_number", align: "center" },
      { Header: "Minutes Available", accessor: "minutesAvailable", align: "center" },
      { Header: "Total Spend Minutes", accessor: "totalSpend", align: "center" },
      { Header: "Last service purchase", accessor: "lastUpdatedAt", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows,
  };
}
