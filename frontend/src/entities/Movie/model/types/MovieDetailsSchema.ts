import { IMovie } from "./Movie";

export interface IMovieDetailsSchema {
	movie: IMovie | null;
	loading: boolean;
	error: string | null;
}
