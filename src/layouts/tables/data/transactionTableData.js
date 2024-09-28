/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { useSelector } from "react-redux";
import { formatDate } from "utils/formateDate";
import { getAllServiceTransactions } from "service/operations/serviceAndServiceTransaction";
import { getAllProductTransactions } from "service/operations/productAndProductTransaction";

export default function data(filteredTransaction, combinedTransactions, setCombinedTransactions) {
  const { token } = useSelector((state) => state.auth);
  const [serviceTransactions, setServiceTransactions] = useState([]);
  const [productTransactions, setProductTransactions] = useState([]);

  useEffect(() => {
    async function getTransactions() {
      try {
        // Fetch both product and service transactions concurrently
        const [serviceResponse, productResponse] = await Promise.all([
          getAllServiceTransactions(token),
          getAllProductTransactions(token),
        ]);
        console.log({ serviceResponse, productResponse });
        const serviceData = serviceResponse;
        const productData = productResponse;
        console.log({ serviceData: serviceData, productData: productData });
        // Map and structure service transactions
        const formattedServiceTransactions = serviceData.map((transaction) => ({
          id: transaction.transaction?.id,
          productName: transaction?.service?.name, // For service, this might be the service name
          userName: `${transaction.user_details?.firstName} ${transaction.user_details?.lastName}`,
          quantity: transaction.transaction?.quantity,
          price: transaction?.service?.price, // Service might not have a price, so defaulting to '-'
          location: transaction.user_details?.preferred_location?.name,
          type: transaction.transaction?.type === "used" ? "used" : "purchased",
          createdAt: transaction.transaction?.created_at,
        }));

        // Map and structure product transactions
        const formattedProductTransactions = productData.map((transaction) => ({
          id: transaction.transaction.id,
          productName: transaction?.product?.name, // For products, this is the product name
          userName: `${transaction.user_details?.firstName} ${transaction.user_details?.lastName}`,
          quantity: transaction.transaction?.quantity,
          price: transaction?.product?.price, // Product has a price
          location: transaction?.user_details?.preferred_location?.name,
          type: "Product", // Assuming all product transactions are "Product"
          createdAt: transaction?.transaction?.created_at,
        }));

        // Combine both sets of transactions
        const combined = [...formattedServiceTransactions, ...formattedProductTransactions];
        console.log("combined data transaction", combined);
        setCombinedTransactions(combined);
      } catch (error) {
        console.log("Error getting transactions", error);
      }
    }

    getTransactions();
  }, [token]);
  // console.log("service Transactions set in empty array", serviceTransactions);
  const Product = ({ name }) => (
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );
  const User = ({ name }) => (
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );

  const rows = (filteredTransaction.length > 0 ? filteredTransaction : combinedTransactions).map(
    (transaction, i) => ({
      productName: transaction?.productName ? (
        <Product name={transaction?.productName} />
      ) : (
        <MDTypography variant="caption" fontWeight="medium">
          -
        </MDTypography>
      ),
      userName: <User name={transaction?.userName} />,
      price: transaction?.price ? (
        <MDTypography variant="caption" fontWeight="medium">
          {transaction?.price}
        </MDTypography>
      ) : (
        <MDTypography variant="caption" fontWeight="medium">
          -
        </MDTypography>
      ),
      quantity: transaction?.quantity ? (
        <MDTypography variant="caption" fontWeight="medium">
          {transaction?.quantity}
        </MDTypography>
      ) : (
        <MDTypography variant="caption" fontWeight="medium">
          -
        </MDTypography>
      ),
      location: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {transaction?.location}
        </MDTypography>
      ),
      type: (
        // <MDTypography variant="caption" fontWeight="semibold">
        //   {transaction.type === "purchase" ? "purchase" : "usage"}
        // </MDTypography>
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={
              transaction.type === "purchased"
                ? "Purchased"
                : transaction.type === "used"
                ? "Used"
                : "Product"
            }
            color={
              transaction.type === "purchased"
                ? "success"
                : transaction.type === "used"
                ? "error"
                : "dark"
            }
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      createdAt: transaction.createdAt,
      // (
      //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //     {formatDate(transaction.created_at)} {transaction.created_at?.split("T").at(1).slice(0, 8)}
      //   </MDTypography>
      // ),
    })
  );
  const sortedRows = rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return {
    columns: [
      { Header: "User Name", accessor: "userName", align: "left" },
      { Header: "Location", accessor: "location", align: "center" },
      { Header: "Product / Service", accessor: "productName", align: "center" },
      { Header: "Price", accessor: "price", align: "center" },
      { Header: "Quantity / Used Minutes", accessor: "quantity", align: "center" },
      { Header: "Transaction Type", accessor: "type", align: "center" },
      { Header: "Transaction Time", accessor: "createdAt", align: "center" },
    ],

    rows: sortedRows.map((row) => ({
      ...row,
      createdAt: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {formatDate(row.createdAt)} {row.createdAt?.split("T")[1]?.slice(0, 8)}
        </MDTypography>
      ),
    })),
  };
}
