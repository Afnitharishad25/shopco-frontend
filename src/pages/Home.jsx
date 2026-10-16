import { Box, Button, Container, Typography } from "@mui/material";

import ProductSection from "../components/ProductSection";
import DressStyleSection from "../components/DressStyleSection";
import CustomerReviews from "../components/CustomerReviews";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../redux/productSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.products);

  const newArrivals = products.filter(
    (product) => product.id >= 1 && product.id <= 4,
  );

  const topSelling = products.filter(
    (product) => product.id >= 5 && product.id <= 8,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("Redux products:", products);

  return (
    <>
      {/* HERO */}
      <Box
        sx={{
          backgroundColor: "secondary.main",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },

              minHeight: {
                xs: "auto",
                md: 550,
              },

              px: {
                xs: 2,
                sm: 4,
                md: 6,
              },

              pt: {
                xs: 5,
                md: 7,
              },
            }}
          >
            {/* HERO CONTENT */}
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "52%",
                },

                zIndex: 2,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: 38,
                    sm: 50,
                    md: 64,
                  },

                  mb: 3,
                }}
              >
                FIND CLOTHES
                <br />
                THAT MATCHES
                <br />
                YOUR STYLE
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  maxWidth: 500,
                  fontSize: {
                    xs: 12,
                    md: 14,
                  },
                  mb: 3,
                }}
              >
                Browse through our range of meticulously crafted garments,
                designed to bring out your individuality and cater to your sense
                of style.
              </Typography>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: {
                    xs: "100%",
                    sm: 150,
                  },
                }}
                onClick={() => navigate("/shop")}
              >
                Shop Now
              </Button>

              {/* STATS */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",

                  gap: {
                    xs: 2,
                    sm: 4,
                  },

                  mt: 5,
                  mb: {
                    xs: 4,
                    md: 0,
                  },
                }}
              >
                <HeroStat number="200+" label="International Brands" />

                <HeroStat number="2,000+" label="High-Quality Products" />

                <HeroStat number="30,000+" label="Happy Customers" />
              </Box>
            </Box>

            {/* HERO IMAGE */}
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "48%",
                },

                height: {
                  xs: 350,
                  md: 550,
                },

                position: "relative",

                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Box
                component="img"
                src="/images/hero-models.jpeg"
                alt="Fashion models"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "bottom",
                }}
              />

              <Typography
                sx={{
                  position: "absolute",
                  top: {
                    xs: 20,
                    md: 60,
                  },

                  right: {
                    xs: 5,
                    md: 20,
                  },

                  fontSize: {
                    xs: 35,
                    md: 50,
                  },
                }}
              >
                ✦
              </Typography>

              <Typography
                sx={{
                  position: "absolute",
                  top: {
                    xs: 100,
                    md: 180,
                  },

                  left: {
                    xs: 5,
                    md: 20,
                  },

                  fontSize: {
                    xs: 25,
                    md: 35,
                  },
                }}
              >
                ✦
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography>Loading products...</Typography>
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography color="error">Failed to load products.</Typography>
        </Box>
      ) : (
        <>
          {/* NEW ARRIVALS */}
          <ProductSection title="NEW ARRIVALS" products={newArrivals} />

          {/* TOP SELLING */}
          <ProductSection title="TOP SELLING" products={topSelling} />
        </>
      )}

      {/* DRESS STYLE */}
      <DressStyleSection />

      {/* REVIEWS */}
      <CustomerReviews />
    </>
  );
}

function HeroStat({ number, label }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: {
            xs: 20,
            md: 28,
          },

          fontWeight: 700,
        }}
      >
        {number}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}

export default Home;
