import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
} from '../api/wishlist';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWishlist();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar la wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      await addWishlistItem(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al añadir a la wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      await removeWishlistItem(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar de la wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    productIds: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.productIds = action.payload.data;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.productIds = state.productIds.filter(
          (item) => item.productId !== action.payload
        );
      });
  },
});

export default wishlistSlice.reducer;