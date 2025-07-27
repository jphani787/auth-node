const Book = require("../models/book");

const getAllBooks = async(req, res)=>{
    try{
        const books = await Book.find({});
        if(books?.length) {
            res.status(200).json({
                success: true,
                message: "List of books feched successfully",
                data: books
            })
        }else{
            res.status(404).json({
                success: false,
                message: "No books found in collection"
            })
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again!",
            error: error
        })
    }
}

const getBook = async(req, res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book?.length) {   
            res.status(404).json({
                success: false,
                message: "No book found in collection"
            })
        }
        res.status(200).json({
            success: true,
            message: "book feched successfully",
            data: book
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again!",
            error: error
        })
    }
}

const createBook = async(req, res)=>{
    try {
        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData);
        if(newBookFormData){
            res.status(201).json({
                success: true,
                message: "Book added",
                data: newlyCreatedBook
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again!",
            error: error
        })
    }
}

const updateBook = async(req, res)=>{
    try{
        const updateBook = req.body;
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, updateBook, {
            new: true
        });
        if(!book) {   
            res.status(404).json({
                success: false,
                message: "No book found to update"
            })
        }
        res.status(200).json({
            success: true,
            message: "book updated successfully",
            data: book
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again!",
            error: error
        })
    }
}

const deleteBook = async(req, res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book) {   
            res.status(404).json({
                success: false,
                message: "No book found to delete"
            })
        }
        res.status(200).json({
            success: true,
            message: "book deleted successfully",
            data: book
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again!",
            error: error
        })
    }
}

module.exports = {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}