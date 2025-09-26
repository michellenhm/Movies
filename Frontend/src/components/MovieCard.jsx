import React, { useState, useEffect, useContext } from "react";
import "../css/MovieCard.css";
import "../css/Favorites.css";
import { Context } from "../App.jsx";
import FolderPopup from "./FolderPopup.jsx";
import AddToFolderPopup from "./AddToFolderPopup.jsx";

export const MovieCard = ({ movie }) => {
  const { id, title, vote_average, poster_path, release_date, original_language } = movie;
  const { favorites, setFavorites, folders, setFolders } = useContext(Context);

  const [hasLiked, setHasLiked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [folderPopup, setFolderPopup] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setHasLiked(favorites.some(fav => fav.id === id));
  }, [favorites, id]);

  const handleAddtoFolder = async (folderId, folderName) => {
    try {
      await fetch(`http://localhost:8081/favorites/${id}/set-folder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder_id: folderId }),
      });
      setFavorites(favorites.map(fav => fav.id === id ? { ...fav, folder_id: folderId } : fav));
      setShowPopup(false);
      setToastMessage(`Movie added to ${folderName}!`);
      setTimeout(() => setToastMessage(""), 2000);
    } catch (err) {
      console.error("Error adding movie to folder", err);
    }
  };

  const handlePlus = async () => {
    try {
      const res = await fetch('http://localhost:8081/folders');
      const data = await res.json();
      setFolders(data);
      setShowPopup(true);
    } catch (e) {
      console.log("Error showing folders: ", e);
    }
  };

  const handleLike = async () => {
    setHasLiked(!hasLiked);
    try {
      if (!hasLiked) {
        await fetch('http://localhost:8081/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(movie),
        });
        setFavorites([...favorites, movie]);
      } else {
        await fetch(`http://localhost:8081/favorites/${id}`, { method: 'DELETE' });
        setFavorites(favorites.filter(fav => fav.id !== id));
      }
    } catch (err) {
      console.error("Error updating favorites", err);
    }
  };

  return (
    <>
      <div className={`movie-card ${hasLiked ? "liked-card" : ""}`}>
        <div className="favorite-container">
          <button className="fav-btn" onClick={handleLike}>
            {hasLiked ? '❤️' : '🤍'}
          </button>
          {hasLiked && (
            <button className="plus-btn" onClick={handlePlus}>➕</button>
          )}
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

      {showPopup && (
        <AddToFolderPopup 
          movie={movie} 
          folders={folders} 
          handleAddtoFolder={handleAddtoFolder}
          setFolderPopup={setFolderPopup}
          setShowPopup={setShowPopup}
        />
      )}

      {folderPopup && (
        <FolderPopup
          folderName={folderName}
          setFolderName={setFolderName}
          setFolderPopup={setFolderPopup}
          folders={folders}
          setFolders={setFolders}
        />
      )}

      {toastMessage && (
        <div className="toast">{toastMessage}</div>
      )}
    </>
  )
}

export default MovieCard;
