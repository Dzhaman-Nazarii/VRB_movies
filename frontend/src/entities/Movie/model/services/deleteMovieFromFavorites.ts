import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "../../../../app/types/ThunkConfig";

export const removeMovieFromFavorites = createAsyncThunk<string, string, ThunkConfig>(
  "movies/removeMovieFromFavorites",
  async (movieId, { rejectWithValue }) => {
    try {
      return movieId;
    } catch (error) {
      return rejectWithValue("Error removing from favorites");
    }
  }
);