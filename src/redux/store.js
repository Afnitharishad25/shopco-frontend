import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import snackbarReducer from "./snackbarSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
    products: productReducer,
  },
});

export default store;
