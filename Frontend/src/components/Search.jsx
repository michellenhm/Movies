import React from "react";
import "../css/Search.css";

export const Search = ({searchTerm, setSearchTerm}) => {
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="container">
            <div className="search">
                <input
                    className="input"
                    type="text"
                    placeholder= "Search for a movie..."
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
export default Search