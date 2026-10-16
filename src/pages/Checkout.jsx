import React, { useState , useEffect} from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { showSnackbar } from "../redux/snackbarSlice";
import api from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const accessToken = localStorage.getItem("access");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (!accessToken) {
      dispatch(
        showSnackbar({
          message: "Please login to continue to checkout",
          severity: "warning",
        }),
      );

      navigate("/login", {
        state: { from: "/checkout" },
      });
    }
  }, [accessToken, dispatch, navigate]);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      dispatch(
        showSnackbar({
          message: "Please login to place an order",
          severity: "warning",
        }),
      );

      navigate("/login", {
        state: { from: "/checkout" },
    });
      return;
    }

    const order = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,

      address: formData.address,
      city: formData.city,
      country: formData.country,
      postal_code: formData.postalCode,

      subtotal: subtotal,
      delivery: 0,
      total: subtotal,

      items: cartItems.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
    };

    try {
      // Save order to Django/PostgreSQL
      await api.post("/orders/", order);

      // Clear cart only after successful API request
      dispatch(clearCart());

      dispatch(
        showSnackbar({
          message: "Order placed successfully",
          severity: "success",
        }),
      );

      navigate("/order-success");
    } catch (error) {
      console.error("Order creation failed:", error);
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);

      dispatch(
        showSnackbar({
          message: "Failed to place order. Please try again.",
          severity: "error",
        }),
      );
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Container
          maxWidth="xl"
          sx={{
            py: 10,
            minHeight: "60vh",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 2,
            }}
          >
            Your cart is empty
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Add some products before proceeding to checkout.
          </Typography>

          <Button variant="contained" onClick={() => navigate("/shop")}>
            Continue Shopping
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 5,
            md: 8,
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: {
              xs: 30,
              md: 42,
            },
            mb: 5,
          }}
        >
          CHECKOUT
        </Typography>

        <Grid
          container
          spacing={{
            xs: 3,
            md: 5,
          }}
        >
          {/* ================= CUSTOMER DETAILS ================= */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                p: {
                  xs: 2,
                  md: 4,
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                Delivery Information
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      type="email"
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      required
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label="Postal Code"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      required
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 4,
                    minHeight: 52,
                  }}
                >
                  Place Order
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* ================= ORDER SUMMARY ================= */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                p: {
                  xs: 2.5,
                  md: 4,
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                Your Order
              </Typography>

              {cartItems.map((item) => (
                <Box
                  key={`${item.id}-${item.size}`}
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 2.5,
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: 70,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 2,
                      backgroundColor: "secondary.main",
                    }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      {item.name}
                    </Typography>

                    {item.color && (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                          Color:
                        </Typography>

                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            backgroundColor:
                              item.color?.toLowerCase() || "#ccc",
                            border:
                              item.color?.toLowerCase() === "white"
                                ? "1px solid #ccc"
                                : "1px solid transparent",
                          }}
                          title={item.color}
                        />

                        <Typography variant="body2" color="text.secondary">
                          {item.color}
                        </Typography>
                      </Stack>
                    )}

                    {item.size && (
                      <Typography variant="body2" color="text.secondary">
                        Size: {item.size}
                      </Typography>
                    )}

                    <Typography variant="body2" color="text.secondary">
                      Qty: {item.quantity}
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 700,
                        mt: 0.5,
                      }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Divider sx={{ my: 3 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography color="text.secondary">Subtotal</Typography>

                <Typography fontWeight={600}>${subtotal.toFixed(2)}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography color="text.secondary">Delivery</Typography>

                <Typography fontWeight={600}>Free</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  Total
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: 22,
                  }}
                >
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Checkout;
