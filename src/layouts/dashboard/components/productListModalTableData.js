/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import React, { useState } from "react";
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
import { Button, MenuItem, Select } from "@mui/material";

export default function data(createProductTransactionOfUser) {
  const { products } = useSelector((state) => state.product);
  const [quantities, setQuantities] = useState(() => {
    const initialQuantities = {};
    products?.forEach((product) => {
      initialQuantities[product.id] = 0; // Start with quantity 0 for each product
    });
    return initialQuantities;
  });
  const handleQuantityChange = (e, productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Number(e.target.value),
    }));
  };

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
  console.log("products----", products);
  const rows = products?.map((product, i) => ({
    Name: <Product image={product.image} name={product.name} />,
    // Brand: <ProductBrand title={product?.brand} description={product?.description} />,
    price: (
      <MDTypography variant="caption" fontWeight="bold">
        {product?.price}
      </MDTypography>
    ),
    type: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={product?.type === "Product" ? "Product" : "Service"}
          color={product?.type === "Product" ? "success" : "dark"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    quantity: (
      <Select
        value={quantities[product?.id] || 0}
        onChange={(e) => handleQuantityChange(e, product?.id)}
        sx={{ width: "60px" }}
      >
        {[...Array(11).keys()].map((q) => (
          <MenuItem key={q} value={q}>
            {q}
          </MenuItem>
        ))}
      </Select>
    ),
    // action: (
    //   <Button
    //     variant="contained"
    //     onClick={() => createProductTransactionOfUser(product._id, quantities[product._id] || 1)}
    //     sx={{
    //       backgroundColor: "#000",
    //       color: "#fff",
    //       "&:hover": {
    //         backgroundColor: "#333",
    //         color: "#fff",
    //       },
    //       "&:focus": {
    //         color: "#fff",
    //       },
    //       "&:active": {
    //         color: "#fff",
    //       },
    //       "&:disabled": {
    //         backgroundColor: "#333",
    //         color: "#fff",
    //       },
    //     }}
    //   >
    //     Add
    //   </Button>
    // ),
  }));

  return {
    columns: [
      { Header: "Product Name", accessor: "Name", width: "30%", align: "left" },
      // { Header: "Brand", accessor: "Brand", align: "left" },
      { Header: "Price", accessor: "price", align: "center" },
      { Header: "Quantity", accessor: "quantity", align: "center" },
      //   { Header: "action", accessor: "action", align: "center" },
    ],

    rows,
    quantities,
  };
}
