import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/books.interface";

// {
//   "title": "The Theory of Everything",
//   "author": "Stephen Hawking",
//   "genre": "SCIENCE",
//   "isbn": "9780553380163",
//   "description": "An overview of cosmology and black holes.",
//   "copies": 5,
//   "available": true
// }

const booksSchema = new Schema<IBooks>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Books = model<IBooks>("Books", booksSchema);
