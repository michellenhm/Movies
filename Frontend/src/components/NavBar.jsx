import React from 'react';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../css/NavBar.css'

function NavBar() {
  return (
    <nav className='navbar-container'>
        <div className='navbar-links'>
            <Link to="/" className="nav-link">
                <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff" }} />
            </Link>
            <Link to="/favorites" className="nav-link">
                <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff" }} />
            </Link>
        </div>
    </nav>
  )
}

export default NavBar