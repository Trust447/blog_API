import { createNewPosts, 
    getAllPost, 
    updatePost, 
    deletePostById 
} from './post.services.js';


export const  createPost = (req, res) => {

    const { title, content, author, date } = req.body;
    if (!title || !content || !author || !date) {
        return res.status(404).json({
            success: 0,
            message: "All fields are required"
        })
    }
    const body = req.body
    createNewPosts(body, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }else {
            return res.status(200).json({
                success: 1,
                data: results
            });
        
        }

    });

}

export const getPosts = (req, res) => {
    getAllPost((err, results) => {
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
}


export const userUpdatePost = (req, res) => {
    const body = req.body

    updatePost(body, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "Database error while updating the post. Please try again."
            });
        }

        if (!results){
            res.status(404).json({
                success: 0,
                message: "not successful"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
}




export const deletePost =  (req, res) => {
    const id = req.body.id;
    deletePostById(id, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "Database error while deting post"
            });
        }
        return res.status(200).json({
            success:1,
            data:  "Post deleted succesfully"
        });
            
        });
    };

    