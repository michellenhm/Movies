import React, { useEffect, useContext, useState } from 'react';
import MovieCard from '../components/MovieCard.jsx'
import '../css/Favorites.css';
import {Context} from '../App.jsx'
function Favorites() {
  const [favorites, setFavorites] = useContext(Context);
  const [viewMode, setViewMode] = useState("all"); //show all movies by default
  const [folders, setFolders] = useState([]);

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

    const fetchFolders = async () => {
      try{
        const response = await fetch('http://localhost:8081/folders');
        const data = await response.json();
        setFolders(data);
        console.log(data);
      } catch (err) {
        console.log("cannot fetch folders: ", err);
      }
    };

    fetchFolders();
    fetchFavorites();
  }, []);


  return (
    <div className='fav-container'>
      <header>
        <h1>Your <span>Favorites</span></h1>
      </header>

      <div className='toggle-buttons'>
        <button className='toggle-btn' onClick={() => setViewMode("all")}>All Movies</button>
        <button className='toggle-btn' onClick={() => setViewMode("folders")}>My Lists</button>
      </div>
      {viewMode == "all" ? (
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
      ) :
        <section className='folder-section'>
          {favorites.length === 0 ? (
            'You have not favorited any movies!'
          ) : ( 
            folders.map((folder) => (
              <div key={folder.id} className='folder-block'>
                <div className='folder-footer'>
                  <div className='foldername-container'>
                    <h2>{folder.name}</h2>
                  </div>
                  

                  <div className='icon-container'>
                    <p>trash icon</p>
                    <p>edit icon</p>
                  </div>
                  
                </div>
                
                <div className='movies-container'>
                  <ul className='movies-ul'>
                    {favorites
                      .filter((movie) => movie.folder_id == folder.id)
                      .map((movie) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                  </ul>
                </div>
              </div>
            ))
            
          )}
        </section>
      }
      
    </div>
  );
}

export default Favorites;
