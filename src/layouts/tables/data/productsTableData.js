/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useSelector } from "react-redux";
import { getAllProducts } from "service/operations/productAndProductTransaction";

export default function data(handleEdit) {
  const [rowsData, setRowsData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const handleView = (productId) => {
    console.log(`Viewing product with id: ${productId}`);
    // Implement view logic here
  };

  const handleDelete = (productId) => {
    console.log(`Deleting product with id: ${productId}`);
    // Implement delete logic here
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts(token);
        console.log("getAllProducts response", response.data);
        setRowsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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

  const rows = rowsData.map((product) => ({
    Name: <Product image={product.image} name={product.name} />,
    Brand: <ProductBrand title={product.brand} description={product.description} />,
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
    createdAt: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {new Date(product.created_at).toLocaleDateString()}
      </MDTypography>
    ),
    action: (
      <MDBox
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="8px"
      >
        <RemoveRedEyeIcon onClick={() => handleView(product._id)} sx={{ cursor: "pointer" }} />
        <EditIcon onClick={() => handleEdit(product._id)} sx={{ cursor: "pointer" }} />
        <DeleteIcon onClick={() => handleDelete(product._id)} sx={{ cursor: "pointer" }} />
      </MDBox>
    ),
  }));

  return {
    columns: [
      { Header: "Product Name", accessor: "Name", width: "30%", align: "left" },
      { Header: "Brand", accessor: "Brand", align: "left" },
      { Header: "Price", accessor: "price", align: "center" },
      { Header: "Listed On", accessor: "createdAt", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows,
  };
}
