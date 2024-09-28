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

export default function data(combinedTransactions) {
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

  const rows = combinedTransactions.map((transaction, i) => ({
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
  }));
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
          {row.createdAt}
        </MDTypography>
      ),
    })),
  };
}
