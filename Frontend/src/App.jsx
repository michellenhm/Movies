import React, { useState } from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from './components/NavBar';
export const Context = React.createContext();

function App() {
  const [favorites, setFavorites] = useState([]);
  const [folders, setFolders] = useState([]);
  return (
    <div>
      <Context.Provider value={{ favorites, setFavorites, folders, setFolders }}>
        <NavBar />
        <main className='main-content'> 
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/favorites" element={<Favorites/>} />
          </Routes>
        </main>
      </Context.Provider>
      
    </div>
  )
}
export default App