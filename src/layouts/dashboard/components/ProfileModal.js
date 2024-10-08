/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from "react";
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
import userTransactionTableData from "../components/userTransactionTableData";
import MDAvatar from "components/MDAvatar";
import DataTable from "examples/Tables/DataTable";
import { getProductTransactionsByUser } from "service/operations/productAndProductTransaction";
import { useDispatch, useSelector } from "react-redux";
import { getServiceTransactionsByUser } from "service/operations/serviceAndServiceTransaction";
import Modal from "../../../components/Modal";
import TransactionModal from "./TransactionModal";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import { getAllServiceUsageByUser } from "service/operations/serviceAndServiceTransaction";
import ProductListModal from "./ProductListModal";
import { createProductTransaction } from "service/operations/productAndProductTransaction";
import { createServiceTransaction } from "service/operations/serviceAndServiceTransaction";
import ServiceListModal from "./ServiceListModal";
import ServiceUseModal from "./ServiceUseModal";
import { getAllProducts } from "service/operations/productAndProductTransaction";
import { setProducts } from "slices/productSlice";
import { getAllServices } from "service/operations/serviceAndServiceTransaction";
import { setServices } from "slices/serviceSlice";
import { refreshUser } from "slices/profileSlice";
import { getServiceUseOptions } from "service/operations/serviceAndServiceTransaction";
export default function BasicCard({ onClose, handleSelectedProfileModal, selectedUser }) {
  const { token } = useSelector((state) => state.auth);
  const [productTransactions, setProductTransactions] = useState([]);
  const [serviceTransactions, setServiceTransactions] = useState([]);
  const [combinedTransactions, setCombinedTransactions] = useState([]);
  const { locations } = useSelector((state) => state.location);
  // const [transactionModal, setTransactionModal] = useState(false);
  const [productListModal, setProductListModal] = useState(false);
  const [serviceListModal, setServiceListModal] = useState(false);
  const [serviceUseModal, setServiceUseModal] = useState(false);
  const dispatch = useDispatch();
  const [serviceUseOptions, setServiceUseOptions] = useState([]);
  console.log("selected user:", selectedUser);
  const preferredLocation = locations.find(
    (location) => selectedUser.profile?.preferred_location === location.id
  );
  useEffect(() => {
    async function getServiceTransactionsOfUser() {
      const response = await getServiceTransactionsByUser(token, selectedUser?.user.id);
      console.log("response of get service transaction of user", response);
      setServiceTransactions(response);
    }
    getServiceTransactionsOfUser();
  }, [token, selectedUser?.user.id]);

  useEffect(() => {
    async function getProductTransactionsOfUser() {
      const response = await getProductTransactionsByUser(token, selectedUser?.user.id);
      console.log("response of get product transaction of user", response);
      setProductTransactions(response);
    }
    getProductTransactionsOfUser();
  }, [token, selectedUser?.user.id]);

  useEffect(() => {
    async function getUserTransactions() {
      try {
        // Fetch both product and service transactions concurrently
        const [serviceResponse, productResponse] = await Promise.all([
          getServiceTransactionsByUser(token, selectedUser?.user.id),
          getProductTransactionsByUser(token, selectedUser?.user.id),
        ]);
        setServiceTransactions(serviceResponse);
        console.log({ serviceResponse, productResponse });
        const serviceData = serviceResponse;
        const productData = productResponse;
        console.log({ serviceData: serviceData, productData: productData });
        // Map and structure service transactions
        const formattedServiceTransactions = serviceData.map((transaction) => ({
          id: transaction.transaction.id,
          productName: transaction?.service?.name, // For service, this might be the service name
          userName: `${transaction.user_details?.firstName} ${transaction.user_details?.lastName}`,
          quantity: transaction?.transaction?.quantity,
          price: transaction?.service?.price, // Service might not have a price, so defaulting to '-'
          location: transaction.user_details?.preferred_location?.name,
          type: transaction.transaction?.type === "used" ? "used" : "purchased",
          createdAt: transaction.transaction?.created_at,
        }));

        // Map and structure product transactions
        const formattedProductTransactions = productData.map((transaction) => ({
          id: transaction?.id,
          productName: transaction?.product?.productName, // For products, this is the product name
          userName: `${transaction.user?.firstName} ${transaction.user?.lastName}`,
          quantity: transaction?.quantity,
          price: transaction?.product?.price, // Product has a price
          location: transaction?.location?.name,
          type: transaction?.product?.type, // Assuming all product transactions are "Product"
          createdAt: transaction?.created_at,
        }));

        // Combine both sets of transactions
        const combined = [...formattedServiceTransactions, ...formattedProductTransactions];
        console.log("combined data transaction", combined);
        setCombinedTransactions(combined);
      } catch (error) {
        console.log("Error getting transactions", error);
      }
    }

    getUserTransactions();
  }, [token, selectedUser?.user.id]);

  // useEffect(() => {
  //   async function getServiceUsageByUser() {
  //     const response = await getAllServiceUsageByUser(token, selectedUser._id);
  //     setServiceUsageOfSelectedUser(response.serviceUsage?.at(0));
  //   }
  //   getServiceUsageByUser();
  // }, [selectedUser._id, token]);

  const createProductTransactionOfUser = async (productId, quantity) => {
    try {
      const data = {
        user_id: selectedUser.user.id, // Assuming user data is stored in auth state
        location_id: selectedUser.profile?.preferred_location, // Replace with the correct location ID
        product_id: productId,
        quantity,
      };
      await createProductTransaction(token, data);
      // const { productTransactions } = await getProductTransactionsByUser(token, selectedUser?._id);
      // setProductTransactions(productTransactions);
      // console.log("Transaction created", response.data);
    } catch (err) {
      console.error("Error creating transaction", err);
    }
  };

  const createServiceTransactionOfUser = async (serviceId) => {
    try {
      const data = {
        user_id: selectedUser.user.id,
        service_id: serviceId, // Assuming user data is stored in auth state
        location_id: selectedUser.profile?.preferred_location, // Replace with the correct location ID
        type: "purchased",
      };
      const response = await createServiceTransaction(token, data);
      dispatch(refreshUser(token));
    } catch (err) {
      console.error("Error creating transaction", err);
    }
  };

  const createServiceUseTransactionOfUser = async (serviceId) => {
    try {
      const data = {
        user_id: selectedUser.user.id, // Assuming user data is stored in auth state
        location_id: selectedUser.profile?.preferred_location,
        service_id: serviceId, // Replace with the correct location ID
        type: "used",
      };
      const response = await createServiceTransaction(token, data);
      dispatch(refreshUser(token));
      console.log("Transaction created", response.data);
    } catch (err) {
      console.error("Error creating transaction", err);
    }
  };
  const handleServiceListModal = async () => {
    setServiceListModal(true);
    try {
      const response = await getAllServices(token);
      console.log("Get all service in Profile modal", response);
      dispatch(setServices(response));
    } catch (error) {
      console.log("Error getting all getAllServices", error);
    }
  };
  const handleServiceUseModal = async () => {
    setServiceUseModal(true);
    try {
      const response = await getServiceUseOptions(token, selectedUser.user.id);
      console.log("get Service use Option", response);
      setServiceUseOptions(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProductListModal = async () => {
    setProductListModal(true);
    try {
      const response = await getAllProducts(token);
      console.log("Get all product in Profile modal", response);
      dispatch(setProducts(response));
    } catch (error) {
      console.log("Error getting all products", error);
    }
  };
  // const handleViewTransactionModal = () => {
  //   setTransactionModal(true);
  // };
  // const { columns, rows } = userProductTableData(productTransactions);
  // const { columns: scols, rows: srows } = userServiceTableData(serviceTransactions);
  const { columns: ucols, rows: urows } = userTransactionTableData(combinedTransactions);
  return (
    <>
      {/* <Modal open={transactionModal} setOpen={setTransactionModal}>
        <TransactionModal
          setOpen={setTransactionModal}
          scols={scols}
          srows={srows}
          columns={columns}
          rows={rows}
        />
      </Modal> */}
      <Modal open={productListModal} setOpen={setProductListModal}>
        <ProductListModal
          setOpen={setProductListModal}
          createProductTransactionOfUser={createProductTransactionOfUser}
        />
      </Modal>
      <Modal open={serviceListModal} setOpen={setServiceListModal}>
        <ServiceListModal
          setOpen={setServiceListModal}
          createServiceTransactionOfUser={createServiceTransactionOfUser}
        />
      </Modal>
      <Modal open={serviceUseModal} setOpen={setServiceUseModal}>
        <ServiceUseModal
          setOpen={setServiceUseModal}
          serviceTransactions={serviceTransactions}
          serviceUseOptions={serviceUseOptions}
          createServiceUseTransactionOfUser={createServiceUseTransactionOfUser}
        />
      </Modal>
      <MDBox
        mb={2}
        sx={{
          width: "60vw",
          height: "20vh",
          padding: 2,
          margin: "auto",
          borderRadius: 2,
        }}
      />
      <MDBox position="relative" mb={5}>
        {/* <MDBox
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
        /> */}
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
              {/* <MDAvatar
                src={selectedUser.avatar ? selectedUser.avatar : burceMars}
                alt="profile-image"
                size="xl"
                shadow="sm"
              /> */}
            </Grid>
            <Grid item>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  {selectedUser.profile?.firstName} {selectedUser.profile?.lastName}
                </MDTypography>
                {/* <MDTypography variant="button" color="text" fontWeight="regular">
                  {selectedUser.email}
                </MDTypography> */}
                <MDBox height="100%" lineHeight={1}>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    {selectedUser.profile?.phone_number}
                  </MDTypography>
                </MDBox>
                <MDBox height="100%" lineHeight={1}>
                  <MDTypography variant="button" color="text" fontWeight="medium">
                    {selectedUser.profile?.available_balance
                      ? `Available Balance : ${selectedUser.profile?.available_balance}`
                      : "Not purchase any service yet"}
                  </MDTypography>
                </MDBox>
                <MDBox height="100%" lineHeight={1}>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    Preferred Location: {preferredLocation?.name}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
          <MDBox py={2} sx={{ display: "flex", gap: 2 }}>
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
                  backgroundColor: "#63A0F5",
                  color: "#fff",
                },
              }}
              onClick={handleProductListModal}
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
              onClick={handleServiceListModal}
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
                  backgroundColor: "#63A0F5",
                  color: "#fff",
                },
              }}
              onClick={handleServiceUseModal}
              disabled={selectedUser?.profile?.available_balance > 0 ? false : true}
            >
              Use Service
            </Button>
            {/* <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
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
                    backgroundColor: "#63A0F5",
                    color: "#fff",
                  },
                }}
                onClick={handleViewTransactionModal}
              >
                View Transactions
              </Button>
            </Grid> */}
          </MDBox>

          <MDBox
            py={1}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Transactions
            </MDTypography>
          </MDBox>
          <MDBox
            pt={1}
            sx={{
              maxHeight: "40vh", // Set fixed height for Services table
              overflowY: "auto", // Add scrollbar if content overflows
            }}
          >
            <DataTable
              table={{ columns: ucols, rows: urows }}
              isSorted={true}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
        </Card>
      </MDBox>
    </>
  );
}
