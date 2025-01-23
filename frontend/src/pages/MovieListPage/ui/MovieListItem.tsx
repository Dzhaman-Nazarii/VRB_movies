import React from "react";
import { IMovie } from "../../../entities/Movie/model/types";
import css from "./MovieListItem.module.scss";
import { formatReleaseDate } from "../../../shared/lib/date/formatReleaseDate";

interface MovieListItemProps {
  movie: IMovie;
  onAddToFavorites: (movieId: string) => void;
  onEdit: (movieId: string) => void;
}

export const MovieListItem: React.FC<MovieListItemProps> = ({ movie, onAddToFavorites, onEdit }) => {
  return (
    <li className={css.movieItem}>
      <div className={css.header}>
        <button
          className={css.favoriteButton}
          onClick={() => onAddToFavorites(movie._id)}
        >
          ❤️
        </button>
        <h3 className={css.title}>{movie.title}</h3>
        <button
          className={css.editButton}
          onClick={() => onEdit(movie._id)}
        >
          ✏️
        </button>
      </div>
      <p><span className={css.span}>Rating: </span>{movie.rating}</p>
      <p><span className={css.span}>Release date: </span>{formatReleaseDate(movie.releaseDate)}</p>
      <img src={movie.image} alt={movie.title} className={css.image} />
    </li>
  );
};
