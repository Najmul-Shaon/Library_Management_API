import express, { Request, Response } from "express";
import { Books } from "../modules/books.model";

export const booksRoutes = express.Router();

booksRoutes.post("/books", async (req: Request, res: Response) => {
  try {
    const body = { ...req.body };
    console.log(body.copies);

    const book = await Books.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error,
    });
  }
});

booksRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const books = await Books.find();

    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      success: false,
      message: "Books retrieved failed",
      error: error,
    });
  }
});

booksRoutes.get("/book/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Books.findById(bookId);

    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Book retrieved failed",
      error: error,
    });
  }
});
