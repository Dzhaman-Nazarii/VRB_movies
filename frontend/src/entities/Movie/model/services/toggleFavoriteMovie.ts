import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../types/Movie";
import { ThunkConfig } from "../../../../app/types/ThunkConfig";

export const toggleFavoriteMovie = createAsyncThunk<
	IMovie,
	string,
	ThunkConfig
>("movies/toggleFavoriteMovie", async (movieId, { extra, rejectWithValue }) => {
	try {
		const response = await extra.api.patch(`/movies/${movieId}/favorite`);
		return response.data;
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: "Error toggling favorite movie";
		return rejectWithValue(message);
	}
});
