import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../types/Movie";
import { ThunkConfig } from "../../../../app/types/ThunkConfig";

export const createNewMovie = createAsyncThunk<IMovie, IMovie, ThunkConfig>(
	"movies/createNewMovie",
	async (movie, { extra, rejectWithValue }) => {
		try {
			const response = await extra.api.post<IMovie>("/movies", movie);
			return response.data;
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Error adding movie";
			return rejectWithValue(message);
		}
	}
);
