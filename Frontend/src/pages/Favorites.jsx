import React, { useState, useEffect } from 'react';
import '../css/Favorites.css';

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

      {favorites.length === 0 ? (
        'Nothing to show'
      ) : ( 
        <ul>
          {favorites.map((fav, index) => (
            <li key={index}>
              {fav.user} and {fav.favoritescol}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
