/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch, useSelector } from "react-redux";
import { setProductIndex } from "slices/productSlice";
import { formatDate } from "utils/formateDate";

export default function data(handleEdit, setIsDeleteOpen, setViewModal) {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const Product = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar
        src={
          image
            ? image
            : "https://c8.alamy.com/comp/R82P02/product-hand-written-word-text-for-typography-design-in-black-and-white-color-can-be-used-for-a-logo-branding-or-card-R82P02.jpg"
        }
        name={name}
        size="sm"
      />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const ProductBrand = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const rows = products.map((product, i) => ({
    Name: <Product image={product.image} name={product.name} />,
    // Brand: <ProductBrand title={product.brand} description={product.description} />,
    price: (
      <MDTypography variant="caption" fontWeight="bold">
        {product.price}
      </MDTypography>
    ),
    type: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={product.type === "Product" ? "Product" : "Service"}
          color={product.type === "Product" ? "success" : "dark"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    createdAt: product.created_at,
    action: (
      <MDBox
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="8px"
      >
        <RemoveRedEyeIcon
          onClick={() => {
            dispatch(setProductIndex(i));
            setViewModal(true);
          }}
          sx={{ cursor: "pointer" }}
        />
        <EditIcon
          onClick={() => {
            dispatch(setProductIndex(i));
            handleEdit();
          }}
          sx={{ cursor: "pointer" }}
        />
        <DeleteIcon
          onClick={() => {
            dispatch(setProductIndex(i));
            setIsDeleteOpen(true);
          }}
          sx={{ cursor: "pointer" }}
        />
      </MDBox>
    ),
  }));
  const sortedRows = rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return {
    columns: [
      { Header: "Product Name", accessor: "Name", align: "left" },
      // { Header: "Brand", accessor: "Brand", align: "left" },
      { Header: "Price", accessor: "price", align: "center" },
      { Header: "Listed On", accessor: "createdAt", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: sortedRows.map((row) => ({
      ...row,
      createdAt: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {formatDate(product.created_at)}
        </MDTypography>
      ),
    })),
  };
}
