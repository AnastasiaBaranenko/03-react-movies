import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import type {Movie} from '../../types/movie';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import MovieModal from '../MovieModal/MovieModal';
import MovieGrid from '../MovieGrid/MovieGrid';


export default function App(){
  const [movies, setMovies] = useState<Movie[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [selectedMovie, setselectedMovie] = useState<Movie | null>(null);

const handleSearch = async (queryValue: string) => {
   setMovies([]);
  setIsLoading(true)
 setIsError(false);
  try{
  const data = await fetchMovies(queryValue);
  if(data.length === 0){
    return toast.error('No movies found for your request.');
  }
   setMovies(data);
}catch{
 setIsError(true);
}finally{
  setIsLoading(false);
};
}

const handleMovie = (movie:Movie) => {
  setselectedMovie(movie);
}

return (
<div className={css.app}>
  <Toaster 
  position="top-center"
  reverseOrder={false}
  />
    <SearchBar onSubmit={handleSearch}/>
    {isLoading && <Loader/>}
    {isError && <ErrorMessage/>}
    {!isLoading && !isError && movies.length > 0 &&
    <MovieGrid movies={movies} onSelect={handleMovie}
    />
}
        {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setselectedMovie(null)} />} 
</div>
)
}