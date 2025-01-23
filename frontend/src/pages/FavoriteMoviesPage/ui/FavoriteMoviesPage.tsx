import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllMovies } from "../../../entities/Movie/model/services";
import { useAppDispatch } from "../../../shared/lib/hooks/useAppDispatch";
import {
	selectAllMovies,
	selectMoviesIsLoading,
} from "../../../entities/Movie/model/selectors/moviesSelectors";
import css from "./FavoriteMoviesPage.module.scss";
import MovieListItem from "../../MovieListPage";

interface FavoriteMoviesPageProps {
	searchQuery: string;
}

export const FavoriteMoviesPage: FC<FavoriteMoviesPageProps> = ({ searchQuery }) => {
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

	const handleToggleFavorite = (movieId: string) => {
		console.log("Toggling favorite status for movie:", movieId);
	};

	return (
		<section className={css.pageWrapper}>
			{filteredMovies.length > 0 ? (
				<div className={css.movieList}>
					{filteredMovies.map((movie) => (
						<MovieListItem
							key={movie._id}
							movie={movie}
							onAddToFavorites={handleToggleFavorite}
							onEdit={() => console.log("handleEdit")}
						/>
					))}
				</div>
			) : (
				<p>No favorite movies found.</p>
			)}
		</section>
	);
};
