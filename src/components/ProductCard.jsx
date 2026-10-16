import {
  Box,
  Card,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
   const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/product/${product.id}`)}
      sx={{
        width: "100%",
        backgroundColor: "background.default",
        cursor: "pointer",
      }}
    >
      {/* PRODUCT IMAGE */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1 / 1",
          backgroundColor: "secondary.main",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.3s ease",

            "&:hover": {
              transform: "scale(1.04)",
            },
          }}
        />
      </Box>

      {/* PRODUCT DETAILS */}
      <CardContent
        sx={{
          px: 0,
          pt: 2,
          pb: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 14,
              md: 16,
            },
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {product.name}
        </Typography>

        {/* RATING */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 0.5,
          }}
        >
          <Rating
            value={product.rating}
            precision={0.5}
            readOnly
            size="small"
          />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {product.rating}/5
          </Typography>
        </Box>

        {/* PRICE */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 18,
                md: 20,
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
                  xs: 18,
                  md: 20,
                },
                fontWeight: 600,
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
                px: 1.2,
                py: 0.4,
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                -{product.discount}%
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;