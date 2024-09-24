/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateService } from "service/operations/serviceAndServiceTransaction";
import { refreshService } from "slices/serviceSlice";

const EditServiceModal = ({ onClose }) => {
  const { services, serviceIndex } = useSelector((state) => state.service);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const activeService = services[serviceIndex];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (!activeService) {
      onClose();
    }
  }, []);

  const handleSubmitForm = async (data) => {
    try {
      const newServiceData = {
        serviceName: data.serviceName,
        minutesAvailable: data.minutesAvailable,
        price: data.price,
      };
      const updatedService = await updateService(token, activeService._id, newServiceData);
      if (updatedService) {
        dispatch({
          type: "service/updateService", // Ensure this matches the action type name
          payload: updatedService,
        });
      }
      dispatch(refreshService());
      onClose();
    } catch (error) {
      console.error(error);
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

  if (!activeService) return null; // Optionally render a loading state

  return (
    <Box
      sx={{
        width: "30vw",
        padding: 2,
        margin: "auto",
        marginTop: "15%",
        backgroundColor: "#fff",
        borderRadius: 2,
      }}
    >
      <Typography id="logout-modal-title" variant="h6">
        Edit Service
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box mt={2}>
          <Box mb={2} sx={{ width: "100%", display: "flex", gap: 2 }}>
            <TextField
              id="serviceName"
              label="Service Name"
              variant="outlined"
              defaultValue={activeService.serviceName}
              {...register("serviceName", { required: true })}
              sx={{ width: "100%" }}
            />
            {errors.name && <span className="">Please enter Service name</span>}
          </Box>

          <Box mb={2} sx={{ width: "100%", display: "flex", gap: 2 }}>
            <TextField
              id="minutesAvailable"
              label="Minutes Available"
              variant="outlined"
              defaultValue={activeService.minutesAvailable}
              {...register("minutesAvailable", { required: true })}
              sx={{ width: "100%" }}
            />
            {errors.brand && <span className="">Please enter minutes available</span>}
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              defaultValue={activeService.price}
              {...register("price", { required: true })}
              sx={{ width: "100%" }}
            />
            {errors.price && (
              <span className="-mt-1 text-[12px] text-yellow-100">Please enter service price</span>
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

export default EditServiceModal;
