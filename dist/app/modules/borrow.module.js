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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const books_model_1 = require("./books.model");
const borrowSchema = new mongoose_1.Schema({
    book: String,
    quantity: { type: Number, min: 1 },
    dueDate: Date,
}, {
    versionKey: false,
    timestamps: true,
});
borrowSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const bookForBorrow = yield books_model_1.Books.findById(this.book);
        if (!bookForBorrow) {
            throw new Error("Book not found");
        }
        // Out of stock before borrowing
        if (bookForBorrow.copies === 0) {
            throw new Error("Book is out of stock");
        }
        // Not enough copies
        if (bookForBorrow.copies < this.quantity) {
            throw new Error(`Only ${bookForBorrow.copies} copies are left`);
        }
        const newCopies = bookForBorrow.copies - this.quantity;
        yield books_model_1.Books.findByIdAndUpdate(this.book, {
            copies: newCopies,
            available: newCopies > 0,
        });
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
