import React from "react";
import { Box, Button, Divider, Slider, Typography } from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";
import { navigateToCategory } from "../../utils/categoryNavigation";

const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];

const colors = [
  { name: "Green", value: "#4CAF32" },
  { name: "Red", value: "#F11A1A" },
  { name: "Yellow", value: "#F5D817" },
  { name: "Orange", value: "#E87817" },
  { name: "Blue", value: "#5CC0E8" },
  { name: "Royal Blue", value: "#3147E8" },
  { name: "Purple", value: "#7626D9" },
  { name: "Pink", value: "#D91A9B" },
  { name: "White", value: "#FFFFFF" },
  { name: "Black", value: "#000000" },
];

const sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

const dressStyles = ["Casual", "Formal", "Party", "Gym"];

function CategoryFilters({
  priceRange,
  setPriceRange,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  // selectedCategories,
  // setSelectedCategories,
  // selectedDressStyles,
  setSelectedDressStyles,
  categoryName,
  applyFilters,
}) {
  const navigate = useNavigate();

  const toggleValue = (value, setter) => {
    setter((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value],
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 20,
          mb: 2,
        }}
      >
        Filters
      </Typography>

      <Divider />

      {/* CATEGORIES */}
      <Box sx={{ py: 2 }}>
        {categories.map((item) => (
          <Box
            key={item}
            component="button"
            type="button"
            onClick={() => navigateToCategory(navigate, item)}
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              py: 0.8,
              px: 0,
              border: 0,
              background: "transparent",
              textAlign: "left",
              cursor: "pointer",
              "&:hover .category-label": {
                color: "text.primary",
                fontWeight: 700,
              },
            }}
          >
            <Typography
              className="category-label"
              sx={{
                fontSize: 13,
                color: "text.secondary",
                transition: "color 0.2s",
              }}
            >
              {item}
            </Typography>

            <ArrowForwardIosIcon
              sx={{
                fontSize: 11,
                color: "text.secondary",
              }}
            />
          </Box>
        ))}
      </Box>

      <Divider />

      {/* PRICE */}
      <Box sx={{ py: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Price</Typography>

          <ExpandLessIcon />
        </Box>

        <Slider
          value={priceRange}
          onChange={(event, newValue) => setPriceRange(newValue)}
          min={50}
          max={300}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2">${priceRange[0]}</Typography>

          <Typography variant="body2">${priceRange[1]}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* COLORS */}
      <Box sx={{ py: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Colors</Typography>

          <ExpandLessIcon />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.2,
          }}
        >
          {colors.map((color) => {
            const selected = selectedColors.includes(color.name);

            return (
              <Box
                key={color.name}
                onClick={() => toggleValue(color.name, setSelectedColors)}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: color.value,
                  border:
                    color.name === "White"
                      ? "1px solid #D0D0D0"
                      : "1px solid rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {selected && (
                  <Typography
                    sx={{
                      color: color.name === "White" ? "black" : "white",
                      fontSize: 15,
                      fontWeight: 700,
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    ✓
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Divider />

      {/* SIZE */}
      <Box sx={{ py: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Size</Typography>

          <ExpandLessIcon />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {sizes.map((size) => {
            const selected = selectedSizes.includes(size);

            return (
              <Button
                key={size}
                onClick={() => toggleValue(size, setSelectedSizes)}
                sx={{
                  borderRadius: 999,
                  backgroundColor: selected ? "black" : "#F2F2F2",
                  color: selected ? "white" : "text.secondary",
                  fontSize: 11,
                  px: 1.5,
                  py: 0.7,
                  minWidth: 0,
                  "&:hover": {
                    backgroundColor: selected ? "black" : "#E8E8E8",
                  },
                }}
              >
                {size}
              </Button>
            );
          })}
        </Box>
      </Box>

      <Divider />

      {/* DRESS STYLE */}
      <Box sx={{ py: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Dress Style</Typography>

          <ExpandLessIcon />
        </Box>

        {dressStyles.map((style) => (
          <Box
            key={style}
            onClick={() => {
              if (style === categoryName) return;

              toggleValue(style, setSelectedDressStyles);
            }}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 0.8,
              cursor: style === categoryName ? "default" : "pointer",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                color:
                  style === categoryName ? "text.primary" : "text.secondary",
                fontWeight: style === categoryName ? 600 : 400,
              }}
            >
              {style}
            </Typography>

            <ArrowForwardIosIcon
              sx={{
                fontSize: 11,
                color: "text.secondary",
              }}
            />
          </Box>
        ))}
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={applyFilters}
        sx={{
          borderRadius: 999,
          mt: 1,
        }}
      >
        Apply Filter
      </Button>
    </Box>
  );
}

export default CategoryFilters;
