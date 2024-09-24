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
import MDAvatar from "components/MDAvatar";
import DataTable from "examples/Tables/DataTable";
import { getProductTransactionsByUser } from "service/operations/userApi";
import { useSelector } from "react-redux";
import { getServiceTransactionsByUser } from "service/operations/userApi";
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
export default function BasicCard({ onClose, handleSelectedProfileModal, selectedUser }) {
  const { token } = useSelector((state) => state.auth);
  const [productTransactions, setProductTransactions] = useState([]);
  const [serviceTransactions, setServiceTransactions] = useState([]);
  // const [transactionModal, setTransactionModal] = useState(false);
  const [productListModal, setProductListModal] = useState(false);
  const [serviceListModal, setServiceListModal] = useState(false);
  const [serviceUseModal, setServiceUseModal] = useState(false);

  const [serviceUsageOfSelectedUser, setServiceUsageOfSelectedUser] = useState({});
  useEffect(() => {
    async function getServiceTransactionsOfUser() {
      const { serviceTransactions } = await getServiceTransactionsByUser(token, selectedUser?._id);
      //   console.log("response of get service transaction of user", response.serviceTransactions);
      setServiceTransactions(serviceTransactions);
    }
    getServiceTransactionsOfUser();
  }, [token, selectedUser._id]);

  useEffect(() => {
    async function getProductTransactionsOfUser() {
      const { productTransactions } = await getProductTransactionsByUser(token, selectedUser?._id);
      //   console.log("response of get product transaction of user", response.productTransactions);
      setProductTransactions(productTransactions);
    }
    getProductTransactionsOfUser();
  }, [token, selectedUser?._id]);

  useEffect(() => {
    async function getServiceUsageByUser() {
      const response = await getAllServiceUsageByUser(token, selectedUser._id);
      setServiceUsageOfSelectedUser(response.serviceUsage?.at(0));
    }
    getServiceUsageByUser();
  }, [selectedUser._id, token]);

  const createProductTransactionOfUser = async (productId, quantity) => {
    try {
      const data = {
        user: selectedUser._id, // Assuming user data is stored in auth state
        location: selectedUser.preferred_location._id, // Replace with the correct location ID
        product: productId,
        quantity,
      };
      await createProductTransaction(token, data);
      const { productTransactions } = await getProductTransactionsByUser(token, selectedUser?._id);
      setProductTransactions(productTransactions);
      // console.log("Transaction created", response.data);
    } catch (err) {
      console.error("Error creating transaction", err);
    }
  };

  const createServiceTransactionOfUser = async (serviceId) => {
    try {
      const data = {
        user: selectedUser._id,
        service: serviceId, // Assuming user data is stored in auth state
        location: selectedUser.preferred_location._id, // Replace with the correct location ID
        type: "purchase",
      };
      const response = await createServiceTransaction(token, data);
      const updatedServiceUsageResponse = await getAllServiceUsageByUser(token, selectedUser._id);
      setServiceUsageOfSelectedUser(updatedServiceUsageResponse.serviceUsage?.at(0));
      const { serviceTransactions } = await getServiceTransactionsByUser(token, selectedUser?._id);
      setServiceTransactions(serviceTransactions);
      // console.log("Transaction created", response.data);
    } catch (err) {
      console.error("Error creating transaction", err);
    }
  };

  const createServiceUseTransactionOfUser = async (quantity) => {
    try {
      const data = {
        user: selectedUser._id, // Assuming user data is stored in auth state
        location: selectedUser.preferred_location._id, // Replace with the correct location ID
        type: "usage",
        quantity: quantity,
      };
      const response = await createServiceTransaction(token, data);
      const updatedServiceUsageResponse = await getAllServiceUsageByUser(token, selectedUser._id);
      setServiceUsageOfSelectedUser(updatedServiceUsageResponse.serviceUsage?.at(0));
      console.log("Transaction created", response.data);
    } catch (err) {
      console.error("Error creating transaction", err);
    }
  };
  const handleServiceListModal = () => {
    setServiceListModal(true);
  };
  const handleServiceUseModal = () => {
    setServiceUseModal(true);
  };
  const handleProductListModal = () => {
    setProductListModal(true);
  };
  // const handleViewTransactionModal = () => {
  //   setTransactionModal(true);
  // };
  const { columns, rows } = userProductTableData(productTransactions);
  const { columns: scols, rows: srows } = userServiceTableData(serviceTransactions);
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
                  {selectedUser.firstName} {selectedUser.lastName}
                </MDTypography>
                {/* <MDTypography variant="button" color="text" fontWeight="regular">
                  {selectedUser.email}
                </MDTypography> */}
                <MDBox height="100%" lineHeight={1}>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    {selectedUser.phone_number}
                  </MDTypography>
                </MDBox>
                <MDBox height="100%" lineHeight={1}>
                  <MDTypography variant="button" color="text" fontWeight="medium">
                    {serviceUsageOfSelectedUser?.available_balance
                      ? `Available Balance : ${serviceUsageOfSelectedUser?.available_balance}`
                      : "Not purchase any service yet"}
                  </MDTypography>
                </MDBox>
                <MDBox height="100%" lineHeight={1}>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    Preferred Location: {selectedUser.preferred_location.name}
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
              disabled={serviceUsageOfSelectedUser?.available_balance > 0 ? false : true}
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
              Services
            </MDTypography>
          </MDBox>
          <MDBox
            pt={1}
            sx={{
              maxHeight: "20vh", // Set fixed height for Services table
              overflowY: "auto", // Add scrollbar if content overflows
            }}
          >
            <DataTable
              table={{ columns: scols, rows: srows }}
              isSorted={true}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>

          <MDBox
            mt={2}
            py={1}
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
          <MDBox
            pt={1}
            sx={{
              maxHeight: "20vh", // Set fixed height for Services table
              overflowY: "auto", // Add scrollbar if content overflows
            }}
          >
            <DataTable
              table={{ columns, rows }}
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
