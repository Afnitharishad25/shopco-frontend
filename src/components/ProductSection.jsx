import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import ProductCard from "./ProductCard";

function ProductSection({
  title,
  products,
  showButton = true,
}) {
  return (
    <Box
      sx={{
        py: {
          xs: 6,
          md: 8,
        },
      }}
    >
      <Container maxWidth="xl">

        {/* TITLE */}
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontSize: {
              xs: 28,
              md: 38,
            },
            mb: {
              xs: 4,
              md: 5,
            },
          }}
        >
          {title}
        </Typography>

        {/* PRODUCTS */}
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
                md: 3,
              }}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {/* VIEW ALL */}
        {showButton && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{
                minWidth: 180,
              }}
            >
              View All
            </Button>
          </Box>
        )}

      </Container>
    </Box>
  );
}

export default ProductSection;