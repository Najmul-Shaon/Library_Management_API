import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Books } from "./books.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: String,
    quantity: { type: Number, min: 1 },
    dueDate: Date,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.pre("save", async function () {
  const bookForBorrow = await Books.findById(this.book);

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

  await Books.findByIdAndUpdate(this.book, {
    copies: newCopies,
    available: newCopies > 0,
  });
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
