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
        const sql = "CREATE TABLE customer (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,name varchar(30) not null, address varchar(30))";
        connection.query(sql, err => {
            if (err) console.log(err.message);
            console.log('Create table success!');
            connection.end();
        });
        return;
    }
})