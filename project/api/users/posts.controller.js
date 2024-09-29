import { 
    createNewPosts, 
    getAllPosts,
    updatePost, 
    deletePostById 
} from './post.services.js';

export const createPost = (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({  
            success: 0,
            message: "All fields are required"
        });
    }

    const body = { title, content, author };
    createNewPosts(body, (err, results) => {
        if (err) {
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

export const getPosts = (req, res) => {
    getAllPosts((err, results) => {  
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "An error occurred while fetching posts"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
};

export const userUpdatePost = (req, res) => {
    const { id } = req.params; 
    const body = req.body;

    // ID to the body if needed for the update
    body.id = id;

    updatePost(body, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "Database error while updating the post. Please try again."
            });
        }

        if (!results.affectedRows) { 
            return res.status(404).json({
                success: 0,
                message: "Post not found or not updated"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
};

export const deletePost = (req, res) => {
    const { id } = req.params; 

    deletePostById({ id }, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "Database error while deleting post"
            });
        }
        
        if (!result.affectedRows) {
            return res.status(404).json({
                success: 0,
                message: "Post not found"
            });
        }
        
        return res.status(200).json({
            success: 1,
            message: "Post deleted successfully"
        });
    });
};