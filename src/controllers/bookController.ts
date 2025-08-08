import { Request, Response } from "express";
import Book from "../models/Book";

export const getBooks = async (_: Request, res: Response) => {
    res.json(await Book.find());
};

export const addBook = async (req: Request, res: Response) => {
    res.json(await Book.create(req.body));
};

export const updateBook = async (req: Request, res: Response) => {
    res.json(await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

export const deleteBook = async (req: Request, res: Response) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};
