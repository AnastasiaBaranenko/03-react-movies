import type {Movie} from '../types/movie';
import axios from "axios";

export interface Movies{
    results: Movie[];
}

const myKey = import.meta.env.VITE_TMDB_TOKEN;
export async function fetchMovies(searchFilm: string): Promise<Movie[]>{
            try{
   const response = await axios.get<Movies>('https://api.themoviedb.org/3/search/movie',{
  params: {
    // твої параметри
    query: searchFilm,
  },
  headers: {
    Authorization: `Bearer ${myKey}`,
  }});
   return response.data.results;
}catch(error){
console.log(error);
  return [];
      }}