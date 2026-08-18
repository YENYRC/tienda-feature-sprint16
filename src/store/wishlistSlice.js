import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWishlist, toggleWishlist as toggleWishlistApi } from '../api/wishlist';

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

export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await toggleWishlistApi(productId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar la wishlist');
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
      .addCase(toggleWishlist.fulfilled, (state, action) => {
       state.productIds = action.payload.data;
      });
  },
});

export default wishlistSlice.reducer;