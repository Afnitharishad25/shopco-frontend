
export const productCategories = [
  "T-shirts",
  "Shirts",
  "Jeans",
  "Shorts",
  "Hoodies",
];

export const navigateToCategory = (navigate, category) => {
  const categoryName =
    category.toLowerCase() === "hoodie" ? "Hoodies" : category;

  navigate(`/category/${encodeURIComponent(categoryName)}`);
};
