const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    'host': "localhost",
    'user': "root",
    'password': "",
    'database': "anime-store",
    'port': 3306
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    else {
        console.log("Connect to MySQL Successfully");
    }
});

app.get("/", async (req, res) => {
    try {
        connection.query("SELECT * FROM tb_anime WHERE 1", (err, result, field) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            else {
                return res.status(200).json(result);
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.listen(8000, () => {
    console.log("Server is Running on http://localhost:8000");
});
