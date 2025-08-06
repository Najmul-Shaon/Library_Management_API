import express, { Request, Response } from "express";
import { Books } from "../modules/books.model";
import { Borrow } from "../modules/borrow.module";

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

booksRoutes.get("/books/:bookId", async (req: Request, res: Response) => {
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
      message: "Book retrieve failed",
      error: error,
    });
  }
});

booksRoutes.put("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updateBody = { ...req.body };

    const updateBook = await Books.findByIdAndUpdate(bookId, updateBody, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: "Book updated successfully",
      data: updateBook,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Book update failed",
      error: error,
    });
  }
});

booksRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const deletedBook = await Books.findByIdAndDelete(bookId);

    res.status(201).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Book delete failed",
      error: error,
    });
  }
});

booksRoutes.post("/borrow", async (req: Request, res: Response) => {
  try {
    const borrowRequestBody = { ...req.body };
    // console.log(borrowRequestBody);

    const borrow = await Borrow.create(borrowRequestBody);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
      error: error,
    });
  }
});
