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

const EditUserModal = ({ onClose }) => {
  const { users, userIndex } = useSelector((state) => state.profile);
  const { locations, loading } = useSelector((state) => state.location);
  const [preferredLocation, setPreferredLocation] = useState("");

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const activeUser = users[userIndex];
  console.log("active user:", activeUser, userIndex);
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
  useEffect(() => {
    if (activeUser?.profile?.preferred_location && locations.length > 0) {
      setPreferredLocation(activeUser.profile.preferred_location);
    }
  }, [activeUser, locations]);

  const handleSubmitForm = async (data) => {
    try {
      const newUserData = {
        user_id: activeUser.user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
        post_code: data.post_code,
        phone_number: data.phone_number,
        gender: data.gender,
        gdpr_sms_active: data.gdpr_sms_active || false,
        gdpr_email_active: data.gdpr_email_active || false,
        referred_by: data.referred_by,
        preferred_location: data.preferred_location,
      };
      const updatedUser = await updateUserProfile(token, activeUser.user.id, newUserData);
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
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        post_code: "",
        phone_number: "",
        gender: "",
        referred_by: "",
        preferred_location: "",
        gdpr_sms_active: false,
        gdpr_email_active: false,
        // avatar: "",
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
        Edit Customer
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box mt={2}>
          <Box mb={2} sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="First Name"
              variant="outlined"
              defaultValue={activeUser.profile?.firstName}
              {...register("firstName", { required: true })}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              defaultValue={activeUser.profile?.lastName}
              {...register("lastName", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box>

          <Box mb={2} sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              defaultValue={activeUser.user?.email}
              {...register("email", { required: true })}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              defaultValue={activeUser.profile?.phone_number}
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
              defaultValue={activeUser.profile?.address}
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
              defaultValue={activeUser.profile?.post_code}
              {...register("post_code", { required: true })}
              sx={{ width: "100%" }}
            />

            <TextField
              label="Referred By"
              variant="outlined"
              defaultValue={activeUser.profile?.referred_by}
              {...register("referred_by", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: 2,
            }}
          >
            <select
              id="preferred_location"
              className="border border-border rounded-md p-2 w-[50%] bg-input focus:ring-primary focus:border-primary"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
              {...register("preferred_location", { required: true })}
              style={{
                fontSize: "14px", // Matches the font size of the MDInput
                height: "45px", // Matches the height of the input
              }}
              disabled={loading} // Disable dropdown if locations are loading
            >
              <option value="">Select location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>

            <select
              id="gender"
              className="border border-border rounded-md p-2 w-[50%] bg-input focus:ring-primary focus:border-primary"
              defaultValue={activeUser.profile?.gender}
              style={{
                fontSize: "14px", // Matches the font size of the MDInput
                height: "45px", // Matches the height of the input
              }}
              {...register("gender", { required: true })}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
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
          <Box display="flex" justifyContent="start" alignItems="center" sx={{ width: "100%" }}>
            <FormControlLabel
              control={
                <Switch
                  {...register("gdpr_sms_active")}
                  color="primary"
                  defaultChecked={activeUser.profile?.gdpr_sms_active}
                />
              }
              label="SMS"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontWeight: "medium", // Make it bold
                  color: "#6F727B", // Change text color
                  fontSize: "14px",
                  marginLeft: "-4px", // Adjust font size
                },
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  {...register("gdpr_email_active")}
                  color="primary"
                  defaultChecked={activeUser.profile?.gdpr_email_active}
                />
              }
              label="Email"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontWeight: "medium",
                  color: "#6F727B",
                  fontSize: "14px",
                  marginLeft: "-4px",
                },
              }}
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
