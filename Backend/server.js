const express = require('express'); 
const mysql2 = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
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
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Delete error:", err);
            return res.status(500).json(err);
        }
        return res.status(200).json({message: "Movie removed from favorites"});
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});