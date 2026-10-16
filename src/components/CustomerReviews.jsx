import {
  Box,
  Container,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";

import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Verified,
} from "@mui/icons-material";

import { customerReviews } from "../data/reviews";

function CustomerReviews() {
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
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: {
              xs: 4,
              md: 5,
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: 28,
                md: 38,
              },
            }}
          >
            OUR HAPPY CUSTOMERS
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton
              sx={{
                color: "text.primary",
              }}
            >
              <ArrowBackIosNew fontSize="small" />
            </IconButton>

            <IconButton
              sx={{
                color: "text.primary",
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Reviews */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {customerReviews.slice(0, 3).map((review) => (
            <Box
              key={review.id}
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 3,
                p: {
                  xs: 3,
                  md: 3.5,
                },
                minHeight: {
                  xs: 190,
                  md: 210,
                },
              }}
            >
              {/* Stars */}
              <Rating
                value={review.rating}
                readOnly
                size="small"
                sx={{
                  mb: 1.5,
                }}
              />

              {/* Name */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  {review.name}
                </Typography>

                <Verified
                  sx={{
                    fontSize: 17,
                    color: "green"
                  }}
                />
              </Box>

              {/* Review */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                "{review.review}"
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default CustomerReviews;