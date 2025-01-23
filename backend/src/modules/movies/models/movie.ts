import mongoose, { Document, Schema } from 'mongoose';

interface Movie extends Document {
    title: string;
    description?: string;
    actors: string[];
    director: string;
    genre: string[];
    rating: number;
    releaseDate: Date;
    image?: string;
    isFavorite: boolean;
}

const movieSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    actors: [String],
    director: { type: String },
    genre: [String],
    rating: { type: Number, min: 0, max: 10 },
    releaseDate: { type: Date },
    image: { type: String },
    isFavorite: { type: Boolean, default: false },
});

const Movie = mongoose.model<Movie>('Movie', movieSchema);

export default Movie;
