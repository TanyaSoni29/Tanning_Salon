/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { getAllUserProfiles } from "service/operations/userProfileApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserIndex } from "slices/profileSlice";
import { setUsers } from "slices/profileSlice";
import { getAllUser } from "service/operations/userApi";
import { refreshLocation } from "slices/locationSlice";

export default function data(
  filteredUsers,
  handleEdit,
  setIsDeleteOpen,
  setViewModal,
  createModalOpen,
  isDeleteOpen,
  isEditOpen
) {
  const [rowsData, setRowsData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUser(token);
        console.log("getAlluserProfile response", response);
        dispatch(setUsers(response.filter((data) => data.user.role !== "customer")));
        setRowsData(response.filter((data) => data.user.role !== "customer"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [createModalOpen, isDeleteOpen, isEditOpen]);
  console.log("rowsData----", rowsData);
  useEffect(() => {
    dispatch(refreshLocation(token));
  }, [dispatch]);
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} size="sm" />
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
        {title === "admin" ? "Admin" : "User"}
      </MDTypography>
      {/* <MDTypography variant="caption">{description}</MDTypography> */}
    </MDBox>
  );

  const Location = ({ locationId }) => {
    const { locations } = useSelector((state) => state.location); // Get locations from Redux

    // Find the location by ID
    const location = locations.find((loc) => loc.id === locationId);

    return (
      <MDBox lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {location ? location.name : "-"} {/* Fallback if location is not found */}
        </MDTypography>
      </MDBox>
    );
  };

  const rows = (filteredUsers.length > 0 ? filteredUsers : rowsData).map((user, i) => ({
    userName: <Author image={user.profile?.avatar} name={user.user.name} email={user.email} />,
    Admin: <Job title={user.user.role} />,
    location: <Location locationId={user.profile?.preferred_location} />,
    phone_number: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {user.profile?.phone_number}
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
            const index =
              filteredUsers.length > 0 ? rowsData.findIndex((u) => u.user.id === user.user.id) : i;
            dispatch(setUserIndex(index));
            setViewModal(true);
          }}
          sx={{ cursor: "pointer" }}
        />
        <EditIcon
          onClick={() => {
            const index =
              filteredUsers.length > 0 ? rowsData.findIndex((u) => u.user.id === user.user.id) : i;
            dispatch(setUserIndex(index));
            handleEdit();
          }}
          sx={{ cursor: "pointer" }}
        />
        <DeleteIcon
          onClick={() => {
            const index =
              filteredUsers.length > 0 ? rowsData.findIndex((u) => u.user.id === user.user.id) : i;
            dispatch(setUserIndex(index));
            setIsDeleteOpen(true);
          }}
          sx={{ cursor: "pointer" }}
        />
      </MDBox>
    ),
  }));

  return {
    columns: [
      { Header: "User Name", accessor: "userName", width: "30%", align: "left" },
      { Header: "Role", accessor: "Admin", align: "center" },
      { Header: "Location", accessor: "location", align: "left" },
      { Header: "phone number", accessor: "phone_number", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows,
  };
}
