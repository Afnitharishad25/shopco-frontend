import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { showSnackbar } from "../redux/snackbarSlice";

function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!accessToken) {
  //     dispatch(
  //       showSnackbar({
  //         message: "Please login to view your orders",
  //         severity: "warning",
  //       }),
  //     );

  //     navigate("/login", {
  //       state: { from: "/orders" },
  //     });
  //   }
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await api.get("/orders/");
  //       setOrders(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch orders:", error);

  //       dispatch(
  //         showSnackbar({
  //           message: "Failed to load orders",
  //           severity: "error",
  //         }),
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, [accessToken,dispatch,navigate]);

useEffect(() => {
  const fetchOrders = async () => {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      dispatch(
        showSnackbar({
          message: "Please login to view your orders.",
          severity: "warning",
        })
      );

      navigate("/login", {
        state: { from: "/orders" },
      });

      return;
    }

    try {
      const response = await api.get("/orders/");

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data);

      if (error.response?.status === 401) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login", {
          state: { from: "/orders" },
        });

        return;
      }

      dispatch(
        showSnackbar({
          message: "Unable to load orders.",
          severity: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [dispatch, navigate]);

  if (loading) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography textAlign="center">Loading orders...</Typography>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <Container
          maxWidth="xl"
          sx={{
            minHeight: "60vh",
            py: 10,
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
            No Orders Yet
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4 }}>
            You haven't placed any orders yet.
          </Typography>

          <Button variant="contained" onClick={() => navigate("/shop")}>
            Start Shopping
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
          MY ORDERS
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <Box
                key={order.id}
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
                {/* Order header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: {
                      xs: "flex-start",
                      sm: "center",
                    },
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                    gap: 1,
                    mb: 3,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      Order #{order.id}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {new Date(order.created_at).toLocaleString()}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: 18,
                    }}
                  >
                    ${Number(order.total).toFixed(2)}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Products */}
                {order.items.map((item) => (
                  <Box
                    key={`${item.id}-${item.size}`}
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.product_name}
                      sx={{
                        width: 80,
                        height: 90,
                        objectFit: "cover",
                        borderRadius: 2,
                        backgroundColor: "secondary.main",
                      }}
                    />

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        {item.product_name}
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
                        Quantity: {item.quantity}
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: 700,
                          mt: 0.5,
                        }}
                      >
                        $
                        {(Number(item.price) * Number(item.quantity)).toFixed(
                          2,
                        )}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Divider sx={{ my: 3 }} />

                {/* Delivery address */}
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Delivery Address
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {order.first_name} {order.last_name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {order.address}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {order.city}, {order.postalCode}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {order.country}
                </Typography>
              </Box>
            ))}
        </Box>
      </Container>
    </>
  );
}

export default Orders;
