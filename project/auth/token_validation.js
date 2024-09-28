import jwt from "jsonwebtoken";
const { verify } = jwt;


export const checkToken = (req, res, next) =>{
    let token = req.get("authorization");
    if (token){
        token = token.slice(7);
        verify(token, process.env.QUE, (err, decoded) => {
            if (err){
                res.status(401).json({
                    success: 0,
                    message: "invalid token"
                })
            }else {
                next();
            }
        })
    }else {


        res.status(401).json({
            success: 0,
            message: "Access denied: Unauthorised user"
        });
    }
}