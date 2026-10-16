import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { showSnackbar } from "../redux/snackbarSlice";
import api from "../services/api";

function Login() {
  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
     // 1. Login and get JWT tokens
    const response = await api.post("/token/", {
      username: formData.username,
      password: formData.password,
    });

    const { access, refresh } = response.data;

    // Save JWT tokens
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    // Get user information from the registration data
    const profileResponse = await api.get("/accounts/profile/");
    const user = profileResponse.data;
    console.log("Logged-in user:", user);

     // 4. Save user information in Redux
    dispatch(login(user));
    
    // 5. Success message
    dispatch(
      showSnackbar({
        message: "Login successful!",
        severity: "success",
      })
    );

    // Redirect - Checkout/Orders can now use the JWT
    const redirectTo = location.state?.from || "/";

    setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, 800);

  } catch (error) {
    console.error("Login error:", error.response?.data);

    let message = "Invalid email or password.";

    if (error.response?.data?.detail) {
      message = error.response.data.detail;
    }

    dispatch(
      showSnackbar({
        message,
        severity: "error",
      })
    );
  }
};

  return (
    <>
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          py: 6,
          backgroundColor: "background.default",
        }}
      >
        <Container maxWidth="sm">
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
                Welcome Back
              </Typography>

              <Typography color="text.secondary">
                Login to your SHOP.CO account
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
              <TextField
                fullWidth
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
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

              <Box sx={{ textAlign: "right" }}>
                <Typography
                  component={Link}
                  to="/forgot-password"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 600,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 999,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Login
              </Button>

              <Divider sx={{ my: 1 }}>OR</Divider>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<Google />}
                sx={{
                  py: 1.4,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Continue with Google
              </Button>
            </Box>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography component="span" color="text.secondary" fontSize={14}>
                Don't have an account?{" "}
              </Typography>

              <Typography
                component={Link}
                to="/register"
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
                Sign Up
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default Login;
