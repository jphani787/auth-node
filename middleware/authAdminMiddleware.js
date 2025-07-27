const isAdminAccess = (req, res, next) => {
    if(req.userInfo.role !== "admin"){
        return res.status(403).json({
            success: false,
            message: "Access denaid for admin role."
        });
    }
    next();
}

module.exports = isAdminAccess;