import React, { useState } from "react";
import "../css/FolderPopup.css";

const AddToFolderPopup = ({ 
  movie, 
  folders, 
  handleAddtoFolder, 
  setFolders, 
  setShowPopup 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      const res = await fetch('http://localhost:8081/addFolder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newFolderName }),
      });

      if (!res.ok) throw new Error('Failed to add folder');

      const newFolder = await res.json();
      setFolders(prev => [...prev, newFolder]);
      setIsAdding(false);
      setNewFolderName("");
    } catch (err) {
      console.error("Could not add folder:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCreateFolder();
    else if (e.key === "Escape") {
      setIsAdding(false);
      setNewFolderName("");
    }
  };

  return (
    <div className="folder-popup-overlay" onClick={() => setShowPopup(false)}>
      <div className="folder-popup" onClick={(e) => e.stopPropagation()}>
        <h3 className="folder-h3">Add to Folder</h3>
        <ul>
          {folders.map((folder) => (
            <li key={folder.id}>
              <button 
                className={
                  movie.folder_id === folder.id 
                    ? "folder-btn active" 
                    : "folder-btn"
                }
                onClick={() => handleAddtoFolder(folder.id, folder.name)}
              >
                {folder.name}
              </button>
            </li>
          ))}

          {isAdding ? (
            <li>
              <input
                type="text"
                className="folder-input"
                placeholder="Enter folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button className="save-btn" onClick={handleCreateFolder}>Save</button>
              <button className="cancel-btn" onClick={() => setIsAdding(false)}>Cancel</button>
            </li>
          ) : (
            <li>
              <button 
                onClick={() => setIsAdding(true)} 
                className='add-folder-popup'
              >
                <p className="add-folder-popup-p">➕ Create New Folder  </p>
                 
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AddToFolderPopup;
