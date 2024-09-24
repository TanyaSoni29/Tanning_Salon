/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch, useSelector } from "react-redux";
import { setServiceIndex } from "slices/serviceSlice";

export default function data(handleEdit, setIsDeleteOpen, setViewModal) {
  const { locations, locationIndex } = useSelector((state) => state.location);
  const dispatch = useDispatch();

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

  const rows = locations.map((location, i) => ({
    location: <Author name={location.name} />,
    address: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {location.address}
      </MDTypography>
    ),
    postCode: (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {location.zip_code}
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
            dispatch(setServiceIndex(i));
            setViewModal(true);
          }}
          sx={{ cursor: "pointer" }}
        />
        <EditIcon
          onClick={() => {
            dispatch(setServiceIndex(i));
            handleEdit();
          }}
          sx={{ cursor: "pointer" }}
        />
        <DeleteIcon
          onClick={() => {
            dispatch(setServiceIndex(i));
            setIsDeleteOpen(true);
          }}
          sx={{ cursor: "pointer" }}
        />
      </MDBox>
    ),
  }));

  return {
    columns: [
      { Header: "Location Name", accessor: "location", width: "30%", align: "left" },
      { Header: "Address", accessor: "address", align: "center" },
      { Header: "Postcode", accessor: "postCode", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows,
  };
}
