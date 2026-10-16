import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { EmailOutlined } from "@mui/icons-material";

function Newsletter() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        position: "relative",
        zIndex: 1,
        mb: -8,
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          borderRadius: 3,
          px: {
            xs: 3,
            sm: 5,
            md: 6,
          },
          py: {
            xs: 4,
            md: 5,
          },
          display: {
            xs: "block",
            md: "flex",
          },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        {/* Heading */}
        <Typography
          sx={{
            fontSize: {
              xs: 24,
              sm: 28,
              md: 32,
            },
            fontWeight: 900,
            lineHeight: 1.1,
            maxWidth: 420,
            mb: {
              xs: 3,
              md: 0,
            },
          }}
        >
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </Typography>

        {/* Form */}
        <Box
          sx={{
            width: {
              xs: "100%",
              md: 360,
            },
          }}
        >
          <TextField
            fullWidth
            placeholder="Enter your email address"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined
                    sx={{
                      color: "text.secondary",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 1.5,
              backgroundColor: "background.default",
              borderRadius: 999,

              "& .MuiOutlinedInput-root": {
                borderRadius: 999,
              },

              "& fieldset": {
                border: "none",
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "background.default",
              color: "text.primary",

              "&:hover": {
                backgroundColor: "background.default",
                opacity: 0.9,
              },
            }}
          >
            Subscribe to Newsletter
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Newsletter;