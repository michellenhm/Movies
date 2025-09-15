const express = require('express'); 
const mysql2 = require('mysql2');
const cors = require('cors');
const app = express();
app.use(cors());
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
        console.error("Database connection failed:", err);
        process.exit(1); 
    }
    console.log("✅ Database connected!");
});

app.get('/', (req, res) => {
    return res.json("from backend side");
}); 

app.get('/favorites', (req, res) => {
    const sql = "SELECT * FROM favorites";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
