/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useEffect } from "react";
import {
  Card,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Button,
  Divider,
  Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "utils/formateDate";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Header from "layouts/profile/components/Header";
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import userProductTableData from "../components/userProductTableData";
import userServiceTableData from "../components/userServiceTableData";
import MDAvatar from "components/MDAvatar";
import DataTable from "examples/Tables/DataTable";
export default function BasicCard({ onClose, handleSelectedProfileModal, selectedUser }) {
  const { columns, rows } = userProductTableData(selectedUser);
  const { columns: scols, rows: srows } = userServiceTableData(selectedUser);
  return (
    // <Box
    //   sx={{
    //     width: 300,
    //     padding: 2,
    //     margin: "auto",
    //     marginTop: "15%",
    //     backgroundColor: "#fff",
    //     borderRadius: 2,
    //   }}
    // >
    //   <Typography id="logout-modal-title" variant="h6">
    //     Have you used a tanning salon in the last 24 hours?
    //   </Typography>
    //   <Box mt={2} display="flex" justifyContent="end" gap="1rem">
    //     <Button
    //       variant="contained"
    //       onClick={handleSelectedProfileModal}
    //       sx={{
    //         backgroundColor: "#328BED",
    //         color: "#fff",
    //         padding: "8px 16px",
    //         borderRadius: "8px",
    //         boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
    //         "&:hover": {
    //           backgroundColor: "#63A0F5",
    //         },
    //       }}
    //     >
    //       Yes
    //     </Button>
    //     <Button variant="contained" color="info" onClick={onClose}>
    //       Cancel
    //     </Button>
    //   </Box>
    // </Box>
    <>
      <MDBox
        mb={2}
        sx={{
          width: 900,
          padding: 2,
          margin: "auto",
          borderRadius: 2,
        }}
      />
      <MDBox position="relative" mb={5}>
        <MDBox
          display="flex"
          alignItems="center"
          position="relative"
          minHeight="16.75rem"
          borderRadius="xl"
          sx={{
            backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.info.main, 0.6),
                rgba(gradients.info.state, 0.6)
              )}, url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            overflow: "hidden",
          }}
        />
        <Card
          sx={{
            position: "relative",
            mt: -8,
            mx: 3,
            py: 2,
            px: 2,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "black",
              zIndex: 2,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <MDAvatar
                src={selectedUser.avatar ? selectedUser.avatar : burceMars}
                alt="profile-image"
                size="xl"
                shadow="sm"
              />
            </Grid>
            <Grid item>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  {selectedUser.firstName} {selectedUser.lastName}
                </MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  {selectedUser.email}
                </MDTypography>
                <MDBox height="100%" lineHeight={1}>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    {selectedUser.phone_number}
                  </MDTypography>
                </MDBox>
                <MDBox height="100%" lineHeight={1}>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    Preferred Location: {selectedUser.preferred_location.name}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}></Grid>
          </Grid>
          <MDBox pt={2} px={2} lineHeight={1.25}>
            <MDTypography variant="h6" fontWeight="medium">
              GDPR Settings
            </MDTypography>
            <MDBox mb={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedUser.gdpr_email_active}
                    name="gdpr_email_active"
                    color="primary"
                    // The functionality isn't changed, switch state comes from selectedUser
                  />
                }
                label="GDPR Email Active"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedUser.gdpr_sms_active}
                    name="gdpr_sms_active"
                    color="primary"
                    // The functionality isn't changed, switch state comes from selectedUser
                  />
                }
                label="GDPR SMS Active"
              />
            </MDBox>
          </MDBox>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Services
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={{ columns: scols, rows: srows }}
              isSorted={true}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
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
          <MDBox pt={3}>
            <DataTable
              table={{ columns, rows }}
              isSorted={true}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
          <MDBox p={2} sx={{ display: "flex", gap: 2 }}>
            <Button
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
                  backgroundColor: "#D3D3D3",
                  color: "#fff",
                },
              }}
            >
              Buy Product
            </Button>
            <Button
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
                  backgroundColor: "#D3D3D3",
                  color: "#fff",
                },
              }}
            >
              Buy Service
            </Button>
            <Button
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
                  backgroundColor: "#D3D3D3",
                  color: "#fff",
                },
              }}
            >
              Use Service
            </Button>
          </MDBox>
        </Card>
      </MDBox>
    </>
  );
}
