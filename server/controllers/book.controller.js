import Book from "../models/book.model.js";

export const createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};
