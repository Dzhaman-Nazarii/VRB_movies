import { Request, Response } from 'express';
import Movie from './models/movie';

export const getMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        res.json(movie);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const createMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        res.json(movie);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const toggleFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        movie.isFavorite = !movie.isFavorite;
        await movie.save();
        res.json(movie);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
