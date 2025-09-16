import React, { useState, useEffect, useContext } from 'react';
import MovieCard from '../components/MovieCard.jsx'
import '../css/Favorites.css';
import {Context} from '../App.jsx'
function Favorites() {
  const [favorites, setFavorites] = useContext(Context);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch('http://localhost:8081/favorites');
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFavorites();
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
