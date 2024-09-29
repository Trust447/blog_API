export const checkToken = (req, res, next) => {
    let token = req.get("authorization");

    if (!token) {
        console.log("Authorization header missing");
        return res.status(401).json({
            success: 0,
            message: "Access denied: Unauthorized user"
        });
    }
 // Log the token to see if it's being passed
    console.log("Authorization header:", token);

    // Check if token starts with "Bearer "
    if (token.startsWith("Bearer ")) {
        token = token.slice(7);
    }

    // Verify the token
    verify(token, process.env.QUE, (err, decoded) => {
        if (err) {
            // Log verification errors
            console.log("Token verification error:", err);
            return res.status(401).json({
                success: 0,
                message: "Invalid token"
            });
        } else {
            req.user = decoded;
            // Log the decoded token for debugging
            console.log("Decoded token:", decoded);
            next();
        }
    });
};
