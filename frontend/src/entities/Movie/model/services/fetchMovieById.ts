import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../types/Movie";
import { ThunkConfig } from "../../../../app/types/ThunkConfig";

export const fetchMovieById = createAsyncThunk<IMovie, string, ThunkConfig>(
	"movies/fetchMovieById",
	async (movieId, { extra, rejectWithValue }) => {
		try {
			const response = await extra.api.get<IMovie>(`/movies/${movieId}`);
			if (!response.data) {
				throw new Error("No data found");
			}
			return response.data;
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "Error fetching movie details";
			return rejectWithValue(message);
		}
	}
);
