/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { useSelector } from "react-redux";
import { formatDate } from "utils/formateDate";
import { getServiceTransactionsByUser } from "service/operations/userApi";

export default function data(serviceTransactions) {
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

  const rows = serviceTransactions.map((transaction, i) => ({
    productName:
      transaction.type === "purchase" ? (
        <Product name={transaction.service?.serviceName} />
      ) : (
        <MDTypography variant="caption" fontWeight="medium">
          -
        </MDTypography>
      ),
    userName: <User firstName={transaction.user.firstName} lastName={transaction.user.lastName} />,
    price:
      transaction.type === "purchase" ? (
        <MDTypography variant="caption" fontWeight="medium">
          {transaction.service?.price}
        </MDTypography>
      ) : (
        <MDTypography variant="caption" fontWeight="medium">
          -
        </MDTypography>
      ),
    quantity:
      transaction.type === "usage" ? (
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
        {transaction?.location?.name}
      </MDTypography>
    ),
    type: (
      // <MDTypography variant="caption" fontWeight="semibold">
      //   {transaction.type === "purchase" ? "purchase" : "usage"}
      // </MDTypography>
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={transaction.type === "purchase" ? "Purchase" : "Usage"}
          color={transaction.type === "purchase" ? "success" : "error"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    createdAt: transaction.created_at,
  }));
  const sortedRows = rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return {
    columns: [
      { Header: "User Name", accessor: "userName", align: "left" },
      { Header: "Location", accessor: "location", align: "center" },
      { Header: "Service", accessor: "productName", align: "center" },
      { Header: "Price", accessor: "price", align: "center" },
      { Header: "Used Minutes", accessor: "quantity", align: "center" },
      { Header: "Transaction Type", accessor: "type", align: "center" },
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
