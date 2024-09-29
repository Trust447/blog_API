import pool from "../../config/database.js";

const createPosts = {
    createNewPosts: async (data, callBack) => {
        try {
            const [results] = await pool.query(
                `INSERT INTO posts(title, content, author_id) 
                VALUES(?, ?, ?)`, 
                [
                    data.title,
                    data.content,
                    data.author_id 
                ]
            );
            return callBack(null, results);
        } catch (error) {
            return callBack(error);
        }
    },

    getAllPosts: async (callBack) => { 
        try {
            const [results] = await pool.query( 
                `SELECT id, title, content, author_id, created_at FROM posts`, 
                []
            );
            return callBack(null, results);
        } catch (error) {
            return callBack(error);
        }
    },

    updatePost: async (data, callBack) => {
        try {
            const [results] = await pool.query(
                `UPDATE posts SET title = ?, content = ? 
                WHERE id = ?`,
                [
                    data.title,
                    data.content,
                    data.id   
                ]
            );
            return callBack(null, results);
        } catch (error) {
            return callBack(error);
        }
    },

    deletePostById: async (data, callBack) => {
        try {
            const [results] = await pool.query(
                `DELETE FROM posts WHERE id = ?`,
                [data.id]
            );
            return callBack(null, results);
        } catch (error) {
            return callBack(error);
        }
    },
};

export const { createNewPosts, getAllPosts, updatePost, deletePostById } = createPosts;
