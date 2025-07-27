const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const isAdminAccess = require("../middleware/authAdminMiddleware");
const routes = express.Router();

routes.get("/welcome", authMiddleware, isAdminAccess, (req, res)=>{
    const {userId, username, role} = req.userInfo;
    res.json({
        message: "welcome admin page",
        user: {
            _id: userId,
            username: username,
            role: role
        }
    });
});


module.exports = routes;
