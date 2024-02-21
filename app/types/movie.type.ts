export interface CardProps {
  title: string;
  movieId: number;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  id?: number;
  movieRating?: number;
  vote_average?: number;
}

export interface MovieThunkProp {
  background?: string;
  date?: string;
  poster_path: string;
  id: number;
  title: string;
}
