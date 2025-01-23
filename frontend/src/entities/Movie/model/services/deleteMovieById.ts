import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "../../../../app/types/ThunkConfig";

export const deleteMovieById = createAsyncThunk<string, string, ThunkConfig>(
	"movies/deleteMovieById",
	async (movieId, { extra, rejectWithValue }) => {
		try {
			await extra.api.delete(`/movies/${movieId}`);
			return movieId;
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Error deleting movie";
			return rejectWithValue(message);
		}
	}
);
