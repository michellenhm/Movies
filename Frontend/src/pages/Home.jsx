import { useState, useEffect } from 'react'
import "../css/Home.css";

import Search from '../components/Search.jsx'
import Spinner from '../components/Spinner.jsx'
import MovieCard from '../components/MovieCard.jsx'
import {useDebounce} from 'react-use'
import { updateSearchCount } from '../appwrite.js'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

// build full stack app - develop server, set up database, connect, host
// instead, we will use backend as a service - firebase, supabase, appwrite

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moviesList, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  //wait for user to stop typing for 500ms before updating debouncedSearchTerm
  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm)
  }, 500, [searchTerm])

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const fetchMovies = async (query='') => {
    setLoading(true)
    setError('')

    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
                              : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json()

      if (data.response === 'False') {
        setError(data.error)
        setMovies([])
        return;
      }
      setMovies(data.results || []);
      console.log(data);
      
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
      
    } catch (err) {
        console.log(err)
        setError('Failed to fetch movies')

    } finally {
        setLoading(false)
    }
  }

  return (
    <main>
      <div className='wrapper'>

        <header>
          <h1>Find <span className='spanMovies'>Movies</span> You'll Enjoy!</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2>All Movies</h2>

          {loading && <Spinner />}
          
          {error && <div className="error-message">{error}</div>}

          <ul className="movies-ul">
            {moviesList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>

          {error && <p className='error-message'>{error}</p>}
        </section>

      </div>

    </main>
  )
}

export default Home
