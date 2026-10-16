import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../services/api";
import { showSnackbar } from "../redux/snackbarSlice";

function ResetPassword() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      dispatch(
        showSnackbar({
          message: "Passwords do not match.",
          severity: "error",
        })
      );
      return;
    }

    if (password.length < 8) {
      dispatch(
        showSnackbar({
          message: "Password must be at least 8 characters.",
          severity: "error",
        })
      );
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        `/accounts/reset-password/${uidb64}/${token}/`,
        {
          password,
          confirmPassword,
        }
      );

      dispatch(
        showSnackbar({
          message:
            response.data.detail || "Password reset successful.",
          severity: "success",
        })
      );

      setPassword("");
      setConfirmPassword("");

      // Go to login after successful reset
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      dispatch(
        showSnackbar({
          message:
            error.response?.data?.detail ||
            "Unable to reset password. Please try again.",
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
              Reset Password
            </Typography>

            <Typography color="text.secondary">
              Enter your new password below.
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
              label="New Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
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
              {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;