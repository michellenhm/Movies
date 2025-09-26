import React from 'react'
import '../css/FolderPopup.css'

const UpdateFolderPopup = ({folderId, newFolderName, setNewFolderName, setUpdatePopup, folders, setFolders}) => {
    const handleChange = (e) => {
        setNewFolderName(e.target.value);
    }
    const handleUpdateFolder = async () => {
        try {
            const res = await fetch(`http://localhost:8081/folders/${folderId}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({newName: newFolderName})
            });
            const updatedFolder = await res.json();
            setFolders(folders.map(f => f.id === folderId ? updatedFolder : f))
            setUpdatePopup(false);
            console.log("updated folder: ", updatedFolder);
        } catch (err){
            console.log("cannot update folder name: ", err);
        }
        
    }

    return (
    <div className="folder-popup-overlay" onClick={() => setUpdatePopup(false)} >
            <div className="folder-popup" onClick={(e) => e.stopPropagation()}>
        
                <button className="close-btn" onClick={() => setUpdatePopup(false)}>
                    ❌
                </button>

                <h3 className='enter-name'>Enter new folder name: </h3>

                <input
                    className='input'
                    type="text"
                    placeholder="Enter name"
                    value={newFolderName}
                    onChange={handleChange}
                />

                <button onClick={handleUpdateFolder}>Submit</button>
            </div>
        </div>
  )
}

export default UpdateFolderPopup;
