import React, { useEffect, useRef, useState } from "react";
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
import DeleteProductModal from "components/ActionButton/DeleteProductModal";
import { deleteProduct } from "../../service/operations/productAndProductTransaction";
import { removeProduct } from "slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { refreshProduct } from "slices/productSlice";
import CreateProductModal from "../../components/ActionButton/CreateProductModal";
import ViewProductCard from "../../components/ActionButton/ViewProductCard";
import { setProducts } from "slices/productSlice";
import MDInput from "components/MDInput";
function index() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const { products, productIndex } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const activeProduct = products[productIndex];
  const filteredProducts = products.filter(
    (product) => product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
    // Assuming 'name' is the field to search
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
  useEffect(() => {
    async function getAllProduct() {
      try {
        const response = await getAllProducts(token);
        dispatch(setProducts(response.data));
      } catch (error) {
        console.log("Error getting all products");
      }
    }
    getAllProduct();
  }, [token, dispatch]);

  const handleEditClose = () => setIsEditOpen(false);
  const handleDeleteClose = () => setIsDeleteOpen(false);
  const handleCreateModalClose = () => setCreateModalOpen(false);
  const handleViewModalClose = () => setViewModal(false);

  const handleCreateNewProduct = () => {
    setCreateModalOpen(true);
  };
  const handleEdit = () => {
    setIsEditOpen(true);
  };
  const handleDelete = async () => {
    try {
      const result = await deleteProduct(token, activeProduct._id);
      if (result) {
        dispatch(removeProduct(activeProduct._id));
        dispatch(refreshProduct());
        setIsDeleteOpen(false);
      }
    } catch (error) {
      console.error("Error during product deletion:", error);
    } finally {
      setIsDeleteOpen(false);
    }
  };
  const { columns, rows } = productsTableData(
    filteredProducts,
    handleEdit,
    setIsDeleteOpen,
    setViewModal
  );

  return (
    <>
      <Modal open={createModalOpen} setOpen={setCreateModalOpen}>
        <CreateProductModal onClose={handleCreateModalClose} />
      </Modal>
      <Modal open={viewModal} setOpen={setViewModal}>
        <ViewProductCard onClose={handleViewModalClose} />
      </Modal>
      <Modal open={isEditOpen} setOpen={setIsEditOpen}>
        <EditProductModal onClose={handleEditClose} />
      </Modal>
      <Modal open={isDeleteOpen} setOpen={setIsDeleteOpen}>
        <DeleteProductModal onClose={handleDeleteClose} handleDelete={handleDelete} />
      </Modal>

      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={4} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <MDBox pr={1} sx={{ flex: 1 }}>
                <MDInput
                  label="Search Product"
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
                onClick={handleCreateNewProduct}
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
