import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovieById } from "../services/fetchMovieById";
import { IMovie } from "../types/Movie";

interface MovieDetailsState {
	movie: IMovie | null;
	isLoading: boolean;
	error: string | null;
}

const initialState: MovieDetailsState = {
	movie: null,
	isLoading: false,
	error: null,
};

export const movieDetailsSlice = createSlice({
	name: "movieDetails",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovieById.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(
				fetchMovieById.fulfilled,
				(state, action: PayloadAction<IMovie>) => {
					state.isLoading = false;
					state.movie = action.payload;
				}
			)
			.addCase(fetchMovieById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const movieDetailsReducer = movieDetailsSlice.reducer;
