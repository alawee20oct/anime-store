const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
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
        console.log("Connect to MySQL Failed");
        console.log(err);
        return;
    }
    else {
        console.log("Connect to MySQL Successfully");
    }
});

function calculateItems(sql, callback) {
    connection.query(sql, (err, result) => {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result.length);
        }
    })
}

app.get("/", cors(), async (req, res) => {
    var limit = parseInt(req.query.limit);
    var page = parseInt(req.query.page);
    var offset = (page - 1) * limit;
    try {
        connection.query(
            "SELECT * FROM tb_anime WHERE 1 ORDER BY name ASC LIMIT ? OFFSET ?",
            [limit, offset],
            (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    calculateItems(
                        "SELECT id FROM tb_anime WHERE 1",
                        function (err, count) {
                        if (err) {
                            console.log("Error : " + err);            
                        } else {
                            var total_page = Math.ceil(count / limit);
                        }
                        return res.status(200).json({
                            page: total_page,
                            content: result
                        });
                    });
                }
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.get("/watching", cors(), async (req, res) => {
    var limit = parseInt(req.query.limit);
    var page = parseInt(req.query.page);
    var offset = (page - 1) * limit;
    try {
        connection.query(
            "SELECT * FROM tb_anime WHERE status = 'watching' ORDER BY name ASC LIMIT ? OFFSET ?", 
            [limit, offset],
            (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    calculateItems(
                        "SELECT id FROM tb_anime WHERE status = 'watching'",
                        function (err, count) {
                        if (err) {
                            console.log("Error : " + err);            
                        } else {
                            var total_page = Math.ceil(count / limit);
                        }
                        return res.status(200).json({
                            page: total_page,
                            content: result
                        });
                    });
                }
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.get("/watched", cors(), async (req, res) => {
    var limit = parseInt(req.query.limit);
    var page = parseInt(req.query.page);
    var offset = (page - 1) * limit;
    try {
        connection.query(
            "SELECT * FROM tb_anime WHERE status = 'watched' ORDER BY name ASC LIMIT ? OFFSET ?", 
            [limit, offset],
            (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    calculateItems(
                        "SELECT id FROM tb_anime WHERE status = 'watched'",
                        function (err, count) {
                        if (err) {
                            console.log("Error : " + err);            
                        } else {
                            var total_page = Math.ceil(count / limit);
                        }
                        return res.status(200).json({
                            page: total_page,
                            content: result
                        });
                    });
                }
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.get("/willwatch", cors(), async (req, res) => {
    var limit = parseInt(req.query.limit);
    var page = parseInt(req.query.page);
    var offset = (page - 1) * limit;
    try {
        connection.query(
            "SELECT * FROM tb_anime WHERE status = 'willwatch' ORDER BY name ASC LIMIT ? OFFSET ?", 
            [limit, offset],
            (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    calculateItems(
                        "SELECT id FROM tb_anime WHERE status = 'willwatch'",
                        function (err, count) {
                        if (err) {
                            console.log("Error : " + err);            
                        } else {
                            var total_page = Math.ceil(count / limit);
                        }
                        return res.status(200).json({
                            page: total_page,
                            content: result
                        });
                    });
                }
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.get("/unwatch", cors(), async (req, res) => {
    var limit = parseInt(req.query.limit);
    var page = parseInt(req.query.page);
    var offset = (page - 1) * limit;
    try {
        connection.query(
            "SELECT * FROM tb_anime WHERE status = 'unwatch' ORDER BY name ASC LIMIT ? OFFSET ?", 
            [limit, offset],
            (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    calculateItems(
                        "SELECT id FROM tb_anime WHERE status = 'unwatch'",
                        function (err, count) {
                        if (err) {
                            console.log("Error : " + err);            
                        } else {
                            var total_page = Math.ceil(count / limit);
                        }
                        return res.status(200).json({
                            page: total_page,
                            content: result
                        });
                    });
                }
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.post("/insert", cors(), async (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var status = req.body.status;
    var th_name = req.body.th_name;
    try {
        connection.query(
            "INSERT INTO tb_anime (name, image, status, th_name) VALUES (?, ?, ?, ?)",
            [ name, image, status, th_name ],
            (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    return res.status(200).send();
                }
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.get("/select", cors(), async (req, res) => {
    var id = parseInt(req.query.id);
    try {
        connection.query(
            "SELECT * FROM tb_anime WHERE id = ?",
            [ id ],
            (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    return res.status(200).json(result[0]);
                }
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.get("/search/:search", cors(), async (req, res) => {
    var search = req.params.search;
    var key = "%" + search + "%";
    try {
        connection.query(
            "SELECT * FROM tb_anime WHERE name LIKE ? ORDER BY name ASC",
            [ key ],
            (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    return res.status(200).json(result);
                }
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.patch("/update", cors(), async (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var status = req.body.status;
    var th_name = req.body.th_name;
    var id = req.body.id;
    try {
        connection.query(
            "UPDATE tb_anime SET name = ?, image = ?, status = ?, th_name = ? WHERE id = ?",
            [ name, image, status, th_name, id ],
            (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    return res.status(200).send();
                }
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

app.delete("/delete", cors(), async (req, res) => {
    var id = req.body.id;
    try {
        connection.query(
            "DELETE FROM tb_anime WHERE id = ?",
            [ id ],
            (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    return res.status(200).send();
                }
            }
        )
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