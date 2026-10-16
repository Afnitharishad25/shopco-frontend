import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircleIcon from "@mui/icons-material/Circle";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { removeFromCart, updateQuantity } from "../redux/cartSlice";

import { Link as RouterLink } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart items from Redux
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <>
        <Container
          maxWidth="xl"
          sx={{
            py: {
              xs: 8,
              md: 12,
            },
            minHeight: "60vh",
          }}
        >
          {/* Breadcrumb */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: {
                xs: 3,
                md: 5,
              },
            }}
          >
            <Link
              component={RouterLink}
              to="/"
              underline="hover"
              color="inherit"
            >
              Home
            </Link>{" "}
            /{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              cart{" "}
            </Typography>
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: 30,
                md: 42,
              },
              mb: 4,
            }}
          >
            YOUR CART
          </Typography>

          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              Your cart is empty
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Looks like you haven't added anything to your cart yet.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/shop")}
              startIcon={<ArrowBackIcon />}
            >
              Continue Shopping
            </Button>
          </Box>
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
        {/* Page title */}
        <Typography
          variant="h2"
          sx={{
            fontSize: {
              xs: 30,
              md: 42,
            },
            mb: {
              xs: 4,
              md: 5,
            },
          }}
        >
          YOUR CART
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.5fr 1fr",
            },
            gap: {
              xs: 3,
              md: 5,
            },
            alignItems: "start",
          }}
        >
          {/* ================= CART ITEMS ================= */}
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: {
                xs: 2,
                md: 3,
              },
            }}
          >
            {cartItems.map((item, index) => (
              <React.Fragment key={`${item.id}-${item.size}`}>
                <Box
                  sx={{
                    display: "flex",
                    gap: {
                      xs: 2,
                      md: 3,
                    },
                    py: index === 0 ? 0 : 3,
                  }}
                >
                  {/* Product image */}
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: {
                        xs: 90,
                        sm: 110,
                      },
                      height: {
                        xs: 110,
                        sm: 130,
                      },
                      objectFit: "cover",
                      borderRadius: 2,
                      backgroundColor: "secondary.main",
                      flexShrink: 0,
                    }}
                  />

                  {/* Product information */}
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: {
                            xs: 14,
                            sm: 16,
                          },
                        }}
                      >
                        {item.name}
                      </Typography>

                      {/* Delete */}
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              id: item.id,
                              size: item.size,
                              color: item.color,
                            }),
                          )
                        }
                        sx={{
                          color: "error.main",
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    {/* Color */}
                    {item.color && (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                          Color:
                        </Typography>

                        <Box
                          sx={{
                            width: 18,
                            height: 18,
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

                    {/* Size */}
                    {item.size && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        Size: {item.size}
                      </Typography>
                    )}

                    {/* Price */}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: {
                          xs: 16,
                          sm: 18,
                        },
                        mt: "auto",
                        mb: 1.5,
                      }}
                    >
                      ${item.price}
                    </Typography>

                    {/* Quantity controls */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "secondary.main",
                          borderRadius: 999,
                          px: 0.5,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                size: item.size,
                                color: item.color,
                                quantity: item.quantity - 1,
                              }),
                            )
                          }
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography
                          sx={{
                            minWidth: 28,
                            textAlign: "center",
                            fontWeight: 600,
                          }}
                        >
                          {item.quantity}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                size: item.size,
                                color: item.color,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {index < cartItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Box>

          {/* ================= ORDER SUMMARY ================= */}
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: {
                xs: 2.5,
                md: 3,
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
              Order Summary
            </Typography>

            {/* Subtotal */}
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

            {/* Delivery */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography color="text.secondary">Delivery Fee</Typography>

              <Typography fontWeight={600}>Free</Typography>
            </Box>

            <Divider sx={{ my: 2.5 }} />

            {/* Total */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
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

            {/* Checkout */}
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/checkout")}
              sx={{
                minHeight: 52,
              }}
            >
              Go to Checkout
            </Button>

            {/* Continue shopping */}
            <Button
              variant="text"
              fullWidth
              onClick={() => navigate("/shop")}
              sx={{
                mt: 1,
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

export default Cart;
