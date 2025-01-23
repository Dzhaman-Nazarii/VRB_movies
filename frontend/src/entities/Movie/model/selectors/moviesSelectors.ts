import { RootState } from "../../../../app/store/store";

export const selectAllMovies = (state: RootState) => state.movies.data;
export const selectFavoriteMovies = (state: RootState) => state.movies.favorites;
export const selectMoviesIsLoading = (state: RootState) => state.movies.isLoading;
export const selectMoviesError = (state: RootState) => state.movies.error;
