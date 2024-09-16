import pool from "../../config/database";

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into registration(firstName, lastName, email, password)
            values(?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }else{
                    return callBack(null, results);
                }
            }
        );
    }
};