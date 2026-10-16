import { Box, Container, Grid, Typography } from "@mui/material";
import { dressStyles } from "../data/products";
import { useNavigate } from "react-router-dom";

function DressStyleSection() {
  const navigate = useNavigate();
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
        <Box
          sx={{
            backgroundColor: "secondary.main",
            borderRadius: {
              xs: 3,
              md: 4,
            },
            p: {
              xs: 3,
              sm: 4,
              md: 6,
            },
          }}
        >
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
            BROWSE BY DRESS STYLE
          </Typography>

          <Grid container spacing={2}>
            {dressStyles.map((style) => (
              <Grid
                key={style.id}
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <Box
                  onClick={() =>
                    navigate(`/category/${style.name.toLowerCase()}`)
                  }
                  sx={{
                    position: "relative",
                    height: {
                      xs: 190,
                      sm: 220,
                      md: 250,
                    },
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundColor: "background.default",
                    cursor: "pointer",

                    "&:hover img": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={style.image}
                    alt={style.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.3s ease",
                    }}
                  />

                  <Typography
                    sx={{
                      position: "absolute",
                      top: {
                        xs: 20,
                        md: 25,
                      },
                      left: {
                        xs: 20,
                        md: 25,
                      },
                      fontSize: {
                        xs: 22,
                        md: 28,
                      },
                      fontWeight: 700,
                      color: "text.primary",
                    }}
                  >
                    {style.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default DressStyleSection;
