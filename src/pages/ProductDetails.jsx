import { useState, useMemo, useEffect } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Rating,
  Stack,
  Tab,
  Tabs,
  TextField,
  Link,
  Typography,
} from "@mui/material";

import {
  Add,
  Remove,
  Verified,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

import { showSnackbar } from "../redux/snackbarSlice";
import { Link as RouterLink } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/productSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux products
  const { products, loading, error } = useSelector((state) => state.products);

  // Find current product
  const product = products.find((item) => item.id === Number(id));

  // Local states
  const [tabValue, setTabValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  // Review states
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Product sizes
  const sizes = product?.sizes || ["Small", "Medium", "Large", "X-Large"];

  // Fetch products if Redux is empty
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Reset product-specific selections when product changes
  useEffect(() => {
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);
    setAddedToCart(false);
    setTabValue(0);
  }, [id]);

  // Recommended products
  const recommendedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((item) => item.id !== Number(id))
      .filter(
        (item) =>
          item.category === product.category ||
          item.dressStyle === product.dressStyle,
      )
      .slice(0, 4);
  }, [id, product, products]);

  // review data
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "August 14, 2026",
      review:
        "The quality is amazing and the fit is exactly what I expected. Really happy with this purchase!",
    },
    {
      id: 2,
      name: "Alex K.",
      rating: 4,
      date: "August 10, 2026",
      review:
        "Great quality and comfortable material. The design looks even better in person.",
    },
    {
      id: 3,
      name: "James L.",
      rating: 5,
      date: "August 5, 2026",
      review:
        "Really impressed with the quality. Definitely planning to buy more from this collection.",
    },
  ];

  const faqs = [
    {
      question: "What sizes are available?",
      answer:
        "This product is available in Small, Medium, Large and X-Large sizes.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Standard delivery usually takes 3–5 business days depending on your location.",
    },
    {
      question: "Can I return this product?",
      answer:
        "Yes. You can return eligible products according to our return policy.",
    },
    {
      question: "Is this product machine washable?",
      answer:
        "Yes. Please follow the care instructions provided with the product.",
    },
  ];

  // Review submit
  const handleSubmitReview = () => {
    if (!reviewRating) {
      dispatch(
        showSnackbar({
          message: "Please select a rating",
          severity: "warning",
        }),
      );
      return;
    }

    if (!reviewText.trim()) {
      dispatch(
        showSnackbar({
          message: "Please write your review",
          severity: "warning",
        }),
      );
      return;
    }

    dispatch(
      showSnackbar({
        message: "Review submitted successfully",
        severity: "success",
      }),
    );

    setReviewRating(0);
    setReviewText("");
    setReviewOpen(false);
  };

  // Loading
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Loading product...</Typography>
        </Box>
      </Container>
    );
  }

  // Product not found
  if (error || !product) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            Product not found
          </Typography>

          <Button variant="contained" onClick={() => navigate("/shop")}>
            Back to Shop
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 3,
            md: 6,
          },
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
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            Home
          </Link>{" "}
          /{" "}
          <Link
            component={RouterLink}
            to="/shop"
            underline="hover"
            color="inherit"
          >
            shop
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
            {product.name}{" "}
          </Typography>
        </Typography>

        {/* Product Details */}
        <Grid
          container
          spacing={{
            xs: 4,
            md: 6,
          }}
        >
          {/* Product Image */}
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Box
              sx={{
                backgroundColor: "secondary.main",
                borderRadius: 3,
                overflow: "hidden",
                width: "100%",
                aspectRatio: "1 / 1",
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Box>
          </Grid>

          {/* Product Information */}
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: {
                  xs: 28,
                  md: 40,
                },
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              {product.name}
            </Typography>

            {/* Rating */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <Rating value={product.rating} precision={0.5} readOnly />

              <Typography color="text.secondary">{product.rating}/5</Typography>
            </Box>

            {/* Price */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 26,
                    md: 35,
                  },
                  fontWeight: 700,
                }}
              >
                ${product.price}
              </Typography>

              {product.oldPrice && (
                <Typography
                  sx={{
                    fontSize: {
                      xs: 26,
                      md: 35,
                    },
                    color: "text.secondary",
                    textDecoration: "line-through",
                  }}
                >
                  ${product.oldPrice}
                </Typography>
              )}

              {product.discount && (
                <Box
                  sx={{
                    backgroundColor: "#FFE5E5",
                    color: "#FF3333",
                    borderRadius: 999,
                    px: 2,
                    py: 0.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    -{product.discount}%
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Description */}
            <Typography
              color="text.secondary"
              sx={{
                mb: 3,
                lineHeight: 1.7,
              }}
            >
              {product.description}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Colors */}
            {product.colors?.length > 0 && (
              <>
                <Typography fontWeight={600} sx={{ mb: 1.5 }}>
                  Select Colors
                </Typography>

                <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
                  {product.colors.map((color) => {
                    const colorMap = {
                      Black: "#000000",
                      White: "#FFFFFF",
                      Red: "#FF0000",
                      Blue: "#0000FF",
                      Green: "#008000",
                      Purple: "#800080",
                      Yellow: "#FFD700",
                      Brown: "#8B4513",
                      Gray: "#808080",
                      Grey: "#808080",
                    };

                    const backgroundColor = colorMap[color] || color;

                    return (
                      <Box
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          backgroundColor,
                          cursor: "pointer",

                          border:
                            color === "White"
                              ? "1px solid #D0D0D0"
                              : "1px solid transparent",

                          outline:
                            selectedColor === color
                              ? "2px solid #000000"
                              : "none",

                          outlineOffset: 3,

                          transition: "0.2s",

                          "&:hover": {
                            transform: "scale(1.08)",
                          },
                        }}
                        title={color}
                      />
                    );
                  })}
                </Stack>
              </>
            )}

            <Divider sx={{ mb: 3 }} />

            {/* Sizes */}
            <Typography
              sx={{
                fontWeight: 600,
                mb: 1.5,
              }}
            >
              Choose Size
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mb: 3,
              }}
            >
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "contained" : "outlined"}
                  onClick={() => setSelectedSize(size)}
                  sx={{
                    minWidth: 90,
                  }}
                >
                  {size}
                </Button>
              ))}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Quantity + Cart */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "secondary.main",
                  borderRadius: 999,
                  px: 1,
                }}
              >
                <Button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  sx={{
                    minWidth: 36,
                  }}
                >
                  <Remove fontSize="small" />
                </Button>

                <Typography
                  sx={{
                    minWidth: 30,
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  {quantity}
                </Typography>

                <Button
                  onClick={() => setQuantity(quantity + 1)}
                  sx={{
                    minWidth: 36,
                  }}
                >
                  <Add fontSize="small" />
                </Button>
              </Box>

              <Button
                variant="contained"
                startIcon={<ShoppingCartOutlined />}
                onClick={() => {
                  if (addedToCart) {
                    navigate("/cart");
                    return;
                  }
                  // 1. Check color
                  if (!selectedColor) {
                    dispatch(
                      showSnackbar({
                        message: "Please select a color",
                        severity: "warning",
                      }),
                    );
                    return;
                  }

                  // 2. Check size
                  if (!selectedSize) {
                    dispatch(
                      showSnackbar({
                        message: "Please select a size",
                        severity: "warning",
                      }),
                    );
                    return;
                  }
                  // Add product to cart
                  dispatch(
                    addToCart({
                      product,
                      quantity,
                      color: selectedColor,
                      size: selectedSize,
                    }),
                  );
                  dispatch(
                    showSnackbar({
                      message: `${product.name} added to cart`,
                      severity: "success",
                    }),
                  );
                  setAddedToCart(true);
                }}
                sx={{
                  flex: 1,
                  minHeight: 48,
                }}
              >
                {addedToCart ? "Go to Cart" : "Add to Cart"}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* TABS */}
        <Box sx={{ mt: { xs: 7, md: 10 } }}>
          <Tabs
            value={tabValue}
            onChange={(event, newValue) => setTabValue(newValue)}
            variant="fullWidth"
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Tab label="Product Details" />
            <Tab label={`Rating & Reviews`} />
            <Tab label="FAQs" />
          </Tabs>

          {/* PRODUCT DETAILS TAB */}
          {tabValue === 0 && (
            <Box sx={{ py: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                Product Details
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ lineHeight: 1.9, maxWidth: 900 }}
              >
                This stylish piece is designed with comfort, quality and
                everyday versatility in mind. The carefully selected fabric
                provides a comfortable feel while maintaining a modern
                appearance.
              </Typography>

              <Stack spacing={1.5} sx={{ mt: 3, maxWidth: 600 }}>
                <Typography>
                  <strong>Material:</strong> Premium cotton blend
                </Typography>

                <Typography>
                  <strong>Fit:</strong> Regular fit
                </Typography>

                <Typography>
                  <strong>Care:</strong> Machine washable
                </Typography>

                <Typography>
                  <strong>Available Sizes:</strong> S, M, L, XL
                </Typography>
              </Stack>
            </Box>
          )}

          {/* REVIEWS TAB */}
          {tabValue === 1 && (
            <Box sx={{ py: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", md: "center" },
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                  mb: 4,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  All Reviews ({reviews.length})
                </Typography>

                <Button variant="contained" onClick={() => setReviewOpen(true)}>
                  Write a Review
                </Button>
              </Box>

              {/* write a review form */}
              {reviewOpen && (
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    p: { xs: 2, md: 3 },
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Write a Review
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Your Rating
                  </Typography>

                  <Rating
                    value={reviewRating}
                    onChange={(event, newValue) => {
                      setReviewRating(newValue);
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    label="Your Review"
                    placeholder="Share your experience with this product..."
                    value={reviewText}
                    onChange={(event) => setReviewText(event.target.value)}
                    sx={{ mb: 2 }}
                  />

                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleSubmitReview}>
                      Submit Review
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={() => {
                        setReviewOpen(false);
                        setReviewRating(0);
                        setReviewText("");
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              )}

              {/* <Stack spacing={2}> */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                  gap: 3,
                }}
              >
                {reviews.map((review) => (
                  <Box
                    key={review.id}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 3,
                      p: { xs: 2, md: 3 },
                    }}
                  >
                    <Stack justifyContent="space-between" sx={{ mb: 2 }}>
                      <Rating
                        value={review.rating}
                        readOnly
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          mb: 1,
                        }}
                      >
                        <Typography sx={{ fontWeight: 700 }}>
                          {review.name}
                        </Typography>
                        <Verified
                          sx={{
                            fontSize: 17,
                            color: "green",
                          }}
                        />
                      </Box>

                      <Typography color="text.secondary">
                        {review.review}
                      </Typography>
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                      Posted on {review.date}
                    </Typography>
                  </Box>
                ))}
                {/* </Stack> */}
              </Box>
            </Box>
          )}

          {/* FAQ TAB */}
          {tabValue === 2 && (
            <Box sx={{ py: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
                Frequently Asked Questions
              </Typography>

              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  disableGutters
                  elevation={0}
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography color="text.secondary">{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </Box>

        {/* YOU MIGHT ALSO LIKE */}
        <Box sx={{ mt: { xs: 6, md: 10 } }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: 28, md: 40 },
              mb: 5,
            }}
          >
            YOU MIGHT ALSO LIKE
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: { xs: 2, md: 3 },
            }}
          >
            {recommendedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ProductDetails;
