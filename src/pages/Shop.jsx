import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Select,
  Link,
  Typography,
} from "@mui/material";

import { Tune } from "@mui/icons-material";
import ProductCard from "../components/ProductCard";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import {productCategories,navigateToCategory} from "../utils/categoryNavigation";

function Shop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography>Loading products...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography color="error">Failed to load products.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 3,
            md: 5,
          },
        }}
      >
        {/* Breadcrumb */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
          }}
        >
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
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
            Shop
          </Typography>
        </Typography>

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: {
              xs: "flex-start",
              md: "center",
            },
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: {
                  xs: 28,
                  md: 36,
                },
              }}
            >
              SHOP
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              Showing {products.length} products
            </Typography>
          </Box>

          {/* Sort */}
          <Select
            defaultValue="popular"
            size="small"
            sx={{
              minWidth: 180,
              borderRadius: 999,
            }}
          >
            <MenuItem value="popular">Most Popular</MenuItem>

            <MenuItem value="newest">Newest</MenuItem>

            <MenuItem value="price-low">Price: Low to High</MenuItem>

            <MenuItem value="price-high">Price: High to Low</MenuItem>
          </Select>
        </Box>

        <Grid container spacing={4}>
          {/* Filters */}
          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Box
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 3,
                p: 3,
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Filters
                </Typography>

                <Tune fontSize="small" />
              </Box>

              <Divider sx={{ mb: 2 }} />

              {productCategories.map((category) => (
                  <Typography
                    key={category}
                    component="button"
                    onClick={() =>navigateToCategory(navigate, category)}
                    sx={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      py: 1,
                      px: 0,
                      border: 0,
                      background: "transparent",
                      color: "text.secondary",
                      fontSize: 14,
                      fontFamily: "inherit",
                      cursor: "pointer",
                      "&:hover": {
                        color: "text.primary",
                        fontWeight: 600,
                      },
                    }}
                  >
                    {category}
                  </Typography>
                ),
              )}
            </Box>

            {/* Mobile filter button */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Tune />}
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
                mb: 2,
              }}
            >
              Filters
            </Button>
          </Grid>

          {/* Products */}
          <Grid
            size={{
              xs: 12,
              md: 9,
            }}
          >
            <Grid
              container
              spacing={{
                xs: 2,
                sm: 3,
                md: 4,
              }}
            >
              {products.map((product) => (
                <Grid
                  key={product.id}
                  size={{
                    xs: 6,
                    sm: 6,
                    md: 4,
                  }}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 6,
          }}
        >
          <Button variant="outlined">Previous</Button>

          <Typography
            sx={{
              px: 3,
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
            }}
          >
            1
          </Typography>

          <Button variant="outlined">Next</Button>
        </Box>
      </Container>
    </>
  );
}

export default Shop;
