import { useEffect, useState, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../shared/lib/hooks/useAppDispatch";
import {
	fetchMovieById,
	updateMovieById,
} from "../../../entities/Movie/model/services";
import { selectMovieDetails } from "../../../entities/Movie/model/selectors/movieDetailsSelectors";
import { useSelector } from "react-redux";
import css from "./MovieEditPage.module.scss";

export const MovieEditPage: FC = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const movie = useSelector(selectMovieDetails);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		actors: "",
		director: "",
		genre: "",
		rating: 0,
		releaseDate: "",
		image: "",
		isFavorite: false,
	});

	useEffect(() => {
		if (id) {
			dispatch(fetchMovieById(id));
		}
	}, [dispatch, id]);

	useEffect(() => {
		if (movie) {
			setFormData({
				title: movie.title,
				description: movie.description || "",
				actors: movie.actors.join(", "),
				director: movie.director,
				genre: Array.isArray(movie.genre)
					? movie.genre.join(", ")
					: movie.genre,
				rating: movie.rating,
				releaseDate: new Date(movie.releaseDate)
					.toISOString()
					.slice(0, 10),
				image: movie.image || "",
				isFavorite: movie.isFavorite,
			});
		}
	}, [movie]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (id) {
			const updatedMovie = {
				...formData,
				actors: formData.actors.split(",").map((actor) => actor.trim()),
				genre: formData.genre.split(",").map((g: string) => g.trim()),
			};
			await dispatch(updateMovieById({ ...updatedMovie, _id: id }));
			navigate(`/movies/${id}`);
		}
	};

	if (!movie) {
		return <p>Loading...</p>;
	}

	return (
		<section className={css.pageWrapper}>
			<h1>Edit Movie</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Title</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div>
					<label>Description</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div>
					<label>Actors</label>
					<input
						type="text"
						name="actors"
						value={formData.actors}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div>
					<label>Director</label>
					<input
						type="text"
						name="director"
						value={formData.director}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div>
					<label>Genre</label>
					<input
						type="text"
						name="genre"
						value={formData.genre}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div>
					<label>Rating</label>
					<input
						type="number"
						name="rating"
						value={formData.rating}
						onChange={handleInputChange}
						required
						min="0"
						max="10"
						step="0.1"
					/>
				</div>

				<div>
					<label>Release Date</label>
					<input
						type="date"
						name="releaseDate"
						value={formData.releaseDate}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div>
					<label>Image URL</label>
					<input
						type="text"
						name="image"
						value={formData.image}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className={css.containerCheckbox}>
					<label>Favorite</label>
					<label>
						<input
							className={css.checkbox}
							type="checkbox"
							name="isFavorite"
							checked={formData.isFavorite}
							onChange={(e) =>
								setFormData({
									...formData,
									isFavorite: e.target.checked,
								})
							}
						/>
					</label>
				</div>

				<button
					className={css.submitBtn}
					type="submit">
					Update Movie
				</button>
			</form>
		</section>
	);
};
