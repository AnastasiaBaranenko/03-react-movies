import type {Movie} from '../types/movie';
import axios from "axios";

export interface Movies{
    results: Movie[];
}

const myKey = import.meta.env.VITE_TMDB_TOKEN;
const url = import.meta.env.VITE_BASE_URL;
export async function fetchMovies(searchFilm: string): Promise<Movie[]>{
            try{
   const response = await axios.get<Movies>(`${url}/movie`,{
  params: {
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