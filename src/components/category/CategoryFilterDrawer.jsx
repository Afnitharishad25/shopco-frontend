import React from "react";
import { Drawer } from "@mui/material";

import CategoryFilters from "./CategoryFilters";

function CategoryFilterDrawer({
  open,
  onClose,
  ...filterProps
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: {
            xs: "100%",
            sm: 340,
          },
        },
      }}
    >
      <CategoryFilters
        {...filterProps}
        applyFilters={() => {
          filterProps.applyFilters();
          onClose();
        }}
      />
    </Drawer>
  );
}

export default CategoryFilterDrawer;