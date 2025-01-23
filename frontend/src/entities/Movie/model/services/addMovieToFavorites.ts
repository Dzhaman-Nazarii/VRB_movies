import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../types/Movie";
import { ThunkConfig } from "../../../../app/types/ThunkConfig";
import { RootState } from "../../../../app/store/store";

export const addMovieToFavorites = createAsyncThunk<
	IMovie,
	string,
	ThunkConfig
>(
	"movies/addMovieToFavorites",
	async (movieId, { getState, rejectWithValue }) => {
		try {
			const state = getState() as RootState;
			const movie = state.movies.data.find(
				(movie) => movie._id === movieId
			);
			if (!movie) {
				return rejectWithValue("Movie not found");
			}
			return movie;
		} catch (error) {
			return rejectWithValue("Error adding to favorites");
		}
	}
);
