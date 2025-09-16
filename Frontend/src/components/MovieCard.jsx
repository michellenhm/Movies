import React, { useState } from "react";
import "../css/MovieCard.css";

export const MovieCard = ({ movie }) => {
  const { id, title, vote_average, poster_path, release_date, original_language } = movie;
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = async () => {
    setHasLiked(!hasLiked);

    try {
      if (!hasLiked) {
        // Add to favorites
        await fetch('http://localhost:8081/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(movie),
        });
      } else {
        // Remove from favorites
        await fetch(`http://localhost:8081/favorites/${id}`, {
          method: 'DELETE',
        });
      }
    } catch (err) {
      console.error("Error updating favorites", err);
    }
  };

  return (
    <div className="movie-card">
      <div className="favorite-container">
        <button className="fav-btn" onClick={handleLike}>
          {hasLiked ? '❤️' : '🤍'}
        </button>
      </div>

      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "./dummy.png"}
        alt={title}
        className="poster"
      />

      <div className="movie-title">
        <h3>{title}</h3>
      </div>

      <div className="content">
        <div className="rating">
          <p>⭐ {vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
        </div>
        <span className="dot"> • </span>
        <p className="lang">{original_language}</p>
        <span className="dot"> • </span>
        <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
      </div>
    </div>
  )
}

export default MovieCard;