import { IMovie } from "./Movie";

export interface MovieSchema {
	isLoading: boolean;
	error?: string;
	data?: IMovie
}