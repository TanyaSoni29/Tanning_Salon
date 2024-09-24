import React, { useState } from "react";
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
import Modal from "../../components/Modal";
// Data
import locationTableData from "layouts/tables/data/locationTableData";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteService } from "service/operations/serviceAndServiceTransaction";
import { removeService } from "slices/serviceSlice";
import { refreshService } from "slices/serviceSlice";
import CreateServiceModal from "../../components/ServiceActionButtons/CreateServiceModal";
import EditServiceModal from "../../components/ServiceActionButtons/EditServiceModal";
import DeleteServiceModal from "../../components/ServiceActionButtons/DeleteServiceModal";
import ViewServiceModal from "../../components/ServiceActionButtons/ViewServiceModal";
import { deleteLocation } from "service/operations/locationApi";

function index() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const { locations, locationIndex } = useSelector((state) => state.location);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const activeLocation = locations[locationIndex];

  const handleEditClose = () => setIsEditOpen(false);
  const handleDeleteClose = () => setIsDeleteOpen(false);
  const handleCreateModalClose = () => setCreateModalOpen(false);
  const handleViewModalClose = () => setViewModal(false);

  const handleCreateNewLocation = () => {
    setCreateModalOpen(true);
  };
  const handleEdit = () => {
    setIsEditOpen(true);
  };
  const handleDelete = async () => {
    try {
      const result = await deleteLocation(token, activeLocation._id);
      if (result) {
        dispatch(removeLocation(activeLocation._id));
        dispatch(refreshLocation());
        setIsDeleteOpen(false);
      }
    } catch (error) {
      console.error("Error during product deletion:", error);
    } finally {
      setIsDeleteOpen(false);
    }
  };
  const { columns, rows } = locationTableData(handleEdit, setIsDeleteOpen, setViewModal);
  return (
    <>
      <Modal open={createModalOpen} setOpen={setCreateModalOpen}>
        {/* <CreateServiceModal onClose={handleCreateModalClose} /> */}
      </Modal>
      <Modal open={viewModal} setOpen={setViewModal}>
        {/* <ViewServiceModal onClose={handleViewModalClose} /> */}
      </Modal>
      <Modal open={isEditOpen} setOpen={setIsEditOpen}>
        {/* <EditServiceModal onClose={handleEditClose} /> */}
      </Modal>
      <Modal open={isDeleteOpen} setOpen={setIsDeleteOpen}>
        {/* <DeleteServiceModal onClose={handleDeleteClose} handleDelete={handleDelete} /> */}
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
                onClick={handleCreateNewLocation}
              >
                Add New Location
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
                    Locations
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
