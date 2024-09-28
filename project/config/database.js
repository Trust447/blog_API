import mysql from "mysql2/promise";

/**
 * Creates a MySQL connection pool using environment variables to configure the connection.
 * The pool will manage multiple connections, optimizing resource usage and efficiency.
 */

const pool = mysql.createPool({
    port : process.env.DB_PORT,
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    password: process.env.DB_PASSWORD,
    connectionLimit: 10
});




export default pool;

// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);