/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProduct } from "service/operations/productAndProductTransaction";
import { refreshProduct } from "slices/productSlice";

const EditProductModal = ({ onClose }) => {
  const { products, productIndex } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const activeProduct = products[productIndex];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (!activeProduct) {
      onClose();
    }
  }, []);

  const handleSubmitForm = async (data) => {
    try {
      const newProductData = {
        name: data.name,
        price: data.price,
      };
      const updatedProduct = await updateProduct(token, activeProduct._id, newProductData);
      if (updatedProduct) {
        dispatch({
          type: "product/updateProduct", // Ensure this matches the action type name
          payload: updatedProduct,
        });
      }
      dispatch(refreshProduct());
      onClose();
    } catch (error) {
      console.error(error);
      onClose();
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        price: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  if (!activeProduct) return null; // Optionally render a loading state

  return (
    <Box
      sx={{
        width: "20vw",
        padding: 2,
        margin: "auto",
        marginTop: "15%",
        backgroundColor: "#fff",
        borderRadius: 2,
      }}
    >
      <Typography id="logout-modal-title" variant="h6">
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box mt={2}>
          <Box mb={2} sx={{ width: "100%", display: "flex", gap: 2 }}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              defaultValue={activeProduct.name}
              {...register("name", { required: true })}
              sx={{ width: "100%" }}
            />
            {errors.name && <span className="">Please enter product name</span>}
            {/* <TextField
              id="brand"
              label="Brand"
              variant="outlined"
              defaultValue={activeProduct.brand}
              {...register("brand", { required: true })}
              sx={{ width: "100%" }}
            />
            {errors.brand && <span className="">Please enter product brand</span>} */}
          </Box>

          <Box mb={2}>
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              defaultValue={activeProduct.price}
              {...register("price", { required: true })}
              sx={{ width: "100%" }}
            />
            {errors.price && (
              <span className="-mt-1 text-[12px] text-yellow-100">Please enter product price</span>
            )}
          </Box>
          {/* <Box mb={2}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              defaultValue={activeProduct.description}
              multiline
              rows={2} // Set rows for a multi-line text field
              {...register("description", { required: true })}
              sx={{ width: "100%" }}
            />
            {errors.description && <span className="">Please enter product description</span>}
          </Box> */}
        </Box>
        <Box mt={2} display="flex" justifyContent="end" gap="1rem">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#328BED",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "8px",
              boxShadow: "0 3px 5px rgba(0,0,0,0.3)",
              "&:hover": {
                backgroundColor: "#63A0F5",
              },
            }}
            type="submit"
          >
            Yes
          </Button>
          <Button variant="contained" color="info" onClick={() => onClose()}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProductModal;
