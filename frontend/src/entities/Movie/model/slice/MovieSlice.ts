import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie, IMoviesSchema } from "../types/Movie";
import { fetchAllMovies } from "../services/fetchAllMovies";
import { deleteMovieById} from "../services";
import { toggleFavoriteMovie } from "../services/toggleFavoriteMovie";

const initialState: IMoviesSchema = {
  data: [],
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
      .addCase(fetchAllMovies.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(deleteMovieById.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = state.data.filter(
          (movie) => movie._id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(toggleFavoriteMovie.fulfilled, (state, action: PayloadAction<IMovie>) => {
        const index = state.data.findIndex((movie) => movie._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
  },
});

export const movieReducer = movieSlice.reducer;
