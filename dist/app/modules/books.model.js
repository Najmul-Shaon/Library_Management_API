"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
// {
//   "title": "The Theory of Everything",
//   "author": "Stephen Hawking",
//   "genre": "SCIENCE",
//   "isbn": "9780553380163",
//   "description": "An overview of cosmology and black holes.",
//   "copies": 5,
//   "available": true
// }
const booksSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        enum: [
            "FANTASY",
            "BIOGRAPHY",
            "HISTORY",
            "SCIENCE",
            "NON_FICTION",
            "FICTION",
        ],
    },
    isbn: {
        type: String,
        unique: [true, "Duplicate ISBN"],
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies must be a non-negative number."],
    },
    available: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Books = (0, mongoose_1.model)("Books", booksSchema);
