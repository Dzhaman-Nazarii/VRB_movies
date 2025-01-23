import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../../../pages/MainPage";
import MovieDetailsPage from "../../../pages/MovieDetailsPage";
import FavoriteMoviesPage from "../../../pages/FavoriteMoviesPage";
import NotFoundPage from "../../../pages/NotFoundPage";
import MovieEditPage from "../../../pages/MovieEditPage";
import CreateMoviePage from "../../../pages/CreateMoviePage";

interface AppRouterProps {
	searchQuery: string;
}

export const AppRouter: React.FC<AppRouterProps> = ({ searchQuery }) => {
	return (
		<Routes>
			<Route path="/" element={<MainPage searchQuery={searchQuery} />} />
			<Route
				path="/favorites"
				element={<FavoriteMoviesPage searchQuery={searchQuery} />}
			/>
			<Route path="/add" element={<CreateMoviePage />} />
			<Route path="/movies/:movieId" element={<MovieDetailsPage />} />
			<Route path="/edit/:id" element={<MovieEditPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
