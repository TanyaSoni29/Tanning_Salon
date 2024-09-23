/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useSelector } from "react-redux";
import { formatDate } from "utils/formateDate";
import { getAllProductTransactions } from "service/operations/productAndProductTransaction";

export default function data() {
  const { token } = useSelector((state) => state.auth);
  const [productTransactions, setProductTransactions] = useState([]);
  useEffect(() => {
    async function getProductTransaction() {
      try {
        const response = await getAllProductTransactions(token);
        console.log("product Transactions", response.data);
        setProductTransactions(response.data);
      } catch (error) {
        console.log("Error getting all product Transactions");
      }
    }
    getProductTransaction();
  }, []);
  const Product = ({ name }) => (
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );
  const User = ({ firstName, lastName }) => (
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="caption" fontWeight="medium">
        {firstName} {lastName}
      </MDTypography>
    </MDBox>
  );

  const rows = productTransactions.map((transaction, i) => ({
    productName: <Product name={transaction.product.name} />,
    quantity: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {transaction.quantity}
      </MDTypography>
    ),
    userName: <User firstName={transaction.user.firstName} lastName={transaction.user.lastName} />,
    price: (
      <MDTypography variant="caption" fontWeight="medium">
        {transaction.product.price}
      </MDTypography>
    ),
    location: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {transaction.location.name}
      </MDTypography>
    ),
    createdAt: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {formatDate(transaction.created_at)} {transaction.created_at?.split("T").at(1).slice(0, 8)}
      </MDTypography>
    ),
  }));

  return {
    columns: [
      { Header: "User Name", accessor: "userName", align: "left" },
      { Header: "Location", accessor: "location", align: "center" },
      { Header: "Product", accessor: "productName", align: "center" },
      { Header: "Price", accessor: "price", align: "center" },
      { Header: "Quantity", accessor: "quantity", align: "center" },
      { Header: "Transaction Time", accessor: "createdAt", align: "center" },
    ],

    rows,
  };
}
