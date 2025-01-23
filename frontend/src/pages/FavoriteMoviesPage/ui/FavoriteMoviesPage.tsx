import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	deleteMovieById,
	fetchAllMovies,
} from "../../../entities/Movie/model/services";
import { useAppDispatch } from "../../../shared/lib/hooks/useAppDispatch";
import {
	selectAllMovies,
	selectMoviesIsLoading,
} from "../../../entities/Movie/model/selectors/moviesSelectors";
import css from "./FavoriteMoviesPage.module.scss";
import MovieListItem from "../../MovieListPage";
import { Link } from "react-router-dom";
import { toggleFavoriteMovie } from "../../../entities/Movie/model/services/toggleFavoriteMovie";

interface FavoriteMoviesPageProps {
	searchQuery: string;
}

export const FavoriteMoviesPage: FC<FavoriteMoviesPageProps> = ({
	searchQuery,
}) => {
	const dispatch = useAppDispatch();
	const allMovies = useSelector(selectAllMovies);
	const isLoading = useSelector(selectMoviesIsLoading);

	const [filteredMovies, setFilteredMovies] = useState(allMovies);

	useEffect(() => {
		dispatch(fetchAllMovies());
	}, [dispatch]);

	useEffect(() => {
		const favoriteMovies = allMovies.filter((movie) => movie.isFavorite);
		if (searchQuery) {
			const filtered = favoriteMovies.filter((movie) =>
				movie.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredMovies(filtered);
		} else {
			setFilteredMovies(favoriteMovies);
		}
	}, [searchQuery, allMovies]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const handleDelete = async (movieId: string) => {
		try {
			await dispatch(deleteMovieById(movieId));
			console.log("Movie deleted successfully");
		} catch (error) {
			console.error("Error during delete:", error);
		}
	};

	const handleFavoriteToggle = async (movieId: string) => {
		try {
			await dispatch(toggleFavoriteMovie(movieId));
		} catch (error) {
			console.error("Error during toggle favorite:", error);
		}
	};

	return (
		<section className={css.pageWrapper}>
			{filteredMovies.length > 0 ? (
				<div className={css.movieList}>
					{filteredMovies.map((movie) => (
						<Link
							key={movie._id}
							to={`/movies/${movie._id}`}>
							<MovieListItem
								movie={movie}
								onEdit={() => console.log("onEdit")}
								onDelete={handleDelete}
								onFavorite={handleFavoriteToggle}
							/>
						</Link>
					))}
				</div>
			) : (
				<p>No favorite movies found.</p>
			)}
		</section>
	);
};
