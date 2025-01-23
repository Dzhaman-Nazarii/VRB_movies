import { FC } from "react";
import { IMovie } from "../../../entities/Movie/model/types";
import css from "./MovieListItem.module.scss";
import { formatReleaseDate } from "../../../shared/lib/date/formatReleaseDate";

interface MovieListItemProps {
	movie: IMovie;
	onEdit: (movieId: string) => void;
	onDelete: (movieId: string) => void;
	onFavorite: (movieId: string) => void;
}

export const MovieListItem: FC<MovieListItemProps> = ({
	movie,
	onEdit,
	onDelete,
	onFavorite,
}) => {
	return (
		<li className={css.movieItem}>
			<div className={css.header}>
				<h3 className={css.title}>{movie.title}</h3>
				<div className={css.buttons}>
					<button
						className={css.favoriteButton}
						onClick={(e) => {
							e.preventDefault();
							onFavorite(movie._id);
						}}>
						{movie.isFavorite ? "❤️" : "🤍"}
					</button>
					<button
						className={css.editButton}
						onClick={(e) => {
							e.preventDefault();
							onEdit(movie._id);
						}}>
						✏️
					</button>
					<button
						className={css.deleteButton}
						onClick={(e) => {
							e.preventDefault();
							onDelete(movie._id);
						}}>
						🛒
					</button>
				</div>
			</div>
			<p>
				<span className={css.span}>Rating: </span>
				{movie.rating}
			</p>
			<p>
				<span className={css.span}>Release date: </span>
				{formatReleaseDate(movie.releaseDate)}
			</p>
			<img
				src={movie.image}
				alt={movie.title}
				className={css.image}
			/>
		</li>
	);
};
