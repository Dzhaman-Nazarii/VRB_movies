import { RootState } from "../../../../app/store/store";

export const selectMovieDetails = (state: RootState) => state.movieDetails.movie;
export const selectIsLoading = (state: RootState) => state.movieDetails.isLoading;
export const selectMovieError = (state: RootState) => state.movieDetails.error;
