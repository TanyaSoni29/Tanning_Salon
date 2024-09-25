/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../../service/operations/userProfileApi";
import { refreshUser } from "slices/profileSlice";
import { refreshLocation } from "slices/locationSlice";
import { updateLocation } from "service/operations/locationApi";

const EditUserModal = ({ onClose }) => {
  const { locations, loading, locationIndex } = useSelector((state) => state.location);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const activeLocation = locations[locationIndex];
  console.log("active user:", activeLocation, locationIndex);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (!activeLocation) {
      onClose();
    }
  }, []);

  useEffect(() => {
    dispatch(refreshLocation()); // Fetch locations when component mounts
  }, [dispatch]);

  const handleSubmitForm = async (data) => {
    try {
      const newUserData = {
        name: data.name,
        address: data.address,
        postCode: data.postCode,
        phone_number: data.phone_number,
      };
      const updatedLocation = await updateLocation(token, activeLocation._id, newUserData);
      if (updatedLocation) {
        dispatch({
          type: "location/updateLocation", // Ensure this matches the action type name
          payload: updatedLocation,
        });
      }
      dispatch(refreshLocation());
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
        address: "",
        postCode: "",
        phone_number: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  if (!activeLocation) return null;

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
        Edit Location
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box mt={2}>
          <Box mb={2} sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="name"
              variant="outlined"
              defaultValue={activeLocation.name}
              {...register("name", { required: true })}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              defaultValue={activeLocation.phone_number}
              {...register("phone_number", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Address"
              variant="outlined"
              defaultValue={activeLocation.address}
              {...register("address", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box>

          <Box
            mb={2}
            sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              label="Post Code"
              variant="outlined"
              defaultValue={activeLocation.postCode}
              {...register("postCode", { required: true })}
              sx={{ width: "100%" }}
            />
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
            Submit
          </Button>
          <Button variant="contained" color="info" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditUserModal;
