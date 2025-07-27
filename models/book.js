const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
        maxLength: [100, 'Book title can not be more then 100 characters']
    },
    author:{
        type: String,
        required: [true, 'Book author name is required'],
        trim: true
    },
    year:{
        type: Number,
        required: [true, 'Publication year is required'],
        min: [1000, 'Year much be at list 1000'],
        max: [new Date().getFullYear(), 'Year can not be in the future']
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', BookSchema);