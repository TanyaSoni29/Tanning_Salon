/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../../service/operations/userProfileApi";
import { refreshUser } from "slices/profileSlice";
import { refreshLocation } from "slices/locationSlice";

const EditUserModal = ({ onClose }) => {
  const { users, userIndex } = useSelector((state) => state.profile);
  const { locations, loading } = useSelector((state) => state.location);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const activeUser = users[userIndex];
  console.log("active user:", activeUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (!activeUser) {
      onClose();
    }
  }, []);

  useEffect(() => {
    dispatch(refreshLocation()); // Fetch locations when component mounts
  }, [dispatch]);

  const handleSubmitForm = async (data) => {
    try {
      const newUserData = {
        // userName: data.userName,
        // firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        email: data.email,
        address: data.address,
        postCode: data.postCode,
        phone_number: data.phone_number,
        gender: data.gender,
        gdpr_sms_active: data.gdpr_sms_active || false,
        gdpr_email_active: data.gdpr_email_active || false,
        referred_by: data.referred_by,
        preferred_location: data.preferred_location,
      };
      const updatedUser = await updateUserProfile(token, activeUser._id, newUserData);
      if (updatedUser) {
        dispatch({
          type: "profile/updateUser", // Ensure this matches the action type name
          payload: updatedUser,
        });
      }
      dispatch(refreshUser());
      onClose();
    } catch (error) {
      console.error(error);
      onClose();
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        // userName: "",
        // firstName: "",
        lastName: "",
        role: "",
        email: "",
        address: "",
        postCode: "",
        phone_number: "",
        gender: "",
        referred_by: "",
        preferred_location: "",
        avatar: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  if (!activeUser) return null;

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
        Edit User
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box mt={2}>
          <Box mb={2} sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="First Name"
              variant="outlined"
              defaultValue={activeUser.firstName}
              {...register("firstName", { required: true })}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              defaultValue={activeUser.lastName}
              {...register("lastName", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box>

          <Box mb={2} sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              defaultValue={activeUser.email}
              {...register("email", { required: true })}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              defaultValue={activeUser.phone_number}
              {...register("phone_number", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box>
          {/* <Box mb={2} sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="User Name"
              variant="outlined"
              defaultValue={activeUser.userName}
              {...register("userName", { required: true })}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Password"
              variant="outlined"
              defaultValue={activeUser.password}
              {...register("password", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box> */}
          <Box mb={2}>
            <TextField
              label="Address"
              variant="outlined"
              defaultValue={activeUser.address}
              {...register("address", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box>

          <Box mb={2} sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Post Code"
              variant="outlined"
              defaultValue={activeUser.postCode}
              {...register("postCode", { required: true })}
              sx={{ width: "100%" }}
            />

            <TextField
              label="Referred By"
              variant="outlined"
              defaultValue={activeUser.referred_by}
              {...register("referred_by", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box>
          <Box mb={2} sx={{ display: "flex", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                label="Role"
                defaultValue={activeUser.role}
                {...register("role", { required: true })}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                label="Gender"
                defaultValue={activeUser.gender}
                {...register("gender", { required: true })}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="location-label">Preferred Location</InputLabel>
              <Select
                labelId="location-label"
                label="Preferred Location"
                defaultValue={activeUser.preferred_location._id}
                {...register("preferred_location", { required: true })}
                disabled={loading} // Disable dropdown if locations are loading
              >
                {locations.map((location) => (
                  <MenuItem key={location._id} value={location._id}>
                    {location.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* <Box mb={2}>
              <Typography variant="body2" mb={1}>
                Upload Avatar
              </Typography>
              <input accept="image/*" type="file" onChange={handleAvatarChange} />
              {avatarPreview && (
                <Avatar
                  src={avatarPreview}
                  alt="Avatar Preview"
                  sx={{ width: 100, height: 100, mt: 2 }}
                />
              )}
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
