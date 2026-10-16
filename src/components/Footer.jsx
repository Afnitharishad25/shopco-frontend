import { Box, Container, Grid, Typography } from "@mui/material";

const footerSections = [
  {
    title: "COMPANY",
    links: ["About", "Features", "Works", "Career"],
  },
  {
    title: "HELP",
    links: [
      "Customer Support",
      "Delivery Details",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  {
    title: "FAQ",
    links: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  {
    title: "RESOURCES",
    links: [
      "Free eBooks",
      "Development Tutorial",
      "How-to-Blog",
      "Youtube Playlist",
    ],
  },
];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "secondary.main",
        pt: {
          xs: 12,
          md: 14,
        },
        pb: {
          xs: 5,
          md: 7,
        },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* BRAND */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              sx={{
                fontSize: 26,
                fontWeight: 900,
                mb: 2,
              }}
            >
              SHOP.CO
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                maxWidth: 250,
              }}
            >
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </Typography>
          </Grid>

          {/* FOOTER LINKS */}
          {footerSections.map((section) => (
            <Grid
              key={section.title}
              size={{
                xs: 6,
                sm: 3,
                md: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                {section.title}
              </Typography>

              {section.links.map((link) => (
                <Typography
                  key={link}
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 1.5,
                    cursor: "pointer",

                    "&:hover": {
                      color: "text.primary",
                    },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
