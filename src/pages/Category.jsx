import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Link as MuiLink,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import TuneIcon from "@mui/icons-material/Tune";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useNavigate, useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import CategoryFilters from "../components/category/CategoryFilters";
import CategoryFilterDrawer from "../components/category/CategoryFilterDrawer";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

function Category() {
  const navigate = useNavigate();
  const { category } = useParams();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // CATEGORY NAME
  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Casual";

  // PRODUCT CATEGORY MAPPING
  // Update these values if your database uses different names.
  const productCategoryMap = {
    "t-shirts": "T-shirts",
    shirts: "Shirts",
    jeans: "Jeans",
    shorts: "Shorts",
    hoodie: "Hoodie",
    hoodies: "Hoodie",
  };

  const productCategoryValue = productCategoryMap[categoryName.toLowerCase()];

  const isProductCategory = Boolean(productCategoryValue);

  const defaultDressStyles = isProductCategory ? [] : [categoryName];

  // MOBILE FILTER DRAWER
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // FILTER STATES
  const [priceRange, setPriceRange] = useState([50, 300]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDressStyles, setSelectedDressStyles] =
    useState(defaultDressStyles);

  // APPLIED FILTERS
  const [appliedFilters, setAppliedFilters] = useState({
    priceRange: [50, 300],
    colors: [],
    sizes: [],
    categories: [],
    dressStyles: defaultDressStyles,
  });

  // SORT
  const [sortBy, setSortBy] = useState("popular");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // PRODUCTS FOR CURRENT CATEGORY OR DRESS STYLE
  const categoryProducts = useMemo(() => {
    return products.filter((product) => {
      if (isProductCategory) {
        return (
          product.category?.toLowerCase() === productCategoryValue.toLowerCase()
        );
      }

      return product.dressStyle?.toLowerCase() === categoryName.toLowerCase();
    });
  }, [products, categoryName, isProductCategory, productCategoryValue]);

  // RESET FILTERS WHEN CATEGORY CHANGES
  useEffect(() => {
    setPriceRange([50, 300]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedCategories([]);
    setSelectedDressStyles(defaultDressStyles);

    setAppliedFilters({
      priceRange: [50, 300],
      colors: [],
      sizes: [],
      categories: [],
      dressStyles: defaultDressStyles,
    });

    setCurrentPage(1);
  }, [categoryName]);

  // RESET PAGE WHEN FILTER OR SORT CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedFilters, sortBy]);

  // APPLY FILTERS
  const applyFilters = () => {
    setAppliedFilters({
      priceRange: [...priceRange],
      colors: [...selectedColors],
      sizes: [...selectedSizes],
      categories: [...selectedCategories],
      dressStyles: [...selectedDressStyles],
    });

    setCurrentPage(1);
    setMobileFilterOpen(false);
  };

  // FILTER AND SORT PRODUCTS
  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    const { priceRange, colors, sizes, categories, dressStyles } =
      appliedFilters;

    // PRICE FILTER
    result = result.filter((product) => {
      const price = Number(product.price);

      return price >= priceRange[0] && price <= priceRange[1];
    });

    // COLOR FILTER
    if (colors.length > 0) {
      result = result.filter((product) =>
        product.colors?.some((color) =>
          colors.some(
            (selectedColor) =>
              selectedColor.toLowerCase() === color.toLowerCase(),
          ),
        ),
      );
    }

    // SIZE FILTER
    if (sizes.length > 0) {
      result = result.filter((product) =>
        product.sizes?.some((size) => sizes.includes(size)),
      );
    }

    // ADDITIONAL PRODUCT CATEGORY FILTER
    if (categories.length > 0) {
      result = result.filter((product) =>
        categories.some((selectedCategory) => {
          const normalizeCategory = (value) =>
            value?.toLowerCase().replace(/s$/, "");

          return (
            normalizeCategory(selectedCategory) ===
            normalizeCategory(product.category)
          );
        }),
      );
    }

    // ADDITIONAL DRESS STYLE FILTER
    if (dressStyles.length > 0) {
      result = result.filter((product) =>
        dressStyles.some(
          (style) => style.toLowerCase() === product.dressStyle?.toLowerCase(),
        ),
      );
    }

    // SORTING
    if (sortBy === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortBy === "rating") {
      result.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    return result;
  }, [categoryProducts, appliedFilters, sortBy]);

  // PAGINATION
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // PRODUCT COUNT
  const showingFrom = filteredProducts.length === 0 ? 0 : startIndex + 1;

  const showingTo = Math.min(
    startIndex + productsPerPage,
    filteredProducts.length,
  );

  // LOADING
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography>Loading products...</Typography>
      </Box>
    );
  }

  // ERROR
  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography color="error">Failed to load products.</Typography>
      </Box>
    );
  }

  // CLEAR FILTERS
  const clearFilters = () => {
    setPriceRange([50, 300]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedCategories([]);
    setSelectedDressStyles(defaultDressStyles);

    setAppliedFilters({
      priceRange: [50, 300],
      colors: [],
      sizes: [],
      categories: [],
      dressStyles: defaultDressStyles,
    });

    setCurrentPage(1);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        {/* BREADCRUMBS */}
        <Breadcrumbs sx={{ mb: { xs: 3, md: 4 } }}>
          <MuiLink
            component="button"
            underline="hover"
            color="text.secondary"
            onClick={() => navigate("/")}
            sx={{
              border: 0,
              background: "none",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Home
          </MuiLink>

          <Typography
            color="text.primary"
            sx={{ fontSize: 14, fontWeight: 500 }}
          >
            {categoryName}
          </Typography>
        </Breadcrumbs>

        {/* MOBILE FILTER AND SORT */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            gap: 1,
            mb: 3,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            startIcon={<TuneIcon />}
            onClick={() => setMobileFilterOpen(true)}
            sx={{
              borderColor: "divider",
              color: "text.primary",
            }}
          >
            Filters
          </Button>

          <FormControl fullWidth size="small">
            <Select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <MenuItem value="popular">Most Popular</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="rating">Highest Rated</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* MAIN LAYOUT */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "280px minmax(0, 1fr)",
            },
            gap: { xs: 2, md: 4 },
            alignItems: "start",
          }}
        >
          {/* DESKTOP FILTER SIDEBAR */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: "100%",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            <CategoryFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedDressStyles={selectedDressStyles}
              setSelectedDressStyles={setSelectedDressStyles}
              categoryName={categoryName}
              applyFilters={applyFilters}
            />
          </Box>

          {/* PRODUCT SECTION */}
          <Box sx={{ minWidth: 0 }}>
            {/* TITLE, COUNT AND SORT */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                gap: 2,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: 28, md: 40 },
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {categoryName}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  Showing {showingFrom}-{showingTo} of {filteredProducts.length}{" "}
                  Products
                </Typography>

                <FormControl
                  size="small"
                  sx={{
                    minWidth: 170,
                    display: { xs: "none", md: "block" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      flexShrink: 0,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Sort by:
                    </Typography>

                    <Select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      variant="standard"
                      disableUnderline
                    >
                      <MenuItem value="popular">Most Popular</MenuItem>
                      <MenuItem value="price-low">Price: Low to High</MenuItem>
                      <MenuItem value="price-high">Price: High to Low</MenuItem>
                      <MenuItem value="rating">Highest Rated</MenuItem>
                    </Select>
                  </Box>
                </FormControl>
              </Box>
            </Box>

            {/* PRODUCTS */}
            {paginatedProducts.length > 0 ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, minmax(0, 1fr))",
                    sm: "repeat(2, minmax(0, 1fr))",
                    lg: "repeat(3, minmax(0, 1fr))",
                  },
                  gap: { xs: 2, sm: 3 },
                }}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  py: 10,
                  textAlign: "center",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No products found
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Try changing your filters.
                </Typography>

                <Button variant="contained" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </Box>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <Box
                sx={{
                  mt: 5,
                  pt: 3,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  sx={{
                    borderColor: "divider",
                    color: "text.primary",
                    minWidth: { xs: 40, sm: 100 },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: {
                        xs: "none",
                        sm: "inline",
                      },
                    }}
                  >
                    Previous
                  </Box>
                </Button>

                <Stack direction="row" spacing={0.5} alignItems="center">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <Button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      variant={currentPage === page ? "contained" : "text"}
                      sx={{
                        minWidth: 38,
                        height: 38,
                        borderRadius: 1.5,
                        color: currentPage === page ? "white" : "text.primary",
                      }}
                    >
                      {page}
                    </Button>
                  ))}
                </Stack>

                <Button
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  sx={{
                    borderColor: "divider",
                    color: "text.primary",
                    minWidth: { xs: 40, sm: 100 },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: {
                        xs: "none",
                        sm: "inline",
                      },
                    }}
                  >
                    Next
                  </Box>
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* MOBILE FILTER DRAWER */}
      <CategoryFilterDrawer
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedDressStyles={selectedDressStyles}
        setSelectedDressStyles={setSelectedDressStyles}
        categoryName={categoryName}
        applyFilters={applyFilters}
      />
    </>
  );
}

export default Category;
