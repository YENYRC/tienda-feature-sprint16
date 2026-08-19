import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCart,
  addCartItem as addCartItemApi,
  removeCartItem as removeCartItemApi,
  checkoutCart as checkoutCartApi,
} from '../api/cart';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar el carrito');
    }
  }
);

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async (data, { rejectWithValue }) => {
    try {
      const response = await addCartItemApi(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al añadir el producto');
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (itemId, { rejectWithValue }) => {
    try {
      await removeCartItemApi(itemId);
      return itemId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar el producto');
    }
  }
);

export const checkout = createAsyncThunk(
  'cart/checkout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkoutCartApi();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al finalizar la compra');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
       state.items = action.payload.data;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.productId !== action.payload);
      })
      .addCase(checkout.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;