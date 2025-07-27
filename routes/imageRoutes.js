const express = require('express');
const {uploadImage, featchImages, deleteImage} = require('../controllers/imageController');
const authMiddleware = require("../middleware/authMiddleware");
const isAdminAccess = require("../middleware/authAdminMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

const routes = express.Router();

routes.post('/upload', authMiddleware, isAdminAccess, uploadMiddleware.single('image'), uploadImage)
routes.get('/', authMiddleware, featchImages);
routes.delete('/:id', authMiddleware, isAdminAccess, deleteImage);
module.exports = routes;