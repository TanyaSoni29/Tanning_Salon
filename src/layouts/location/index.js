import React, { useEffect, useRef, useState } from "react";
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
import CreateLocationModal from "../../components/LocationActionButton/CreateNewLocationModal";
import EditLocationModal from "../../components/LocationActionButton/EditLocationModal";
import DeleteLocationModal from "../../components/LocationActionButton/DeleteLocationModal";
import ViewLocationModal from "../../components/LocationActionButton/ViewLocationModal";
import { deleteLocation } from "service/operations/locationApi";
import { getAllLocations } from "service/operations/locationApi";
import { setLocations } from "slices/locationSlice";
import { removeLocation } from "slices/locationSlice";
import { refreshLocation } from "slices/locationSlice";
import MDInput from "components/MDInput";

function index() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const { locations, locationIndex } = useSelector((state) => state.location);
  const { token } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const activeLocation = locations[locationIndex];

  const handleEditClose = () => setIsEditOpen(false);
  const handleDeleteClose = () => setIsDeleteOpen(false);
  const handleCreateModalClose = () => setCreateModalOpen(false);
  const handleViewModalClose = () => setViewModal(false);
  const filteredLocations = locations.filter(
    (location) =>
      (location.name && location.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (location.address && location.address.toLowerCase().includes(searchQuery.toLowerCase())) // Assuming 'name' is the field to search
  );
  const handleSearch = async () => {
    console.log(searchQuery);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
      searchRef.current.blur();
    }
  };
  const handleCreateNewLocation = () => {
    setCreateModalOpen(true);
  };
  const handleEdit = () => {
    setIsEditOpen(true);
  };
  const handleDelete = async () => {
    try {
      const result = await deleteLocation(token, activeLocation._id);
      // console.log(" result after deletion", result);
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

  useEffect(() => {
    async function getAllLocation() {
      try {
        const response = await getAllLocations(token);
        const sortLocation = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        dispatch(setLocations(sortLocation));
      } catch (error) {
        console.log("Error getting all getAllServices");
      }
    }
    getAllLocation();
  }, [locations]);
  const { columns, rows } = locationTableData(
    filteredLocations,
    handleEdit,
    setIsDeleteOpen,
    setViewModal
  );
  return (
    <>
      <Modal open={createModalOpen} setOpen={setCreateModalOpen}>
        <CreateLocationModal onClose={handleCreateModalClose} />
      </Modal>
      <Modal open={viewModal} setOpen={setViewModal}>
        <ViewLocationModal onClose={handleViewModalClose} />
      </Modal>
      <Modal open={isEditOpen} setOpen={setIsEditOpen}>
        <EditLocationModal onClose={handleEditClose} />
      </Modal>
      <Modal open={isDeleteOpen} setOpen={setIsDeleteOpen}>
        <DeleteLocationModal onClose={handleDeleteClose} handleDelete={handleDelete} />
      </Modal>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={4} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <MDBox pr={1} sx={{ flex: 1 }}>
                <MDInput
                  label="Search Location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  inputProps={{
                    ref: searchRef,
                    onFocus: (event) => event.target.select(),
                  }}
                  // sx={{ width: "20%" }}
                />
              </MDBox>
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
