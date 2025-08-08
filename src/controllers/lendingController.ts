import { Request, Response } from "express";
import Lending from "../models/Lending";
import Book from "../models/Book";

export const getLendings = async (_: Request, res: Response) => {
    res.json(await Lending.find());
};

export const lendBook = async (req: Request, res: Response) => {
    const { readerId, bookId } = req.body;
    const lendDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(lendDate.getDate() + 14);

    const lending = await Lending.create({
        readerId,
        bookId,
        lendDate,
        dueDate,
    });

    await Book.findByIdAndUpdate(bookId, { status: "Lent" });
    res.json(lending);
};

export const returnBook = async (req: Request, res: Response) => {
    const lending = await Lending.findById(req.params.id);
    if (!lending) return res.status(404).json({ message: "Not found" });

    lending.returnDate = new Date();
    await lending.save();

    await Book.findByIdAndUpdate(lending.bookId, { status: "Available" });
    res.json(lending);
};
