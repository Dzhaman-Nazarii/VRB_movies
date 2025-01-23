import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllMovies } from "../../../entities/Movie/model/services";
import { useAppDispatch } from "../../../shared/lib/hooks/useAppDispatch";
import {
	selectAllMovies,
	selectMoviesIsLoading,
} from "../../../entities/Movie/model/selectors/moviesSelectors";
import MovieListItem from "../../MovieListPage";
import { Link } from "react-router-dom";
import css from "./MainPage.module.scss";

interface MainPageProps {
	searchQuery: string;
}

export const MainPage: React.FC<MainPageProps> = ({ searchQuery }) => {
	const dispatch = useAppDispatch();
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

	const handleAddToFavorites = () => {
		console.log("handleAddToFavorites");
	};

	const handleEdit = () => {
		console.log("handleEdit");
	};

	return (
		<section className={css.pageWrapper}>
			{filteredMovies.length > 0 ? (
				<div className={css.movieList}>
					{filteredMovies.map((movie) => (
						<Link key={movie._id} to={`/movies/${movie._id}`}>
							<MovieListItem
								movie={movie}
								onAddToFavorites={handleAddToFavorites}
								onEdit={handleEdit}
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
