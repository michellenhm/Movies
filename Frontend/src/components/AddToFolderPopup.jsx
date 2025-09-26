import React from "react";
import "../css/FolderPopup.css";

const AddToFolderPopup = ({ 
  movie, 
  folders, 
  handleAddtoFolder, 
  setFolderPopup, 
  setShowPopup 
}) => {
  
  return (
    <div className="folder-popup-overlay" onClick={() => setShowPopup(false)}>
      <div className="folder-popup" onClick={(e) => e.stopPropagation()}>
        <h3 className="folder-h3">Add to Folder</h3>
        <ul>
          <button 
            onClick={() => setFolderPopup(true)} 
            className='add-folder-popup'
          >
            Create New Folder
          </button>
          {folders.map((folder) => (
            <li key={folder.id}>
              <button 
                className={movie.folder_id === folder.id ? "folder-btn active" : "folder-btn"}
                onClick={() => handleAddtoFolder(folder.id, folder.name)}
              >
                {folder.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AddToFolderPopup;
