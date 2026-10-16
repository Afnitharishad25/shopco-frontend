import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/snackbarSlice";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    country: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Check password match
  //   if (formData.password !== formData.confirmPassword) {
  //     dispatch(
  //       showSnackbar({
  //         message: "Passwords do not match.",
  //         severity: "error",
  //       }),
  //     );
  //     return;
  //   }

  //   // Check whether an account already exists
  //   const existingUser = JSON.parse(localStorage.getItem("registeredUser"));

  //   if (
  //     existingUser &&
  //     existingUser.email.toLowerCase() === formData.email.toLowerCase()
  //   ) {
  //     dispatch(
  //       showSnackbar({
  //         message: "An account with this email already exists.",
  //         severity: "error",
  //       }),
  //     );
  //     return;
  //   }

  //   // Temporary frontend registration
  //   const newUser = {
  //     firstName: formData.firstName,
  //     lastName: formData.lastName,
  //     email: formData.email,
  //     phone: formData.phone,
  //     country: formData.country,

  //     // Temporary only - will be replaced by backend authentication
  //     password: formData.password,
  //   };

  //   localStorage.setItem("registeredUser", JSON.stringify(newUser));

  //   // Show global Redux Snackbar
  //   dispatch(
  //     showSnackbar({
  //       message: "Registration successful! Please login.",
  //       severity: "success",
  //     }),
  //   );

  //   // Go to login after showing the message
  //   setTimeout(() => {
  //     navigate("/login");
  //   }, 1200);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/accounts/register/", {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      console.log("Registration successful:", response.data);

      dispatch(
        showSnackbar({
          message: "Account created successfully! Please login.",
          severity: "success",
        }),
      );

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response?.data);

      const errorData = error.response?.data;

      let message = "Registration failed. Please try again.";
      
      if (errorData?.username) {
        message = errorData.username[0];
      } else if (errorData?.email) {
        message = errorData.email[0];
      } else if (errorData?.confirmPassword) {
        message = errorData.confirmPassword[0];
      } else if (errorData?.password) {
        message = errorData.password[0];
      } else if (errorData?.detail) {
        message = errorData.detail;
      }

      dispatch(
        showSnackbar({
          message,
          severity: "error",
        }),
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "70vh",
          py: 6,
          backgroundColor: "background.default",
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                sm: 5,
              },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  letterSpacing: "-1px",
                  mb: 1,
                }}
              >
                Create Account
              </Typography>

              <Typography color="text.secondary">
                Join SHOP.CO and start shopping today
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                  },
                  gap: 2,
                }}
              >
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />

                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Box>
              
              <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  fullWidth
              />
                
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <TextField
                select
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <MenuItem value="UAE">United Arab Emirates</MenuItem>
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="USA">United States</MenuItem>
                <MenuItem value="UK">United Kingdom</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="Australia">Australia</MenuItem>
              </TextField>

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 999,
                  fontWeight: 700,
                  textTransform: "none",
                  mt: 1,
                }}
              >
                Create Account
              </Button>
            </Box>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography component="span" color="text.secondary" fontSize={14}>
                Already have an account?{" "}
              </Typography>

              <Typography
                component={Link}
                to="/login"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 14,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Login
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default Register;
