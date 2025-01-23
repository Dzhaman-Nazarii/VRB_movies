import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "../../entities/Movie/model/slice/MovieSlice";
import api from "../api/axios";
import { movieDetailsReducer } from "../../entities/Movie/model/slice/MovieDetailsSlice";

export const store = configureStore({
	reducer: {
		movies: movieReducer,
		movieDetails: movieDetailsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: { api },
			},
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
