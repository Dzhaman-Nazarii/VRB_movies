export interface IMovie {
	_id: string;
	title: string;
	description: string;
	rating: number;
	genre: string;
	releaseDate: string;
	image: string;
	isFavorite: boolean;
	director: string;
	actors: string[];
}

export interface IMoviesSchema {
	isLoading: boolean;
	error?: string | null;
	data: IMovie[];
}
