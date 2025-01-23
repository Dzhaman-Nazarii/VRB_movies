import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllMovies } from "../services/fetchAllMovies";
import { fetchAllFavoritesMovies } from "../services/fetchAllFavoriteMovies";
import { IMoviesSchema } from "../types/Movie";

const initialState: IMoviesSchema = {
  data: [],
  favorites: [],
  isLoading: false,
  error: null,
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(fetchAllFavoritesMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllFavoritesMovies.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllFavoritesMovies.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const movieReducer = movieSlice.reducer;
