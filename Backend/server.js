const express = require('express'); 
const mysql2 = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const PASSWORD = process.env.MYSQL_PASSWORD;
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: PASSWORD,
    database: "react_movie"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        process.exit(1); 
    }
    console.log("✅ Database connected!");
});

app.get('/', (req, res) => {
    return res.json("from backend side");
}); 

// display all fav movies
app.get('/favorites', (req, res) => {
    const sql = "SELECT * FROM favorites";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
});

// add to favorites upon liking movie
app.post('/favorites', (req, res) => {
    const {id, title, vote_average, poster_path, release_date, original_language} = req.body;
    const sql = `
        INSERT INTO favorites (id, title, vote_average, poster_path, release_date, original_language) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [id, title, vote_average, poster_path, release_date, original_language], (err, result) => {
        if (err) {
            console.error("Insert error:", err);
            return res.status(500).json(err);
        }
        return res.status(201).json({message: "Movie added to favorites"});
    });
});

// add to favorites upon liking movie
app.delete('/favorites/:id', (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM favorites WHERE id = ?";
    db.query(sql, [id], (err) => {
        if (err) {
            console.error("Delete error:", err);
            return res.status(500).json(err);
        }
        return res.status(200).json({message: "Movie removed from favorites"});
    });
});

app.get('/folders', (req,res) => {
    const sql = "SELECT * FROM folders";
    db.query(sql, (err,data) => {
        if (err){
            console.log("could not fetch folders", err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    })
});

//update folder_id in favorits
app.put('/favorites/:id/set-folder', (req, res) => {
  const { id } = req.params;                 // movie id
  const { folder_id } = req.body;            // folder id from React

  const sql = "UPDATE favorites SET folder_id = ? WHERE id = ?";

  db.query(sql, [folder_id, id], (err, data) => {
    if (err) {
      console.error("Error updating folder_id:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json({ message: "Folder updated for movie" });
  });
});

// //get movies by folder
// app.get('/favorites/folder/:folderId', (req,res) => {
//     const { folderId } = req.params.id;
//     const sql = "SELECT * FROM favorites WHERE folder_id = ?"
//     db.query(sql, [folderId], (err,data) => {
//         if (err){
//             console.log("could not fetch movies from folder");
//             return res.status(500).json(err);
//         }
//         return res.status(200).json(data);
//     })
// });

// add folder 
app.post('/addFolder', (req, res) => {
    const {name} = req.body;
    const sql = `INSERT INTO folders (name) VALUES (?)`;
    db.query(sql, [name], (err, data) => {
        if (err){
            console.log('could not add folder');
            res.status(500).json(err);
        }
        return res.status(200).json({ id: data.insertId, name });
    })
});

//delete folder
app.delete('/folders/:id', (req, res) => {
    const {id} = req.params; // {id: 3}
    //const folderId = req.params.id;

    //first, update favorites --- where 
    const update_sql = `UPDATE favorites SET folder_id = NULL WHERE folder_id = ?`;
    db.query(update_sql, [id], (err) => {
        if (err) {
            console.log("could not update favorites: ", err);
            return res.status(500).json(err);
        }

        const delete_sql = `DELETE FROM folders WHERE id = ?`;
        db.query(delete_sql, [id], (err) => {
            if (err) {
                console.error("Delete error: ", err);
                return res.status(500).json({error: "Failed to remove folder"});
            }
            return res.status(200).json({message: "Folder removed: ", id});
        });
    })
});

//update folder name
app.put('/folders/:id', (req, res) => {
    const {id} = req.params;
    const {newName} = req.body;

    const sql = `UPDATE folders SET name = ? WHERE id = ?`
    db.query(sql, [newName, id], (err) => {
        if (err){
            console.log(`could not update to ${newName}`);
            return res.status(500).json(err);
        }
        return res.status(200).json({message: "name updated to: ", newName});
    })
    
});


app.listen(8081, () => {
    console.log("Listening on port 8081");
});