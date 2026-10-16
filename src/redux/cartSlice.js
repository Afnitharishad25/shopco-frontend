import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const { product, quantity, size, color } = action.payload;
      
       // Check product + size + color
      const existingItem = state.items.find(
        (item) => item.id === product.id && item.size === size && item.color === color
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
          size,
          color
        });
      }
    },

    removeFromCart: (state, action) => {
      const { id, size, color} = action.payload;

      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size &&  item.color === color),
      );
    },

    updateQuantity: (state, action) => {
      const { id, size, color ,quantity } = action.payload;

      const item = state.items.find(
        (item) => item.id === id && item.size === size &&  item.color === color
      );

      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
