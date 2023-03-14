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

app.get("/watching", async (req, res) => {
    try {
        connection.query("SELECT * FROM tb_anime WHERE status = 'watching'", (err, result, field) => {
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

app.get("/watched", async (req, res) => {
    try {
        connection.query("SELECT * FROM tb_anime WHERE status = 'watched'", (err, result, field) => {
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

app.get("/willwatch", async (req, res) => {
    try {
        connection.query("SELECT * FROM tb_anime WHERE status = 'willwatch'", (err, result, field) => {
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

app.get("/unwatch", async (req, res) => {
    try {
        connection.query("SELECT * FROM tb_anime WHERE status = 'unwatch'", (err, result, field) => {
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

app.use(express.static('public')); 
app.use('/images', express.static('images'));

app.listen(8000, () => {
    console.log("Server is Running on http://localhost:8000");
});
