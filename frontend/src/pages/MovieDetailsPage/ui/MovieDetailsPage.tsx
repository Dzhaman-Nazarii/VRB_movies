import { useEffect, FC } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import css from "./MovieDetailsPage.module.scss";
import { fetchMovieById } from "../../../entities/Movie/model/services/fetchMovieById";
import {
	selectIsLoading,
	selectMovieDetails,
	selectMovieError,
} from "../../../entities/Movie/model/selectors/movieDetailsSelectors";
import { useAppDispatch } from "../../../shared/lib/hooks/useAppDispatch";
import { formatReleaseDate } from "../../../shared/lib/date/formatReleaseDate";

export const MovieDetailsPage: FC = () => {
	const { movieId } = useParams<{ movieId: string }>();
	const dispatch = useAppDispatch();
	const movie = useSelector(selectMovieDetails);
	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectMovieError);

	useEffect(() => {
		if (movieId) {
			console.log(`Fetching details for movie with id: ${movieId}`);
			dispatch(fetchMovieById(movieId));
		}
	}, [movieId, dispatch]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	if (!movie) {
		return <p>Movie not found</p>;
	}

	return (
		<section className={css.pageWrapper}>
			<div className={css.movieDetails}>
				<div className={css.imageContainer}>
					{movie.image && (
						<img
							src={movie.image}
							alt={movie.title}
							className={css.movieImage}
						/>
					)}
				</div>
				<div className={css.descriptionContainer}>
					<h1 className={css.movieTitle}>{movie.title}</h1>
					<p>{movie.description}</p>
						<p>
							<strong className={css.strong}>Director:</strong> {movie.director}
						</p>
						<p>
							<strong className={css.strong}>Actors:</strong> {movie.actors.join(", ")}
						</p>
						<p>
							<strong className={css.strong}>Genre:</strong> {movie.genre}
						</p>
						<p>
							<strong className={css.strong}>Rating:</strong> {movie.rating}
						</p>
						<p>
							<strong className={css.strong}>Release Date:</strong>{" "}
							{formatReleaseDate(movie.releaseDate)}
						</p>
				</div>
			</div>
		</section>
	);
};
