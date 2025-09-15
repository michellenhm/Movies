import React from "react";
import "../css/MovieCard.css";
import { useState } from "react";
//presentational component -- accept props and render UI

export const MovieCard = ({ movie: {title, vote_average, poster_path, release_date, original_language} }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const handleLike = () => {
    setHasLiked(!hasLiked);
  }
  return (
    <div className="movie-card">
      <div className="favorite-container">
        <button className="fav-btn" onClick={handleLike}>{hasLiked ? '❤️' : '🤍'}</button>
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

export default MovieCard