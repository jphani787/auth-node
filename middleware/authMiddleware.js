const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    console.log("Auth middleware called")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied, No token provied. please login to continue."
        })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decodedToken);
        req.userInfo = decodedToken;
        next();
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: "Access denied, No token provied. please login to continue.",
            error: err
        })
    }
   
};

module.exports = authMiddleware;
