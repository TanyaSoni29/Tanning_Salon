/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  Switch,
  Avatar,
  FormControlLabel,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addUser, refreshUser } from "../../slices/profileSlice";
import { addLocation, refreshLocation } from "../../slices/locationSlice"; // Import refreshLocation
import { createCustomer } from "../../service/operations/userApi";
import { createLocation } from "service/operations/locationApi";

const CreateLocationModal = ({ onClose }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //   const [avatarPreview, setAvatarPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  // Fetch locations from Redux slice
  const { locations, loading } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(refreshLocation());
  }, [dispatch]);

  const handleSubmitForm = async (data) => {
    try {
      const newLocationData = {
        name: data.name,
        address: data.address,
        postCode: data.postCode,
        phone_number: data.phone_number,
      };
      const newLocation = await createLocation(token, newLocationData);
      if (newLocation) {
        dispatch(addLocation(newLocation));
      }
      dispatch(refreshLocation());
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
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
      <Typography id="modal-title" variant="h6">
        Add New Location
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box mt={2}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Name"
              variant="outlined"
              {...register("name", { required: true })}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              {...register("phone_number", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box>

          <Box mb={2} sx={{ display: "flex", gap: 2 }}></Box>
          <Box mb={2}>
            <TextField
              label="Address"
              variant="outlined"
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

export default CreateLocationModal;
