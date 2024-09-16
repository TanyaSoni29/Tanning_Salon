import React, { useState } from "react";
import Table from "../tables";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { Button, Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import productsTableData from "layouts/tables/data/productsTableData";
import Modal from "../../components/Modal";
import EditProductModal from "../../components/ActionButton/EditProductModal";
function index() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleClose = () => setIsEditOpen(false);
  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const { columns, rows } = productsTableData(handleEdit);

  return (
    <>
      <Modal open={isEditOpen} setOpen={setIsEditOpen}>
        <EditProductModal onClose={handleClose} />
      </Modal>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={4} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12} display="flex" justifyContent="end">
              <Button
                sx={{
                  backgroundColor: "#328BED",
                  color: "#fff",
                  marginBottom: "8px",
                  "&:hover": {
                    backgroundColor: "#63A0F5",
                    color: "#fff",
                  },
                }}
              >
                Add New Product
              </Button>
            </Grid>
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
                    Products
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
