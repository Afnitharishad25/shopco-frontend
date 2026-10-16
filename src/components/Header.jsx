import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Badge,
  Divider,
  Collapse,
} from "@mui/material";

import {
  Search,
  ShoppingCartOutlined,
  AccountCircle,
  Menu as MenuIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { logout } from "../redux/authSlice";
import { showSnackbar } from "../redux/snackbarSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    user: loggedInUser,
    isLoggedIn,
  } = useSelector((state) => state.auth);

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Shop dropdown
  const [shopAnchorEl, setShopAnchorEl] = useState(null);

  // Mobile Shop dropdown
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

  const productCategories = [
    "T-shirts",
    "Shirts",
    "Jeans",
    "Shorts",
    "Hoodies",
  ];

  const handleShopClick = (event) => {
    setShopAnchorEl(event.currentTarget);
  };

  const handleShopClose = () => {
    setShopAnchorEl(null);
  };

  const handleCategoryNavigate = (name) => {
    handleShopClose();
    setMenuOpen(false);
    setMobileShopOpen(false);

    if (name === "All Products") {
      navigate("/shop");
      return;
    }

    navigate(`/category/${encodeURIComponent(name)}`);
  };

  // GLOBAL SEARCH
  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // ACCOUNT
  const handleAccountClick = (event) => {
    if (isLoggedIn) {
      setAccountAnchorEl(event.currentTarget);
    } else {
      navigate("/login");
    }
  };

  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };

  // LOGOUT
  const handleLogout = () => {
    dispatch(logout());

    dispatch(
      showSnackbar({
        message: "Logged out successfully!",
        severity: "info",
      })
    );

    setAccountAnchorEl(null);
    navigate("/login");
  };

  const shopMenuItems = [
    { label: "All Products", path: "/shop" },
    ...productCategories.map((category) => ({
      label: category,
      path: `/category/${encodeURIComponent(category)}`,
    })),
  ];

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor: "background.default",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: {
              xs: 64,
              md: 76,
            },
            gap: {
              xs: 0.5,
              md: 3,
            },
          }}
        >
          {/* MOBILE MENU BUTTON */}
          <IconButton
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              color: "text.primary",
              p: 0.5,
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* LOGO */}
          <Typography
            component={Link}
            to="/"
            sx={{
              fontSize: {
                xs: 20,
                sm: 24,
                md: 28,
              },
              fontWeight: 900,
              letterSpacing: "-1px",
              whiteSpace: "nowrap",
              textDecoration: "none",
              color: "text.primary",
              cursor: "pointer",
            }}
          >
            SHOP.CO
          </Typography>

          {/* DESKTOP NAVIGATION */}
          <Box
            component="nav"
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
              gap: 3,
              ml: 2,
            }}
          >
            {/* SHOP DROPDOWN */}
            <Typography
              component="button"
              onClick={handleShopClick}
              aria-haspopup="true"
              aria-expanded={Boolean(shopAnchorEl)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.3,
                border: 0,
                background: "none",
                color: "text.primary",
                fontSize: 14,
                cursor: "pointer",
                p: 0,
                fontFamily: "inherit",
                "&:hover": {
                  opacity: 0.6,
                },
              }}
            >
              Shop
              {shopAnchorEl ? (
                <KeyboardArrowUp fontSize="small" />
              ) : (
                <KeyboardArrowDown fontSize="small" />
              )}
            </Typography>

            <Menu
              anchorEl={shopAnchorEl}
              open={Boolean(shopAnchorEl)}
              onClose={handleShopClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1.5,
                    minWidth: 180,
                    borderRadius: 2,
                    boxShadow: 3,
                  },
                },
              }}
            >
              {shopMenuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleCategoryNavigate(item.label)}
                  sx={{
                    py: 1.2,
                    fontSize: 14,
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>

            {/* OTHER NAVIGATION LINKS */}
            {["On Sale", "New Arrivals", "Brands"].map((item) => (
              <Typography
                key={item}
                component="button"
                onClick={() => {
                  // Keep existing behavior for these links.
                }}
                sx={{
                  border: 0,
                  background: "none",
                  color: "text.primary",
                  textDecoration: "none",
                  fontSize: 14,
                  cursor: "pointer",
                  p: 0,
                  fontFamily: "inherit",
                  "&:hover": {
                    opacity: 0.6,
                  },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          {/* DESKTOP GLOBAL SEARCH */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              flex: 1,
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
              backgroundColor: "secondary.main",
              borderRadius: 999,
              px: 2,
              height: 42,
              ml: 2,
            }}
          >
            <IconButton
              type="submit"
              size="small"
              aria-label="Search products"
            >
              <Search
                sx={{
                  color: "text.secondary",
                  fontSize: 20,
                }}
              />
            </IconButton>

            <InputBase
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              inputProps={{
                "aria-label": "Search products",
              }}
              sx={{
                ml: 1,
                flex: 1,
                fontSize: 13,
              }}
            />
          </Box>

          {/* RIGHT-SIDE ICONS */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: "auto",
            }}
          >
            {/* MOBILE SEARCH */}
            <IconButton
              aria-label="Search products"
              onClick={() => navigate("/search")}
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
              }}
            >
              <Search />
            </IconButton>

            {/* CART */}
            <IconButton
              aria-label="Shopping cart"
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>

            {/* ACCOUNT */}
            <IconButton
              aria-label="Account"
              onClick={handleAccountClick}
            >
              <AccountCircle />
            </IconButton>

            {/* USER NAME */}
            {loggedInUser && (
              <Typography
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },
                  ml: 0.5,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "text.primary",
                  maxWidth: 100,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {loggedInUser.first_name}
              </Typography>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* ACCOUNT MENU */}
      <Menu
        anchorEl={accountAnchorEl}
        open={Boolean(accountAnchorEl)}
        onClose={handleAccountClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {loggedInUser && (
          <>
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {loggedInUser.first_name}{" "}
                {loggedInUser.last_name}
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
                  mt: 0.5,
                }}
              >
                {loggedInUser.email}
              </Typography>
            </Box>

            <MenuItem
              onClick={() => {
                setAccountAnchorEl(null);
                navigate("/orders");
              }}
            >
              My Orders
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </>
        )}
      </Menu>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          setMobileShopOpen(false);
        }}
      >
        <Box
          sx={{
            width: 280,
            pt: 2,
          }}
          role="presentation"
        >
          {/* MOBILE LOGO */}
          <Typography
            component={Link}
            to="/"
            onClick={() => setMenuOpen(false)}
            sx={{
              display: "block",
              fontSize: 24,
              fontWeight: 900,
              px: 3,
              mb: 2,
              textDecoration: "none",
              color: "text.primary",
            }}
          >
            SHOP.CO
          </Typography>

          <Divider />

          <List>
            {/* MOBILE SHOP DROPDOWN */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  setMobileShopOpen((previous) => !previous)
                }
              >
                <ListItemText primary="Shop" />

                {mobileShopOpen ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}
              </ListItemButton>
            </ListItem>

            <Collapse
              in={mobileShopOpen}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {shopMenuItems.map((item) => (
                  <ListItem
                    key={item.path}
                    disablePadding
                  >
                    <ListItemButton
                      onClick={() =>
                        handleCategoryNavigate(item.label)
                      }
                      sx={{
                        pl: 4,
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        slotProps={{
                          primary: {
                            sx: {
                              fontSize: 14,
                            },
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* OTHER MOBILE LINKS */}
            {["On Sale", "New Arrivals", "Brands"].map(
              (item) => (
                <ListItem key={item} disablePadding>
                  <ListItemButton
                    onClick={() => setMenuOpen(false)}
                  >
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Header;

