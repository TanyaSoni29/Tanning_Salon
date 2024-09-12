import React from "react";
import Table from "../tables";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { Button, Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import productsTableData from "layouts/tables/data/productsTableData";
function index() {
  const { columns, rows } = productsTableData();
  return (
    <>
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
                    Users Table
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }} // Replace `columns` and `rows` with actual data
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
                Add New User
              </Button>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt="auto">
          <Footer />
        </MDBox>
      </DashboardLayout>
    </>
  );
}

export default index;
