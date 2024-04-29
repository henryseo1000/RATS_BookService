const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "192.168.0.33",
    user : "newuser",
    password : "...",
    database: "testdb"
});

db.connect(err => {
    if (err){
        console.error("Error connecting to MySQL database:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

module.exports = db;