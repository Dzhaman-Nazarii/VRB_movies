import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../types/Movie";
import { ThunkConfig } from "../../../../app/types/ThunkConfig";

export const toggleFavoriteMovie = createAsyncThunk<
	IMovie,
	string,
	ThunkConfig
>("movies/toggleFavoriteMovie", async (movieId, { extra: { api } }) => {
	const response = await api.patch(`/movies/${movieId}/favorite`);
	return response.data;
});
