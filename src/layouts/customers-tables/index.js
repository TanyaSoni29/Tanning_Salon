import React from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import customerTableData from "layouts/tables/data/customerTableData";
import { Button } from "@mui/material";

function index() {
  const { columns, rows } = customerTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
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
                  Customers Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="start">
            <Button
              sx={{
                backgroundColor: "#328BED",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#63A0F5",
                  color: "#fff",
                },
              }}
            >
              Add New Customer
            </Button>
          </Grid>
        </Grid>
      </MDBox>

      <MDBox mt="auto">
        <Footer />
      </MDBox>
    </DashboardLayout>
  );
}

export default index;
