import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/products/");

  return response.data.map((product) => ({
    ...product,
    oldPrice: product.old_price,
    dressStyle: product.dress_style,
  }));
};