import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/snackbarSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("/accounts/forgot-password/", {
        email,
      });

      dispatch(
        showSnackbar({
          message:
            response.data.detail ||
            "If an account exists with this email, a reset link has been sent.",
          severity: "success",
        })
      );

      setEmail("");
    } catch (error) {
      dispatch(
        showSnackbar({
          message:
            error.response?.data?.detail ||
            "Something went wrong. Please try again.",
          severity: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
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
              Forgot Password?
            </Typography>

            <Typography color="text.secondary">
              Enter your email address and we'll send you a
              password reset link.
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
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 999,
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Box>

          <Box sx={{ textAlign: "center", mt: 4 }}>
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
              ← Back to Login
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default ForgotPassword;