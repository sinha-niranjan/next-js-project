import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.product.id === item.product.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push(item);
      }
      state.totalItems += item.quantity;
      state.totalPrice += item.product.price * item.quantity;
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const itemToRemove = state.cartItems.find(
        (cartItem) => cartItem.product.id === itemId
      );
      if (itemToRemove) {
        state.totalItems -= itemToRemove.quantity;
        state.totalPrice -= itemToRemove.product.price * itemToRemove.quantity;
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.product.id !== itemId
        );
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(
        (cartItem) => (cartItem.product.id === action.payload)
      );
      if (item) {
        item.quantity += 1;
        state.totalItems += 1;
        state.totalPrice += item.product.price;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find(
        (cartItem) => (cartItem.product.id === action.payload)
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice -= item.product.price;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
  setLoading,
  setError,
} = cartSlice.actions;
export default cartSlice.reducer;
