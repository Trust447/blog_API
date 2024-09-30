import pool from "../../config/database.js";
/**
* Object containing functions to interact with the "registration" table in the database.
*/

const create = {

/**
* Inserts a new user into the database.
* @param {Object} data - The user data to insert (firstName, lastName, email, password).
* @param {Function} callBack - Callback function to handle the result or error.
 */

    createNewUsers: async (data, callBack,) => {
        try {
            const [results] = await pool.query(
                `INSERT INTO registration (firstName, lastName, email, password) 
                VALUES (?, ?, ?, ?)`,
                [
                    data.firstName,
                    data.lastName,
                    data.email,
                    data.password
                ]
            );
            return callBack(null, results);
        }catch (error) {
            console.error('Error executing query:', error.message);
            return callBack(error)
        }
    },
  
    

/**
* Retrieves all users from the "registration" table.
* @param {Function} callBack - Callback function to handle the result or error.
*/
    
    getUsers: async (callBack) => {
        try {
            const [results] = await pool.query(
                "SELECT id, firstName, lastName, email, password FROM registration",
                []
            );
            return callBack (null, results)
        }catch (error){
            return callBack(error);
        }
    },


 /**
* Retrieves a user by their ID.
* @param {Number} id - The ID of the user to retrieve.
* @param {Function} callBack - Callback function to handle the result or error.
*/

    getUserById: async (id, callBack) => {
        try{
            const [results] = await pool.query(
                `SELECT id, firstName, lastName, email, password 
                 FROM registration 
                 WHERE id = ?`,
                [id]
            );
            return callBack(null, results[0]);
        }catch (error){
            return callBack(error);
        }
    },


     /**
     * Updates a user's information in the database by ID.
     * @param {Object} data - The updated user data (firstName, lastName, email, password, id).
     * @param {Function} callBack - Callback function to handle the result or error.
     */

    updateUser: async (id, data, callBack) => {
       try {
        const [results] = await pool.query(
            `UPDATE registration 
                 SET firstName = ?, lastName = ?, email = ?, password = ? 
                 WHERE id = ?`,
            [
                data.firstName,
                data.lastName,
                data.email,
                data.password,
                id
            ]
        );
        return callBack(null, results)
       }catch(error){
        return callBack(error);
       }

    },


/**
* Deletes a user from the database by ID.
* @param {Object} data - The user ID to delete.
* @param {Function} callBack - Callback function to handle the result or error.
*/

    deleteUser: async (id, callBack) => {
        try{
        const [results] = await pool.query(
            `DELETE FROM REGISTRATION WHERE id = ?`,
            [id]
        );

        if (results.affectedRows === 0) {
            return callBack(null, { affectedRows: 0 }); // No rows deleted
        }
        
        return callBack(null, results);
       }catch(error){
        return callBack(error);
       }

    },

 /**
* Retrieves a user by their email.
* @param {String} email - The email of the user to retrieve.
* @param {Function} callBack - Callback function to handle the result or error.
*/
getUserByEmail: async (data) => {
    try {
        const [results] = await pool.query(
            "SELECT * FROM registration WHERE email = ?",
            [data.email]
        );

        // return null if no user is found
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        console.error('Database error:', error); // Log error for debugging
        throw error;
    }
}
};


// Destructure and export functions to use in other parts of the application.
export const { 
    createNewUsers, 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser,
    getUserByEmail,  
} = create

