const express = require("express");
const router = express.Router();
const { getAllBooks, getBook,
    createBook, updateBook, 
    deleteBook } = require("../controllers/bookController");

router.get('/', getAllBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
