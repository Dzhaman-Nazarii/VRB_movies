import { Router } from 'express';
import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie, toggleFavorite } from '../modules/movies/movieController';

const router: Router = Router();

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);
router.patch('/:id/favorite', toggleFavorite);

export default router;
