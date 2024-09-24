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
import { refreshLocation } from "../../slices/locationSlice"; // Import refreshLocation
import { createCustomer } from "../../service/operations/userApi";

const CreateCustomerModal = ({ onClose }) => {
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
    dispatch(refreshLocation()); // Fetch locations when component mounts
  }, [dispatch]);

  //   const handleAvatarChange = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setAvatarPreview(reader.result);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  const handleSubmitForm = async (data) => {
    try {
      const newUserData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
        postCode: data.postCode,
        phone_number: data.phone_number,
        gender: data.gender,
        gdpr_sms_active: data.gdpr_sms_active || false,
        gdpr_email_active: data.gdpr_email_active || false,
        referred_by: data.referred_by,
        preferred_location: data.preferred_location,
        // avatar: avatarPreview, // Store avatar preview or upload file
      };
      const newUser = await createCustomer(token, newUserData);
      if (newUser) {
        dispatch(addUser(newUser));
      }
      dispatch(refreshUser());
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
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        postCode: "",
        phone_number: "",
        gender: "",
        referred_by: "",
        preferred_location: "",
        gdpr_sms_active: false,
        gdpr_email_active: false,
        // avatar: "",
      });
      // setAvatarPreview(null); // Reset avatar preview
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
      <Typography id="modal-title" variant="h6">
        Add Customer
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box mt={2}>
          <Box mb={2} sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="First Name"
              variant="outlined"
              {...register("firstName", { required: true })}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              {...register("lastName", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box>

          <Box mb={2} sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              {...register("email", { required: true })}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              {...register("phone_number", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box>
          {/* <Box mb={2} sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="User Name"
              variant="outlined"
              {...register("userName", { required: true })}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Password"
              variant="outlined"
              {...register("password", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box> */}
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

            <TextField
              label="Referred By"
              variant="outlined"
              {...register("referred_by", { required: true })}
              sx={{ width: "100%" }}
            />
          </Box>

          {/* <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="location-label">Preferred Location</InputLabel>
              <Select
                labelId="location-label"
                label="Preferred Location"
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
          </Box> */}
          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            gap={2}
            sx={{ width: "100%" }}
          >
            <select
              id="preferred_location"
              className="border border-border rounded-md p-2 w-[50%] bg-input focus:ring-primary focus:border-primary"
              {...register("preferred_location", { required: true })}
              disabled={loading}
              style={{
                fontSize: "14px", // Matches the font size of the MDInput
                height: "45px", // Matches the height of the input
              }} // Disable dropdown if locations are loading
            >
              <option value="">Select location</option>
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </select>

            <select
              id="gender"
              className="border border-border rounded-md p-2 w-[50%] bg-input focus:ring-primary focus:border-primary"
              {...register("gender", { required: true })}
              style={{
                fontSize: "14px", // Matches the font size of the MDInput
                height: "45px", // Matches the height of the input
              }}
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
              control={<Switch {...register("gdpr_sms_active")} color="primary" />}
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
              control={<Switch {...register("gdpr_email_active")} color="primary" />}
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

export default CreateCustomerModal;
