import React, { useEffect, useContext, useState } from 'react';
import MovieCard from '../components/MovieCard.jsx'
import '../css/Favorites.css';
import {Context} from '../App.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

function Favorites() {
  const [favorites, setFavorites] = useContext(Context);
  const [viewMode, setViewMode] = useState("all"); //show all movies by default
  const [folders, setFolders] = useState([]);

  const handleDeleteFolder = async (folderId) => {
    try {
      const res = await fetch(`http://localhost:8081/folders/${folderId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const text = await res.text();
        console.log('server error: ', text);
        throw new Error('failed to delete folder');
      }

      setFolders(folders.filter((folder) => folder.id != folderId));
      setFavorites(favorites.map((fav) => fav.folder_id === folderId ? {...fav, folder_id:null} : fav)); //set folder_id of favorites to null for deleted folder

    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFolder = async (folderId) => {
    // update the folder name
    // update the favorites so each movie has new folder_id
    
    
  }

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
          <div className="folder-nav">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => {
                  document.getElementById(`folder-${folder.id}`).scrollIntoView({behavior:'smooth'});
                }}
                className="folder-nav-btn"
              >
                {folder.name}
                
              </button>
            ))}
            <button className='add-folder-btn'>Add Folder</button>
          </div>

          {favorites.length === 0 ? (
            'You have not favorited any movies!'
          ) : ( 
            folders.map((folder) => (
              <div key={folder.id} id={`folder-${folder.id}`} className='folder-block'>
                <div className='folder-footer'>
                  <div className='foldername-container'>
                    <h2>{folder.name}</h2>
                  </div>
                  

                  <div className='icon-container'>
                    <button onClick={() => handleUpdateFolder(folder.id)} className='pencil-btn'><FontAwesomeIcon icon={faPencil} style={{ color: "#ffffff" }} /></button>
                    <button onClick={() => handleDeleteFolder(folder.id)} className='trash-btn'><FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff" }} /></button>
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
