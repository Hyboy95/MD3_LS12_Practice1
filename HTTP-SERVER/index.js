const mysql = require('mysql');
const http = require('http');
const url = require('url');
const qs = require('qs');

const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'password',
    database: 'dbTest',
    charset: 'utf8_general_ci'
})

connection.connect( err => {
    if (err) throw err.stack;
    else {
        console.log('connect success!');
    }
})

const server = http.createServer(async (req, res) => {
    try {
        if (req.url === "/user" && req.method === "POST") {
            const buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            const data = Buffer.concat(buffers).toString();
            let userData = JSON.parse(data);
            const sql = `INSERT INTO customer(name, address) VALUES ('${userData.name}', '${userData.address}');`;
            connection.query(sql, (err, result, fields) => {
                if (err) throw err;
                res.end("Success");
            });
        }
    } catch (err) {
        return res.end(err.message);
    }
})

server.listen(8080, 'localhost', () => console.log('Server is running at http://localhost:8080'));
