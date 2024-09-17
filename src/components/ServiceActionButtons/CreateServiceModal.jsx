/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createService } from "../../service/operations/serviceAndServiceTransaction";
import { addService } from "slices/serviceSlice";
import { refreshService } from "slices/serviceSlice";

const CreateServiceModal = ({ onClose }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const handleSubmitForm = async (data) => {
    try {
      const newServiceData = {
        serviceName: data.serviceName,
        minutesAvailable: data.minutesAvailable,
        price: data.price,
      };
      const newService = await createService(token, newServiceData);
      if (newService) {
        dispatch(addService(newService));
      }
      dispatch(refreshService());
      onClose();
    } catch (error) {
      console.error(error);
      onClose();
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        serviceName: "",
        minutesAvailable: "",
        price: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <Box
      sx={{
        width: 500,
        padding: 2,
        margin: "auto",
        marginTop: "15%",
        backgroundColor: "#fff",
        borderRadius: 2,
      }}
    >
      <Typography id="logout-modal-title" variant="h6">
        Add Service
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box mt={2}>
          <Box mb={2} sx={{ width: "100%", display: "flex", gap: 2 }}>
            <TextField
              id="serviceName"
              label="Service Name"
              variant="outlined"
              {...register("serviceName", { required: true })}
              sx={{ width: "100%" }}
            />
            {errors.name && (
              <span style={{ fontSize: "12px", color: "red" }}>Please enter service name</span>
            )}

            <TextField
              id="minutesAvailable"
              label="Minutes Available"
              variant="outlined"
              {...register("minutesAvailable", { required: true })}
              sx={{ width: "100%" }}
            />
            {errors.brand && (
              <span style={{ fontSize: "12px", color: "red" }}>
                Please enter service minutes available
              </span>
            )}
          </Box>

          <Box mb={2}>
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              {...register("price", { required: true })}
              sx={{ width: "100%" }}
            />
            {errors.price && (
              <span style={{ fontSize: "12px", color: "red" }}>Please enter product price</span>
            )}
          </Box>
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

export default CreateServiceModal;
