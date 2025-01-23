import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../types/Movie";
import { ThunkConfig } from "../../../../app/types/ThunkConfig";

export const updateMovieById = createAsyncThunk<IMovie, IMovie, ThunkConfig>(
	"movies/updateMovieById",
	async (movie, { extra, rejectWithValue }) => {
		try {
			const response = await extra.api.put<IMovie>(
				`/movies/${movie._id}`,
				movie
			);
			return response.data;
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Error updating movie";
			return rejectWithValue(message);
		}
	}
);
