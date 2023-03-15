const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost.com',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

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

app.get("/", cors(), async (req, res) => {
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

app.get("/watching", cors(), async (req, res) => {
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

app.get("/watched", cors(), async (req, res) => {
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

app.get("/willwatch", cors(), async (req, res) => {
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

app.get("/unwatch", cors(), async (req, res) => {
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