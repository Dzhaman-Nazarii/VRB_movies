import { ChangeEvent, FC, FormEvent, useState } from "react";
import { IMovie } from "../../../entities/Movie/model/types";
import { useNavigate } from "react-router-dom";
import { createNewMovie } from "../../../entities/Movie/model/services/createNewMovie";
import css from "./CreateMoviePage.module.scss";
import { useAppDispatch } from "../../../shared/lib/hooks/useAppDispatch";

export const CreateMoviePage: FC = () => {
	const [formData, setFormData] = useState<Omit<IMovie, "_id">>({
		title: "",
		description: "",
		rating: 0,
		genre: "",
		releaseDate: "",
		image: "",
		isFavorite: false,
		director: "",
		actors: [],
	});

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		if (name === "rating") {
			setFormData({
				...formData,
				[name]: parseFloat(value),
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		// Відправка даних через Redux Thunk
		await dispatch(createNewMovie(formData as IMovie));

		// Повернення на головну сторінку
		navigate("/");
	};

	return (
		<section className={css.pageWrapper}>
			<h1>New movie</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Title</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Description</label>
					<input
						type="text"
						name="description"
						value={formData.description}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Rating (0-10)</label>
					<input
						type="number"
						name="rating"
						value={formData.rating}
						onChange={handleChange}
						required
						min="0"
						max="10"
						step="0.1"
					/>
				</div>

				<div>
					<label>Image</label>
					<input
						type="text"
						name="image"
						value={formData.image}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Director</label>
					<input
						type="text"
						name="director"
						value={formData.director}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Genre</label>
					<input
						type="text"
						name="genre"
						value={formData.genre}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Actors</label>
					<input
						type="text"
						name="actors"
						value={formData.actors.join(", ")}
						onChange={(e) =>
							setFormData({
								...formData,
								actors: e.target.value.split(",").map((actor) => actor.trim()),
							})
						}
						required
					/>
				</div>

				<div>
					<label>Release Date</label>
					<input
						type="date"
						name="releaseDate"
						value={formData.releaseDate}
						onChange={handleChange}
						required
					/>
				</div>

				<button
					className={css.submitBtn}
					type="submit">
					Create
				</button>
			</form>
		</section>
	);
};
