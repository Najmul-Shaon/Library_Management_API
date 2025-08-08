"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../modules/books.model");
const borrow_module_1 = require("../modules/borrow.module");
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = Object.assign({}, req.body);
        console.log(body.copies);
        const book = yield books_model_1.Books.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        // console.log(error);
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: error,
        });
    }
}));
exports.booksRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield books_model_1.Books.find();
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        // console.log(error);
        res.status(400).json({
            success: false,
            message: "Books retrieved failed",
            error: error,
        });
    }
}));
exports.booksRoutes.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Books.findById(bookId);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Book retrieve failed",
            error: error,
        });
    }
}));
exports.booksRoutes.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updateBody = Object.assign({}, req.body);
        const updateBook = yield books_model_1.Books.findByIdAndUpdate(bookId, updateBody, {
            new: true,
        });
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: updateBook,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Book update failed",
            error: error,
        });
    }
}));
exports.booksRoutes.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const deletedBook = yield books_model_1.Books.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data: deletedBook,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Book delete failed",
            error: error,
        });
    }
}));
exports.booksRoutes.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowRequestBody = Object.assign({}, req.body);
        // console.log(borrowRequestBody);
        const borrow = yield borrow_module_1.Borrow.create(borrowRequestBody);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : String(error),
            error: error,
        });
    }
}));
exports.booksRoutes.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const booksStatus = await Borrow.find();
        const summary = yield borrow_module_1.Borrow.aggregate([
            {
                $addFields: {
                    bookObjectId: { $toObjectId: "$book" },
                },
            },
            {
                $group: {
                    _id: "$bookObjectId",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Borrowed books summary retrieve failed",
            error: error,
        });
    }
}));
