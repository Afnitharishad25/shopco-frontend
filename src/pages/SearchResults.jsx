
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import api from "../services/api";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q")?.trim() || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      if (!query) {
        setProducts([]);
        setLoading(false);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await api.get(
          `/products/?search=${encodeURIComponent(query)}`
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Unable to load products. Please try again.");
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 }, minHeight: "60vh" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 1,
          fontSize: { xs: 26, md: 34 },
        }}
      >
        Search Results
      </Typography>

      {query && (
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Results for "{query}"
        </Typography>
      )}

      {!query ? (
        <Typography color="text.secondary" sx={{ mt: 3 }}>
          Please enter a product name in the header search bar.
        </Typography>
      ) : loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : products.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 3 }}>
          No matching products found. Try another product name.
        </Typography>
      ) : (
        <>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {products.length} product(s) found
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(3, minmax(0, 1fr))",
                md: "repeat(4, minmax(0, 1fr))",
              },
              gap: { xs: 2, md: 3 },
            }}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                elevation={0}
                sx={{ borderRadius: 2 }}
              >
                <CardActionArea
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      height: { xs: 180, sm: 230, md: 280 },
                      objectFit: "cover",
                      bgcolor: "grey.100",
                    }}
                  />

                  <Box sx={{ p: 1.5 }}>
                    <Typography
                      fontWeight={700}
                      sx={{ mb: 1 }}
                    >
                      {product.name}
                    </Typography>

                    <Typography fontWeight={700}>
                      AED {Number(product.price).toFixed(2)}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
}

export default SearchResults;
