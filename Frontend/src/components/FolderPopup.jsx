import React from 'react'
import '../css/FolderPopup.css'

const FolderPopup = ({folderName, setFolderName, setFolderPopup, folders, setFolders }) => {

    const handleChange = (e) => {
        setFolderName(e.target.value);
    }

    const handleAddFolder = async () => {
        if (!folderName.trim()) return; 

        try {
            const res = await fetch('http://localhost:8081/addFolder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: folderName }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error('Server error:', text);
                throw new Error('Failed to add folder');
            }

            const newFolder = await res.json();
            setFolders([...folders, newFolder]);
            setFolderPopup(false);
            setFolderName('');
        } catch (err) {
            console.log('Could not add folder:', err);
        }
    };


    return (
        <div className="folder-popup-overlay" onClick={() => setFolderPopup(false)} >
            <div className="folder-popup" onClick={(e) => e.stopPropagation()}>
        
                <button className="close-btn" onClick={() => setFolderPopup(false)}>
                    ❌
                </button>

                <h3 className='enter-name'>Enter new folder name: </h3>

                <input
                    className='input'
                    type="text"
                    placeholder="Enter name"
                    value={folderName}
                    onChange={handleChange}
                />

                <button onClick={() => handleAddFolder(folderName)}>Submit</button>
            </div>
        </div>

  )
}

export default FolderPopup

