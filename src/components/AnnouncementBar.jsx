import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function AnnouncementBar() {
  return (
    <Box
      sx={{
        height: 38,
        backgroundColor: "primary.main",
        color: "primary.contrastText",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        px: 2,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: {
            xs: 9,
            sm: 11,
            md: 12,
          },
        }}
      >
        Sign up and get 20% off your first order.{" "}
        <Box
          component={Link}
          to="/register"
          sx={{
            color: "inherit",
            fontWeight: 700,
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {" "}
          Sign Up Now{" "}
        </Box>
      </Typography>
    </Box>
  );
}

export default AnnouncementBar;
