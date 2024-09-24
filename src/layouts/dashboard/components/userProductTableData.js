/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useSelector } from "react-redux";
import { formatDate } from "utils/formateDate";
import { getProductTransactionsByUser } from "service/operations/userApi";

export default function data(productTransactions) {
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
    createdAt: transaction.created_at,
  }));
  const sortedRows = rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return {
    columns: [
      { Header: "User Name", accessor: "userName", align: "left" },
      { Header: "Location", accessor: "location", align: "center" },
      { Header: "Product", accessor: "productName", align: "center" },
      { Header: "Price", accessor: "price", align: "center" },
      { Header: "Quantity", accessor: "quantity", align: "center" },
      { Header: "Transaction Time", accessor: "createdAt", align: "center" },
    ],

    rows: sortedRows.map((row) => ({
      ...row,
      createdAt: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {formatDate(row.createdAt)} {row.createdAt?.split("T").at(1).slice(0, 8)}
        </MDTypography>
      ),
    })),
  };
}
