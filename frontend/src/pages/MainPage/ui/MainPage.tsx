import React, { useEffect, useState } from "react";
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
import MovieListItem from "../../MovieListPage";
import { Link, useNavigate } from "react-router-dom";
import css from "./MainPage.module.scss";
import { toggleFavoriteMovie } from "../../../entities/Movie/model/services/toggleFavoriteMovie";

interface MainPageProps {
	searchQuery: string;
}

export const MainPage: React.FC<MainPageProps> = ({ searchQuery }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const allMovies = useSelector(selectAllMovies);
	const isLoading = useSelector(selectMoviesIsLoading);

	const [filteredMovies, setFilteredMovies] = useState(allMovies);

	useEffect(() => {
		dispatch(fetchAllMovies());
	}, [dispatch]);

	useEffect(() => {
		if (searchQuery) {
			const filtered = allMovies.filter((movie) =>
				movie.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredMovies(filtered);
		} else {
			setFilteredMovies(allMovies);
		}
	}, [searchQuery, allMovies]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const handleDelete = async (movieId: string) => {
		try {
			await dispatch(deleteMovieById(movieId));
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

	const handleEdit = (movieId: string) => {
		navigate(`/edit/${movieId}`);
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
								onEdit={() => handleEdit(movie._id)}
								onDelete={handleDelete}
								onFavorite={handleFavoriteToggle}
							/>
						</Link>
					))}
				</div>
			) : (
				<p>No movies found.</p>
			)}
		</section>
	);
};
