import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard.jsx'
import '../css/Favorites.css';
import { faV } from '@fortawesome/free-solid-svg-icons';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/favorites')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFavorites(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='fav-container'>
      <header>
        <h1>Your <span>Favorites</span></h1>
      </header>

      <section className='favorites-section'>
        {favorites.length === 0 ? (
          'You have not favorited any movies!'
        ) : ( 
          <ul className='movies-ul'>
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie}/>
            ))}
          </ul>
        )}
      </section>
      
    </div>
  );
}

export default Favorites;
