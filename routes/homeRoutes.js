const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const routes = express.Router();

routes.get("/welcome", authMiddleware, (req, res)=>{
    const {userId, username, role} = req.userInfo;
    res.json({
        message: "welcome page",
        user: {
            _id: userId,
            username: username,
            role: role
        }
    });
});


module.exports = routes;
