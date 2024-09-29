import { 
    createNewUsers, 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser,
    getUserByEmail,
} from "./user.service.js";

import { genSaltSync, hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
const { sign,verify } = jwt;


/**
 * Create a new user
 * @route POST /users
 * @param {Object} req - Express request object containing the new user data.
 * @param {Object} res - Express response object for sending feedback.
 */

export const createUser = (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            success: 0, // Fixed spelling
            message: "All fields are required"
        });
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    const user = {
        firstName,
        lastName,
        email,
        password: hashedPassword
    };

    createNewUsers(user, (err, results) => {
        if (err) {
            console.error(err); // Log the error for debugging
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
            
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
};



/**
 * Create a new user
 * @route POST /users
 * @param {Object} req - Express request object containing the new user data.
 * @param {Object} res - Express response object for sending feedback.
 */
export const getAllUsers = (req, res) => {
    getUsers((err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }
        if (result.length === 0) {
            return res.status(404).json({
                success: 0,
                message: "No users found"
            });
        }
        return res.status(200).json({
            success: 1,
            data: result
        });
    });
};





/**
 * Get a user by ID
 * @route GET /users/:id
 * @param {Object} req - Express request object containing the user ID in params.
 * @param {Object} res - Express response object for sending feedback.
 */
export const getUserByUserId = (req, res) => {
    const id = req.params.id;  
    
    getUserById(id, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }

        if (!result) {
            return res.status(404).json({
                success: 0,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: 1,
            data: result
        });
    });
};



/**
 * Update user information
 * @route PUT /users/:id
 * @param {Object} req - Express request object containing updated user data.
 * @param {Object} res - Express response object for sending feedback.
 */
export const userUpdate = (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    updateUser(id, body, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "database connection error"
            });
        }
        
        if (result.affectedRows === 0) { // Check if any rows were affected
            return res.status(404).json({
                success: 0,
                message: "User not found or update not successful"
            });
        }

        return res.status(200).json({
            success: 1,
            message: "User updated successfully",
            data: {
                id, 
                body 
            }
            
        });
    });
};



/**
 * Delete a user by ID
 * @route DELETE /users/:id
 * @param {Object} req - Express request object containing the user ID in body.
 * @param {Object} res - Express response object for sending feedback.
 */
export const deleteUserById =  (req, res) => {
    const id = req.params.id;
    deleteUser(id, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "database error",
            })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: 0,
                message: "User not found",
            });
        }


        return res.status(200).json({
            success:1,
            message:  "user deleted successfully",
        });
        
    });
};





/**
 * User login
 * @route POST /users/login
 * @param {Object} req - Express request object containing user email and password.
 * @param {Object} res - Express response object for sending feedback.
 */
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request received:', req.body);

    try {
        const user = await getUserByEmail({ email }); // Make sure this call is async
        console.log('Results from getUserByEmail:', user);

        if (!user) {
            return res.status(404).json({
                success: 0,
                data: "invalid email or password"
            });
        }

        const isPasswordValid = compareSync(password, user.password);
        if (isPasswordValid) {
            user.password = undefined;
            const token = sign({ result: user }, process.env.QUE, { expiresIn: "1h" });
            return res.status(200).json({
                success: 1,
                message: "login successfully",
                token: token
            });
        } else {
            return res.status(401).json({
                success: 0,
                data: "invalid email or password"
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: 0,
            message: "An error occurred"
        });
    }
};

