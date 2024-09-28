import pool from "../../config/database.js";

const createPosts = {
    createNewPosts: async (data, callBack) => {
        try {
            const [results] = await pool.query(
                `INSERT INTO posts(title, content, author, date) 
                VALUES(?, ?, ?, ?)`,
            [
                data.title,
                data.content,
                data.author,
                data.date
            ]
        );
        return callBack(null, results);
        }catch(error){
            return callBack(error)
        }
    },


    getAllPost: async (callBack) =>{
        try{
            const [results] = post.query(
                `SELSECT id, title, content, author, date FROM posts`,
                []
            );
            return callBack(null, results);
        }catch(error){
            return callBack(error);
        }
    },

    updatePost: async (data, callBack) => {
        try { 
            const [results] = await pool.query(`UPDATE posts SET title = ?, content = ?, author = ?, date = ? 
                WHERE id = ?`,
                [
                    data.title,
                    data.content,
                    data.author,
                    data.date,
                    data.id   
                ]
            );
            return callBack(null, results);
        }catch(error){
            return callBack(error);
        }

    },


    deletePostById: async (data, callBack) => {
        try{
            const [results] = await pool.query(
                `DELETE FROM posts WHERE id = ?`,

                [data.id]
            );
            return callBack(null, results);
        }catch(error) {
            return callBack(error)
        }
    },

}

export const 
    {createNewPosts, getAllPost, updatePost, deletePostById
     } = createPosts

     
