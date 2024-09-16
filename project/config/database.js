import mysql from "mysql2";

const pool = mysql.createPool({
    port : process.env.DB_PORT,
    host : process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    password: process.env.DB_PASSWORD,
    connectionlimit: 10
});

module.exports = pool;