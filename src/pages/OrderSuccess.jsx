import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          minHeight: "65vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 80,
              mb: 2,
              color: "success.main",
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: {
                xs: 28,
                md: 40,
              },
            }}
          >
            Order Placed Successfully!
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 500,
              mx: "auto",
              mb: 4,
            }}
          >
            Thank you for your purchase. Your order has been received and will
            be processed shortly.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/orders")}
              sx={{ minWidth: 180 }}
            >
              View My Orders
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/shop")}
              sx={{
                minWidth: 180,
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default OrderSuccess;
