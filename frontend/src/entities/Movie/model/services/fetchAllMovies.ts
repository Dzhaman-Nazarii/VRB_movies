import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../types/Movie";
import { ThunkConfig } from "../../../../app/types/ThunkConfig";

export const fetchAllMovies = createAsyncThunk<IMovie[], void, ThunkConfig>(
	"movies/fetchAllMovies",
	async (_, { extra, rejectWithValue }) => {
		try {
			const response = await extra.api.get<IMovie[]>("/movies");
			if (!response.data) {
				throw new Error("No data found");
			}
			return response.data;
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "Error fetching movies";
			return rejectWithValue(message);
		}
	}
);
